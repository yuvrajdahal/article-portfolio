(function () {
  'use strict';

  var toggle = document.getElementById('menu-toggle');
  var close = document.getElementById('menu-close');
  var menu = document.getElementById('mobile-menu');
  var overlay = document.getElementById('menu-overlay');

  if (toggle && menu && overlay && close) {
    var setOpen = function (open) {
      menu.hidden = !open;
      overlay.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.menu-button-label').textContent = open ? 'Close' : 'Menu';
      document.documentElement.classList.toggle('is-locked', open);
      if (open) {
        var first = menu.querySelector('.mobile-link');
        if (first) first.focus();
      } else {
        toggle.focus();
      }
    };

    toggle.addEventListener('click', function () { setOpen(menu.hidden); });
    close.addEventListener('click', function () { setOpen(false); });
    overlay.addEventListener('click', function () { setOpen(false); });

    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && !menu.hidden) setOpen(false);
    });
  }

  var copier = document.querySelector('[data-copy-link]');
  if (copier && navigator.clipboard) {
    copier.addEventListener('click', function () {
      navigator.clipboard.writeText(copier.getAttribute('data-copy-link')).then(function () {
        copier.setAttribute('data-copied', 'true');
        copier.setAttribute('aria-label', 'Link copied');
        setTimeout(function () {
          copier.removeAttribute('data-copied');
          copier.setAttribute('aria-label', 'Copy link to this page');
        }, 1600);
      });
    });
  }

  var printer = document.querySelector('[data-print]');
  if (printer) {
    printer.addEventListener('click', function () { window.print(); });
  }
})();
