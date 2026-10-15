/* Clarity landing page + case study
   - Comfort mode switch (both pages)
   - Section highlight in the nav, equalizer bars, read-aloud demo and Markdown try-it (landing page only) */
(function () {
  "use strict";
  var root = document.documentElement;
  var themeColors = { dark: "#0d171b", bright: "#f4f8f8", eye: "#efe3c8" };
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  var radios = Array.prototype.slice.call(document.querySelectorAll("[data-mode-btn]"));
  var swatches = Array.prototype.slice.call(document.querySelectorAll("[data-swatch]"));

  /* ---------- Comfort mode ---------- */
  var pill = document.querySelector(".mode-pill");
  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  // Slide the highlight under the active option
  function placePill(animate) {
    var active = radios.filter(function (b) { return b.getAttribute("aria-checked") === "true"; })[0];
    if (!pill || !active) return;
    if (!animate) pill.style.transition = "none";
    pill.style.width = active.offsetWidth + "px";
    pill.style.transform = "translateX(" + active.offsetLeft + "px)";
    if (!animate) { void pill.offsetWidth; pill.style.transition = ""; }
  }

  function applyMode(mode, moveFocus, animatePill) {
    root.setAttribute("data-mode", mode);
    radios.forEach(function (b) {
      var on = b.getAttribute("data-mode-btn") === mode;
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      if (on && moveFocus) b.focus();
    });
    swatches.forEach(function (s) {
      s.setAttribute("aria-pressed", s.getAttribute("data-swatch") === mode ? "true" : "false");
    });
    if (metaTheme) metaTheme.setAttribute("content", themeColors[mode]);
    placePill(animatePill);
    try { localStorage.setItem("clarity-landing-mode", mode); } catch (e) {}
  }

  // Change mode with a smooth reveal that grows from the clicked control
  function switchMode(mode, origin, moveFocus) {
    if (mode === root.getAttribute("data-mode")) return;
    if (reduceMotion.matches) { applyMode(mode, moveFocus, false); return; }

    if (document.startViewTransition) {
      var r = origin ? origin.getBoundingClientRect() : null;
      var x = r ? r.left + r.width / 2 : window.innerWidth / 2;
      var y = r ? r.top + r.height / 2 : 0;
      var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      var vt = document.startViewTransition(function () { applyMode(mode, moveFocus, true); });
      vt.ready.then(function () {
        root.animate(
          { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
          { duration: 800, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(function () {});
    } else {
      root.classList.add("mode-fading");
      applyMode(mode, moveFocus, true);
      window.setTimeout(function () { root.classList.remove("mode-fading"); }, 700);
    }
  }

  radios.forEach(function (b, i) {
    b.addEventListener("click", function () { switchMode(b.getAttribute("data-mode-btn"), b); });
    b.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % radios.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + radios.length) % radios.length;
      if (next !== null) {
        e.preventDefault();
        switchMode(radios[next].getAttribute("data-mode-btn"), radios[next], true);
      }
    });
  });
  swatches.forEach(function (s) {
    s.addEventListener("click", function () { switchMode(s.getAttribute("data-swatch"), s); });
  });

  applyMode(root.getAttribute("data-mode"), false, false);
  window.addEventListener("resize", function () { placePill(false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placePill(false); });

  /* ---------- Nav highlight for the section being read (landing page) ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  if ("IntersectionObserver" in window && links.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.removeAttribute("aria-current");
          if (a.getAttribute("data-spy") === en.target.id) a.setAttribute("aria-current", "true");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    links.forEach(function (a) {
      var t = document.getElementById(a.getAttribute("data-spy"));
      if (t) io.observe(t);
    });
  }

  /* ---------- Decorative equalizer bars (they move only while the sample is read aloud) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-bars]"), function (el) {
    var n = parseInt(el.getAttribute("data-bars"), 10);
    for (var i = 0; i < n; i++) {
      var bar = document.createElement("i");
      bar.style.setProperty("--h", (28 + ((i * 37) % 62)) + "%");
      bar.style.setProperty("--d", ((i * 0.13) % 0.9).toFixed(2) + "s");
      el.appendChild(bar);
    }
  });

  /* ---------- Read-aloud demo using the visitor's own device voice (landing page) ---------- */
  var btn = document.getElementById("listen");
  if (btn) {
    var label = document.getElementById("listen-label");
    var icon = document.getElementById("listen-icon");
    var sample = document.getElementById("sample");
    var PLAY = "M4 2.5v11l9-5.5z", STOP = "M3.5 3.5h9v9h-9z";

    // idle: ready to play. starting: pressed, waiting for the first sound. speaking: sound is playing.
    var setState = function (state) {
      var on = state !== "idle";
      root.classList.toggle("is-speaking", state === "speaking");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      label.textContent = state === "idle" ? "Listen" : (state === "starting" ? "Starting\u2026" : "Stop");
      icon.setAttribute("d", on ? STOP : PLAY);
    };

    if (!("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) {
      btn.hidden = true;
    } else {
      var synth = window.speechSynthesis;
      var chosen = null;

      // Pick the voice ahead of time. Voices stored on the device start much faster
      // than online voices, which is what made Listen feel late on phones.
      var pickVoice = function () {
        var all = synth.getVoices();
        var en = all.filter(function (v) { return /^en([-_]|$)/i.test(v.lang); });
        if (!en.length) return null;
        var local = en.filter(function (v) { return v.localService; });
        var pool = local.length ? local : en;
        var us = pool.filter(function (v) { return /^en[-_]US/i.test(v.lang); });
        return us[0] || pool[0];
      };
      var refreshVoice = function () { chosen = pickVoice(); };
      refreshVoice();
      if (synth.addEventListener) synth.addEventListener("voiceschanged", refreshVoice);
      else synth.onvoiceschanged = refreshVoice;

      // Wake the speech engine on the visitor's first tap anywhere, silently,
      // so it is already running when they press Listen.
      var primed = false;
      var prime = function (e) {
        if (primed) return;
        primed = true;
        // If the first tap is on Listen itself, the real speech starts right away
        if (e && e.target && btn.contains(e.target)) return;
        try {
          var q = new SpeechSynthesisUtterance(" ");
          q.volume = 0;
          if (chosen) q.voice = chosen;
          synth.speak(q);
        } catch (e) {}
      };
      document.addEventListener("pointerup", prime, { once: true, passive: true });
      document.addEventListener("keydown", prime, { once: true });

      btn.addEventListener("click", function () {
        if (btn.getAttribute("aria-pressed") === "true") {
          synth.cancel();
          setState("idle");
          return;
        }
        primed = true;
        var u = new SpeechSynthesisUtterance(sample.textContent);
        var v = chosen || pickVoice();
        if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en"; }
        u.rate = 0.95;
        u.onstart = function () { setState("speaking"); };
        u.onend = u.onerror = function () { setState("idle"); };
        // Cancelling when nothing is playing makes some phones wait before they speak
        if (synth.speaking || synth.pending) synth.cancel();
        synth.speak(u);
        setState("starting");
      });
      window.addEventListener("pagehide", function () { synth.cancel(); });
    }
  }

  /* ---------- Markdown try-it (landing page) ---------- */
  var mdIn = document.getElementById("md-input");
  if (mdIn) {
    var mdOut = document.getElementById("md-out");
    var mdN = document.getElementById("md-n");
    var tabWrite = document.getElementById("md-tab-write");
    var tabPrev = document.getElementById("md-tab-preview");
    var panelWrite = document.getElementById("md-panel-write");
    var panelPrev = document.getElementById("md-panel-preview");

    var esc = function (t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
    var inline = function (t) {
      t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
      t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>");
      t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
      t = t.replace(/(^|[^_])_([^_]+)_(?!_)/g, "$1<em>$2</em>");
      return t;
    };
    // Same rules as the Clarity app: each Enter stays a line break
    var render = function (src) {
      if (!src.trim()) return '<p class="empty">Nothing to preview yet. Type something in Write.</p>';
      var lines = esc(src).split("\n"), out = "", para = [], list = [], type = null;
      var flushP = function () { if (para.length) { out += "<p>" + inline(para.join("<br>")) + "</p>"; para = []; } };
      var flushL = function () {
        if (list.length) {
          out += "<" + type + ">" + list.map(function (li) { return "<li>" + inline(li) + "</li>"; }).join("") + "</" + type + ">";
          list = []; type = null;
        }
      };
      lines.forEach(function (line) {
        var m;
        if (/^\s*$/.test(line)) { flushP(); flushL(); }
        else if ((m = line.match(/^(#{1,3})\s+(.*)$/))) { flushP(); flushL(); out += "<h" + m[1].length + ">" + inline(m[2]) + "</h" + m[1].length + ">"; }
        else if (/^(-{3,}|\*{3,})\s*$/.test(line)) { flushP(); flushL(); out += "<hr>"; }
        else if (/^&gt;\s?/.test(line)) { flushP(); flushL(); out += "<blockquote>" + inline(line.replace(/^&gt;\s?/, "")) + "</blockquote>"; }
        else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) { flushP(); if (type !== "ul") { flushL(); type = "ul"; } list.push(m[1]); }
        else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) { flushP(); if (type !== "ol") { flushL(); type = "ol"; } list.push(m[1]); }
        else { flushL(); para.push(line); }
      });
      flushP(); flushL();
      return out;
    };

    var updateCount = function () {
      var n = mdIn.value.length;
      mdN.textContent = n;
      document.getElementById("md-count").lastChild.textContent = n >= 50 ? " of 50, the limit for this demo" : " of 50";
    };
    updateCount();
    mdIn.addEventListener("input", updateCount);

    var showTab = function (which, focusTab) {
      var preview = which === "preview";
      tabWrite.setAttribute("aria-selected", preview ? "false" : "true");
      tabPrev.setAttribute("aria-selected", preview ? "true" : "false");
      tabWrite.tabIndex = preview ? -1 : 0;
      tabPrev.tabIndex = preview ? 0 : -1;
      panelWrite.hidden = preview;
      panelPrev.hidden = !preview;
      if (preview) mdOut.innerHTML = render(mdIn.value);
      if (focusTab) (preview ? tabPrev : tabWrite).focus();
      else if (!preview) mdIn.focus();
    };
    tabWrite.addEventListener("click", function () { showTab("write", false); });
    tabPrev.addEventListener("click", function () { showTab("preview", false); });
    [tabWrite, tabPrev].forEach(function (t) {
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
          e.preventDefault();
          var toPreview = e.key === "End" || (e.key !== "Home" && t === tabWrite);
          showTab(toPreview ? "preview" : "write", true);
        }
      });
    });
  }

  /* ---------- FAQ: answers slide open and closed ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".faq details"), function (d) {
    var summary = d.querySelector("summary");
    var body = d.querySelector(".faq-body");
    var anim = null;
    d.setAttribute("data-state", d.open ? "open" : "closed");

    function animateTo(open) {
      var wasOpen = d.open;
      var startH = wasOpen ? body.getBoundingClientRect().height : 0;
      var startO = wasOpen ? parseFloat(getComputedStyle(body).opacity) : 0;
      if (anim) { anim.onfinish = null; anim.cancel(); }
      d.setAttribute("data-state", open ? "open" : "closed");
      if (open) d.open = true;
      var endH = open ? body.scrollHeight : 0;
      anim = body.animate(
        { height: [startH + "px", endH + "px"], opacity: [startO, open ? 1 : 0] },
        { duration: open ? 460 : 360, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "both" }
      );
      anim.onfinish = function () {
        if (!open) d.open = false;
        anim.onfinish = null;
        anim.cancel();
        anim = null;
      };
    }

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      var willOpen = d.getAttribute("data-state") !== "open";
      if (reduceMotion.matches || !body.animate) {
        d.open = willOpen;
        d.setAttribute("data-state", willOpen ? "open" : "closed");
        return;
      }
      animateTo(willOpen);
    });
  });
})();
