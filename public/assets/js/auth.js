/*
 * ============================================================
 * TESLA × SPACEX — AUTH PAGES (Login / Register)
 * ------------------------------------------------------------
 * Self-contained client-side auth for the prototype:
 *   - Password visibility toggle
 *   - Inline validation
 *   - On successful submit, shows a success message and
 *     redirects to the homepage (simulating a completed login).
 * No external backend calls.
 * ============================================================
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    /* ---- Password visibility toggles ---- */
    var toggles = document.querySelectorAll('.auth__field-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-toggle');
        var input = targetId ? document.getElementById(targetId) : null;
        if (!input) return;
        var isPw = input.type === 'password';
        input.type = isPw ? 'text' : 'password';
        btn.classList.toggle('is-visible', isPw);
        btn.setAttribute('aria-pressed', String(isPw));
        btn.setAttribute('aria-label', isPw ? 'Hide password' : 'Show password');
      });
    });

    /* ---- Form validation + submission ---- */
    var form = document.getElementById('auth-form');
    var errorBox = document.getElementById('auth-error');
    var submitBtn = form ? form.querySelector('.auth__submit') : null;

    function showError(msg) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('is-visible');
      errorBox.style.background = 'rgba(248, 113, 113, 0.1)';
      errorBox.style.borderColor = 'rgba(248, 113, 113, 0.3)';
      errorBox.style.color = '#fca5a5';
    }
    function clearError() {
      if (!errorBox) return;
      errorBox.textContent = '';
      errorBox.classList.remove('is-visible');
    }
    function showSuccess(msg) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('is-visible');
      errorBox.style.background = 'rgba(74, 222, 128, 0.1)';
      errorBox.style.borderColor = 'rgba(74, 222, 128, 0.3)';
      errorBox.style.color = '#86efac';
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearError();

        var email = form.querySelector('#email');
        var password = form.querySelector('#password');
        var name = form.querySelector('#name'); // register page only

        if (name && !name.value.trim()) {
          showError('Please enter your full name.');
          name.focus();
          return;
        }
        if (email && !isValidEmail(email.value)) {
          showError('Please enter a valid email address.');
          email.focus();
          return;
        }
        if (password && password.value.length < 8) {
          showError('Password must be at least 8 characters long.');
          password.focus();
          return;
        }

        /* Success — simulate authentication, then redirect home */
        var isRegister = !!name;
        showSuccess(isRegister
          ? 'Account created successfully! Redirecting…'
          : 'Signed in successfully! Redirecting…');

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';
        }

        setTimeout(function () {
          window.location.href = '/';
        }, 1400);
      });
    }

    /* ---- Google button (demo handler) ---- */
    var googleBtn = document.getElementById('google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', function () {
        showSuccess('Connecting to Google… Redirecting…');
        setTimeout(function () {
          window.location.href = '/';
        }, 1400);
      });
    }

    function isValidEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
    }
  });
})();
