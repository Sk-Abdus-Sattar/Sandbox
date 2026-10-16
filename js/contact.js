// ============================================================
// NOOR Productions — Contact form
// Sends via EmailJS (same account/service used for the reviews
// backend). Shared by index.html's homepage form and contact.html.
// ============================================================
(function () {
  // ── CONFIG ──────────────────────────────────────────────────
  var EMAILJS_PUBLIC_KEY  = "ClwYWQKbEtb0O6Z7E";
  var EMAILJS_SERVICE_ID  = "service_9r1xpqi";
  // EmailJS free plan caps you at 2 templates account-wide, and the other
  // slot is already used by Delhi Boutique's live order template — so this
  // reuses the same generic "template_to_client" as admin.html/reviews.js,
  // formatting the form fields into its {{subject}}/{{message}} shape and
  // sending to your own inbox.
  var EMAILJS_TEMPLATE_ID = "template_to_client"; // vars: to_email, to_name, subject, message
  var ADMIN_EMAIL         = "noorproductions.as@gmail.com";
  // Anti-spam: reject junk field lengths and throttle repeat submissions
  // from the same browser. This stops empty/garbage floods and accidental
  // double-clicks — it is NOT a substitute for server-side rate limiting
  // against a scripted attacker, since this is a static site with no backend.
  var MIN_MESSAGE_LENGTH  = 10;
  var MAX_NAME_LENGTH     = 100;
  var MAX_MESSAGE_LENGTH  = 2000;
  var COOLDOWN_MS         = 2 * 60 * 1000; // 2 minutes between submissions
  var COOLDOWN_KEY        = "np_contact_last_submit";
  var EMAIL_RE            = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // ────────────────────────────────────────────────────────────

  if (!window.emailjs) {
    console.error("EmailJS SDK not loaded — check the <script> tag order.");
    return;
  }
  window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  function msSinceLastSubmit() {
    var last = Number(window.localStorage.getItem(COOLDOWN_KEY) || 0);
    return Date.now() - last;
  }
  function markSubmitted() {
    try { window.localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch (e) { /* storage unavailable — cooldown just won't persist */ }
  }
  function validate(name, email, projectType, message) {
    name = (name || "").trim();
    email = (email || "").trim();
    message = (message || "").trim();
    if (!name) return "Please enter your name.";
    if (name.length > MAX_NAME_LENGTH) return "Name is too long.";
    if (!email || !EMAIL_RE.test(email)) return "Please enter a valid email address.";
    if (!projectType) return "Please select a project type.";
    if (!message || message.length < MIN_MESSAGE_LENGTH) return "Please write a bit more about your project (at least " + MIN_MESSAGE_LENGTH + " characters).";
    if (message.length > MAX_MESSAGE_LENGTH) return "Message is too long.";
    return null;
  }

  document.querySelectorAll('form[id^="contact-form"]').forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var statusEl = document.getElementById("contact-form-status" + form.id.replace("contact-form", ""));
      var btn = form.querySelector(".contact-submit-btn");
      var data = new FormData(form);
      var name = data.get("name");
      var email = data.get("email");
      var projectType = data.get("projectType");
      var message = data.get("message");

      var remaining = COOLDOWN_MS - msSinceLastSubmit();
      if (remaining > 0) {
        if (statusEl) statusEl.textContent = "Please wait " + Math.ceil(remaining / 1000) + "s before sending another message.";
        return;
      }

      var error = validate(name, email, projectType, message);
      if (error) {
        if (statusEl) statusEl.textContent = error;
        return;
      }

      btn.disabled = true;
      if (statusEl) statusEl.textContent = "Sending...";

      window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: ADMIN_EMAIL,
        to_name: "NOOR Productions",
        subject: "New contact form submission from " + name,
        message: "Name: " + name + "\nEmail: " + email + "\nProject type: " + projectType + "\n\n" + message
      }).then(function () {
        markSubmitted();
        if (statusEl) statusEl.textContent = "Thanks — we'll get back to you soon.";
        form.reset();
      }).catch(function (err) {
        console.error("Contact form send failed:", err);
        if (statusEl) statusEl.textContent = "Something went wrong sending that — please email us directly at noorproductions.as@gmail.com.";
      }).finally(function () {
        btn.disabled = false;
      });
    });
  });
})();
