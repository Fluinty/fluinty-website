/* Fluinty — okladka i demo na podstronach realizacji. Bez bibliotek.
   build.mjs podpina ten plik tylko na stronach case, po js/site.js.
   Instrukcja dla autorow stron: src/KLASY.md, sekcja "Okladka i demo na case studies".
   Strona nie pisze wlasnego JS: wszystko sterowane atrybutami w HTML. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  var arr = function (list) { return Array.prototype.slice.call(list); };
  var num = function (el, attr) { return parseInt(el.getAttribute(attr), 10) || 0; };
  var words = function (el, attr) { return (el.getAttribute(attr) || '').split(/\s+/).filter(Boolean); };
  var restart = function (el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  /* --- 1. okladka: klasa .play odpala choreografie z CSS. Gra raz, kiedy rysunek wjedzie
         na ekran, i od nowa po kliknieciu. Bez JS i przy reduced motion stan koncowy. --- */
  var playArt = function (fig) {
    fig.classList.remove('play');
    void fig.getBoundingClientRect();
    fig.classList.add('play');
  };
  arr(document.querySelectorAll('.cs-art')).forEach(function (fig) {
    if (reduce) return;
    fig.addEventListener('click', function () { playArt(fig); });
    if (!hasIO) { playArt(fig); return; }
    fig.classList.add('cs-armed');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { playArt(fig); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(fig);
  });

  /* --- 2. demo: kroki [data-step] ida po kolei, elementy [data-at="N"] wchodza kaskada --- */
  var TRANSIENT = ['cs-lit', 'cs-scan', 'cs-pop', 'cs-tpulse', 'cs-tick'];
  var FLY_MS = 900;

  var setupDemo = function (root) {
    var section = root.closest('section') || document;
    var btn = section.querySelector('[data-cs-replay]');
    var out = root.querySelector('.cs-out');
    var split = num(root, 'data-split');
    var steps = arr(root.querySelectorAll('[data-step]')).sort(function (a, b) { return num(a, 'data-step') - num(b, 'data-step'); });
    var counters = arr(root.querySelectorAll('[data-count]'));
    counters.forEach(function (c) { c.setAttribute('data-final', c.textContent); });
    // data-late="krok ms klasa [klasa…]": klasa jest w HTML (stan koncowy), silnik ja zdejmuje i doklada w swoim czasie
    var lates = arr(root.querySelectorAll('[data-late]')).map(function (el) {
      var p = words(el, 'data-late');
      return { el: el, step: parseInt(p[0], 10) || 0, t: parseInt(p[1], 10) || 0, cls: p.slice(2) };
    });
    var timers = [];
    var waiting = null;
    var outSeen = !out;
    var started = false;

    var later = function (ms, fn) { timers.push(setTimeout(fn, ms)); };
    var killFlyers = function () { arr(root.querySelectorAll('.cs-flyer')).forEach(function (f) { f.parentNode.removeChild(f); }); };
    var stop = function () { timers.forEach(clearTimeout); timers = []; waiting = null; killFlyers(); };
    var strip = function (list) {
      arr(root.querySelectorAll('.' + list.join(', .'))).forEach(function (el) {
        list.forEach(function (c) { el.classList.remove(c); });
      });
    };
    var setStep = function (n) {
      steps.forEach(function (s) {
        var k = num(s, 'data-step');
        s.classList.toggle('cs-cur', k === n);
        s.classList.toggle('cs-done', n > 0 && k < n);
      });
    };
    var sources = function (key) {
      return arr(root.querySelectorAll('[data-f]')).filter(function (el) { return words(el, 'data-f').indexOf(key) > -1; });
    };
    var tick = function (key) {
      counters.forEach(function (c) {
        if (c.getAttribute('data-count') !== key) return;
        c.textContent = String((parseInt(c.textContent, 10) || 0) + 1);
        restart(c, 'cs-tick');
      });
    };
    // trzy kolumny obok siebie = szeroki uklad; tylko wtedy zetony maja gdzie leciec
    var wide = function () { return getComputedStyle(root).gridTemplateColumns.split(' ').length >= 3; };
    var onScreen = function (el) {
      var r = el.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
    };
    var fly = function (src, dst, text, done) {
      if (!src || !wide() || !onScreen(src) || !onScreen(dst)) { done(); return; }
      var box = root.getBoundingClientRect();
      var a = src.getBoundingClientRect();
      var b = dst.getBoundingClientRect();
      var f = document.createElement('span');
      f.className = 'cs-flyer' + (dst.classList.contains('cs-gap') ? ' cs-amb' : '');
      f.setAttribute('aria-hidden', 'true');
      f.textContent = text || (src.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 48);
      f.style.left = (a.left - box.left) + 'px';
      f.style.top = (a.top - box.top) + 'px';
      root.appendChild(f);
      void f.offsetWidth;
      // ukryty cel stoi 8 px nizej (translateY w CSS), wiec celujemy w jego miejsce docelowe
      f.style.transform = 'translate(' + (b.left - a.left).toFixed(1) + 'px,' + (b.top - a.top - 8).toFixed(1) + 'px)';
      later(FLY_MS, function () { done(); f.style.opacity = '0'; });
      later(FLY_MS + 300, function () { if (f.parentNode) f.parentNode.removeChild(f); });
    };
    var reveal = function (el) {
      var keys = words(el, 'data-r');
      keys.forEach(function (k) { sources(k).forEach(function (s) { s.classList.add('cs-lit'); }); });
      var show = function () {
        el.classList.add('on');
        if (el.classList.contains('cs-gap')) restart(el, 'cs-pop');
        if (el.classList.contains('cs-human')) restart(el, 'cs-tpulse');
        if (el.hasAttribute('data-tick')) tick(el.getAttribute('data-tick'));
      };
      if (keys.length && el.hasAttribute('data-fly')) fly(sources(keys[0])[0], el, el.getAttribute('data-fly'), show);
      else show();
    };
    var finish = function () {
      stop();
      root.classList.remove('cs-running');
      strip(TRANSIENT);
      lates.forEach(function (l) {
        l.cls.forEach(function (c) { if (TRANSIENT.indexOf(c) < 0) l.el.classList.add(c); });
      });
      counters.forEach(function (c) { c.textContent = c.getAttribute('data-final'); });
      setStep(0);
    };
    var run = function (i) {
      if (i >= steps.length) { later(700, finish); return; }
      var st = steps[i];
      var n = num(st, 'data-step');
      // telefon: dalsze kroki czekaja, az wynik bedzie na ekranie
      if (split && n >= split && !outSeen) { waiting = function () { run(i); }; return; }
      setStep(n);
      var gap = num(st, 'data-stagger') || 170;
      var k = 0;
      arr(root.querySelectorAll('[data-at="' + n + '"]')).forEach(function (el) {
        var t = el.hasAttribute('data-t') ? num(el, 'data-t') : 120 + gap * k++;
        later(t, function () { reveal(el); });
      });
      lates.forEach(function (l) {
        if (l.step !== n) return;
        later(l.t, function () {
          l.cls.forEach(function (c) { if (TRANSIENT.indexOf(c) > -1) restart(l.el, c); else l.el.classList.add(c); });
        });
      });
      later(num(st, 'data-dur') || 1400, function () { run(i + 1); });
    };
    // stan startowy: wszystko z data-at schowane, klasy z data-late zdjete, liczniki na zero
    var reset = function () {
      stop();
      root.classList.add('cs-prep', 'cs-running');
      strip(TRANSIENT.concat(['on']));
      lates.forEach(function (l) { l.cls.forEach(function (c) { l.el.classList.remove(c); }); });
      counters.forEach(function (c) { c.textContent = '0'; });
      setStep(0);
      void root.offsetWidth;
      root.classList.remove('cs-prep');
    };
    var play = function () { started = true; reset(); run(0); };

    if (reduce || !hasIO) return; // stan koncowy zostaje, przycisk powtorki schowany (atrybut hidden)
    reset(); // czeka schowane, az demo wjedzie na ekran
    if (btn) {
      btn.hidden = false;
      btn.addEventListener('click', play);
    }
    var ioStart = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !started) { ioStart.disconnect(); play(); }
      });
    }, { rootMargin: '0px 0px -30% 0px' });
    ioStart.observe(root);
    if (out) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          outSeen = en.isIntersecting;
          if (outSeen && waiting) { var w = waiting; waiting = null; w(); }
        });
      }, { rootMargin: '0px 0px -15% 0px' }).observe(out);
    }
  };
  arr(document.querySelectorAll('[data-cs-demo]')).forEach(setupDemo);
})();
