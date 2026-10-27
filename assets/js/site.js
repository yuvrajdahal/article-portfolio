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

  // Header gains its rule once scrolled, slides away going down, returns going up.
  var header = document.getElementById('site-header');
  if (header) {
    var lastY = window.scrollY;
    var ticking = false;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      var menuOpen = menu && !menu.hidden;
      header.classList.toggle('is-hidden', !menuOpen && y > 240 && y > lastY);
      lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  // Sections rise into place as they enter the viewport.
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  // Hero scene: layers sink at their own depth while the jeep climbs the road.
  var scene = document.querySelector('[data-scene]');
  var road = scene && scene.querySelector('#scene-road');
  var jeep = scene && scene.querySelector('.scene-jeep');
  if (scene && road && jeep && road.getTotalLength) {
    var hero = scene.closest('.hero') || scene.parentNode;
    var trail = scene.querySelector('.scene-trail');
    var layers = hero.querySelectorAll('[data-depth]');
    var total = road.getTotalLength();
    var START = 0.15; // where the jeep idles before any scrolling
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var easeInOut = function (x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };

    var placeJeep = function (t) {
      var len = total * t;
      var a = road.getPointAtLength(Math.max(0, len - 2));
      var b = road.getPointAtLength(Math.min(total, len + 2));
      var p = road.getPointAtLength(len);
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      var dn = Math.hypot(dx, dy) || 1;
      // Squash through the hairpins so the jeep reads as turning, then mirror.
      var sx = clamp((dx / dn) * 3, -1, 1);
      if (Math.abs(sx) < 0.2) sx = sx < 0 ? -0.2 : 0.2;
      var tilt = Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI;
      var s = 1 - 0.45 * t; // smaller as it climbs away
      jeep.setAttribute('transform',
        'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') ' +
        'scale(' + (s * sx).toFixed(3) + ' ' + s.toFixed(3) + ') rotate(' + tilt.toFixed(1) + ')');
      if (trail) trail.style.strokeDasharray = len.toFixed(1) + ' ' + total.toFixed(1);
    };

    if (reduce) {
      placeJeep(0.35);
    } else {
      var intro = 0;
      var render = function () {
        var vh = window.innerHeight;
        var heroBottom = hero.getBoundingClientRect().bottom;
        // Layers sink from the first pixel of scroll until the hero leaves.
        var depth = clamp(window.scrollY / Math.max(1, heroBottom + window.scrollY - vh * 0.3), 0, 1);
        Array.prototype.forEach.call(layers, function (el) {
          el.style.translate = '0 ' + (depth * Number(el.getAttribute('data-depth'))).toFixed(1) + 'px';
        });
        // The climb only counts while the road is on screen: it starts as the
        // scene's foot enters the viewport and tops out at a quarter height.
        var climb = clamp((vh - scene.getBoundingClientRect().bottom) / (vh * 0.75), 0, 1);
        placeJeep(START * intro + (1 - START) * easeInOut(climb));
      };

      // Roll the jeep onto the road once the range has risen.
      var t0 = null;
      var rollIn = function (now) {
        if (t0 === null) t0 = now;
        intro = 1 - Math.pow(1 - clamp((now - t0) / 1600, 0, 1), 3);
        render();
        if (intro < 1) window.requestAnimationFrame(rollIn);
      };
      render();
      setTimeout(function () { window.requestAnimationFrame(rollIn); }, 900);

      var queued = false;
      var onScroll = function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(function () { queued = false; render(); });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }
  }

  // Live local time for elements marked data-clock.
  var clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    var tick = function () {
      Array.prototype.forEach.call(clocks, function (el) {
        try {
          el.textContent = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: el.getAttribute('data-tz') || undefined
          }).format(new Date());
        } catch (e) { /* unknown zone: leave placeholder */ }
      });
    };
    tick();
    setInterval(tick, 30000);
  }
})();
