/* Journey's End Funeral Home — behaviour */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    var footer = document.querySelector('.ftr');
    var show = function () {
      var pastThreshold = window.scrollY > 420;
      var overFooter = footer && footer.getBoundingClientRect().top < window.innerHeight;
      wa.dataset.show = (pastThreshold && !overFooter) ? 'true' : 'false';
    };
    show();
    window.addEventListener('scroll', show, { passive: true });
  }
})();
