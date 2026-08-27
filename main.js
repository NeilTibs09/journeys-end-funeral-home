/* Journey's End Funeral Home — behaviour */
(function () {
  'use strict';

  var WA = '27813251340';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile drawer ---- */
  var btn = document.getElementById('menuBtn');
  var drawer = document.getElementById('drawer');

  function setMenu(open) {
    drawer.dataset.open = open ? 'true' : 'false';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    btn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  }

  if (btn && drawer) {
    btn.addEventListener('click', function () {
      setMenu(drawer.dataset.open !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.dataset.open === 'true') { setMenu(false); btn.focus(); }
    });
  }

  /* ---- scroll reveal ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) {
      if (el.closest('.hero')) return;
      io.observe(el);
    });

    /* hero entrance runs on load, staggered by data-d */
    window.setTimeout(function () {
      document.querySelectorAll('.hero .reveal').forEach(function (el) { el.classList.add('is-in'); });
    }, 70);
  }

  /* ---- floating whatsapp ---- */
  var wa = document.getElementById('waFloat');
  if (wa) {
    var show = function () {
      wa.dataset.show = window.scrollY > 420 ? 'true' : 'false';
    };
    show();
    window.addEventListener('scroll', show, { passive: true });
  }

  /* ---- enquiry form -> whatsapp ---- */
  var form = document.getElementById('enquiry');
  if (form) {
    var err = document.getElementById('formErr');

    form.addEventListener('input', function () { err.textContent = ''; });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var elName = document.getElementById('f-name');
      var elPhone = document.getElementById('f-phone');
      var name = elName.value.trim();
      var phone = elPhone.value.trim();
      var topic = document.getElementById('f-topic').value;
      var msg = document.getElementById('f-msg').value.trim();

      if (!name) { err.textContent = 'Enter your name so we know who we are speaking to.'; elName.focus(); return; }
      if (phone.replace(/\D/g, '').length < 9) { err.textContent = 'Enter a phone number we can reach you on.'; elPhone.focus(); return; }

      var body =
        'Hello Journey\u2019s End,\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Enquiry: ' + topic +
        (msg ? '\n\nMessage: ' + msg : '');

      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
    });
  }
})();
