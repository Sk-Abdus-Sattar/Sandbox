/* Plan tabs + free-sample form.
   Plan tabs: with no script, all three plan groups show one under the other and the tab links jump to them.
   With script, the links become real tabs (arrow keys work) and a link like /#plans-short opens that tab.
   Form: front-end only for now. It checks the fields and shows the thank-you line. It sends nothing yet. */
(function () {
  'use strict';

  /* ---------- skip the intro: stop the video and let the page carry on to the hero ---------- */
  var skip = document.getElementById('introSkip'), vid = document.getElementById('loaderVideo');
  if (skip && vid) {
    skip.addEventListener('click', function () {
      skip.disabled = true;
      try { vid.pause(); } catch (e) {}
      vid.dispatchEvent(new Event('ended'));   /* the intro script treats this as "video finished" */
    });
  }

  /* ---------- nav tint over light sections ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var lights = [].slice.call(document.querySelectorAll('.z-white, .z-ivory, .foot--light')), queued = false;
    var check = function () {
      queued = false;
      var y = nav.getBoundingClientRect().top + 44;            /* middle of the slab */
      var rise = Math.min(440, Math.max(260, innerWidth * 0.32));
      var on = lights.some(function (s) {
        var r = s.getBoundingClientRect();
        var lead = s.classList.contains('foot--light') ? 0 : s.classList.contains('z-ivory') ? rise * 0.6 * 0.3 : rise * 0.3;   /* light colour already rising into the section above */
        return r.top - lead <= y && r.bottom >= y;
      });
      nav.classList.toggle('nav--light', on);
    };
    var queue = function () { if (!queued) { queued = true; requestAnimationFrame(check); } };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    check();
  }

  /* ---------- tabs ---------- */
  var list = document.querySelector('[data-tabs]');
  if (list) {
    var tabs = [].slice.call(list.querySelectorAll('a[data-panel]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('data-panel')); });
    list.setAttribute('role', 'tablist');
    tabs.forEach(function (t, i) {
      t.setAttribute('role', 'tab');
      t.setAttribute('aria-controls', panels[i].id);
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', t.id);
      t.addEventListener('click', function (e) { e.preventDefault(); select(i, false); history.replaceState(null, '', '#' + panels[i].id); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); select(n, true); }
      });
    });
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    var fromHash = function (scroll) {
      var id = location.hash.slice(1), i = panels.findIndex(function (p) { return p.id === id; });
      if (i < 0) return false;
      select(i, false);
      if (scroll) list.scrollIntoView({ block: 'start' });
      return true;
    };
    if (!fromHash(false)) select(0, false);
    addEventListener('hashchange', function () { fromHash(true); });
    if (location.hash && panels.some(function (p) { return '#' + p.id === location.hash; })) {
      /* the browser could not scroll to a hidden panel on load, so do it now */
      requestAnimationFrame(function () { list.scrollIntoView({ block: 'start' }); });
    }
  }

  /* ---------- free-sample form (front-end only) ---------- */
  var form = document.getElementById('sample-request');
  if (form) {
    var ok = form.querySelector('[data-kind="ok"]'), bad = form.querySelector('[data-kind="error"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.hidden = true; bad.hidden = true;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      /* TODO (when the client decides how requests are sent): send the form fields to the chosen service here,
         show `ok` on success and `bad` on failure. Until then nothing leaves the page. */
      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) { ok.hidden = false; form.reset(); return; }
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); ok.hidden = false; form.reset(); })
        .catch(function () { bad.hidden = false; });
    });
  }
})();
