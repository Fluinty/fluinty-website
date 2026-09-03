/* Fluinty — skrypt strony. Bez bibliotek. Cztery rzeczy: menu, wjazdy sekcji,
   liczniki, kalkulator. Plus pauzowanie animacji poza ekranem. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- menu mobilne --- */
  var burger = document.querySelector('[data-menu-toggle]');
  var drawer = document.getElementById('menu-mobile');
  if (burger && drawer) {
    var setMenu = function (open) {
      drawer.setAttribute('data-open', open ? 'true' : 'false');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.setAttribute('data-menu', open ? 'open' : 'closed');
      burger.querySelector('[data-icon-open]').hidden = open;
      burger.querySelector('[data-icon-close]').hidden = !open;
    };
    burger.addEventListener('click', function () {
      setMenu(drawer.getAttribute('data-open') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') { setMenu(false); burger.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setMenu(false);
    });
  }

  /* --- wjazdy sekcji --- */
  var reveal = Array.prototype.slice.call(document.querySelectorAll('.sr'));
  if (reveal.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('in'); });
  }
  document.querySelectorAll('.sr-grid').forEach(function (grid) {
    Array.prototype.forEach.call(grid.children, function (child, i) { child.style.setProperty('--i', i); });
  });

  /* --- liczniki --- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count-to]'));
  var runCount = function (el) {
    var to = parseFloat(el.getAttribute('data-count-to'));
    var from = parseFloat(el.getAttribute('data-count-from') || '0');
    if (reduce || isNaN(to)) { el.textContent = String(to); return; }
    var t0 = null, dur = 1400;
    var step = function (t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    var ioc = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); ioc.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { ioc.observe(el); });
  } else {
    counters.forEach(runCount);
  }

  /* --- kalkulator kosztu status quo --- */
  var hours = document.getElementById('calc-h');
  var rate = document.getElementById('calc-r');
  var out = document.getElementById('calc-out');
  var sub = document.getElementById('calc-sub');
  var hoursVal = document.getElementById('calc-h-val');
  var rateVal = document.getElementById('calc-r-val');
  if (hours && rate && out) {
    var pl = function (n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
    var recalc = function () {
      var h = parseInt(hours.value, 10);
      var r = parseInt(rate.value, 10);
      var month = h * r;
      var year = month * 12;
      if (hoursVal) hoursVal.textContent = h + ' h';
      if (rateVal) rateVal.textContent = r + ' zł';
      out.textContent = pl(year) + ' zł';
      if (sub) sub.textContent = pl(month) + ' zł miesięcznie · około ' + (Math.round(h / 168 * 10) / 10).toString().replace('.', ',') + ' etatu';
    };
    hours.addEventListener('input', recalc);
    rate.addEventListener('input', recalc);
    recalc();
  }

  /* --- karuzela logotypow: przycisk pauzy (WCAG 2.2.2, ruch dluzszy niz 5 s) --- */
  document.querySelectorAll('.marquee').forEach(function (m) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'marquee-pause';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Zatrzymaj przesuwanie logotypów');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1"></rect><rect x="9" y="3" width="3" height="10" rx="1"></rect></svg>';
    btn.addEventListener('click', function () {
      var stopped = m.classList.toggle('paused');
      btn.setAttribute('aria-pressed', stopped ? 'true' : 'false');
      btn.setAttribute('aria-label', stopped ? 'Wznów przesuwanie logotypów' : 'Zatrzymaj przesuwanie logotypów');
      btn.innerHTML = stopped
        ? '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 3.5l7 4.5-7 4.5z"></path></svg>'
        : '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1"></rect><rect x="9" y="3" width="3" height="10" rx="1"></rect></svg>';
    });
    m.appendChild(btn);
  });

  /* --- animacje stoja poza ekranem --- */
  var animated = Array.prototype.slice.call(document.querySelectorAll('[data-animated]'));
  if (animated.length && 'IntersectionObserver' in window) {
    var iop = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('paused', !en.isIntersecting); });
    }, { rootMargin: '120px' });
    animated.forEach(function (el) { iop.observe(el); });
  }
})();
