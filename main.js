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
    if (open) { drawer.removeAttribute('inert'); } else { drawer.setAttribute('inert', ''); }
  }

  function drawerFocusables() {
    return Array.prototype.slice.call(drawer.querySelectorAll('a[href], button:not([disabled])'));
  }

  if (btn && drawer) {
    setMenu(false);

    btn.addEventListener('click', function () {
      setMenu(drawer.dataset.open !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (drawer.dataset.open !== 'true') return;

      if (e.key === 'Escape') { setMenu(false); btn.focus(); return; }

      if (e.key === 'Tab') {
        var focusables = drawerFocusables();
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
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

      var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(body);
      var popup = null;
      try { popup = window.open(url, '_blank'); } catch (ex) { popup = null; }

      if (popup) {
        popup.opener = null;
      } else {
        err.textContent = '';
        var note = document.createElement('span');
        note.textContent = "We couldn't open WhatsApp automatically \u2014 your browser may have blocked the pop-up. ";
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'Tap here to continue on WhatsApp';
        err.appendChild(note);
        err.appendChild(link);
      }
    });
  }
})();
