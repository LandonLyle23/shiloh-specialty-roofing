/* ==========================================================================
   SHILOH SPECIALTY ROOFING — MOTION SYSTEM
   Vanilla JS, no animation library beyond Lenis (loaded separately via CDN
   script tag, see each page's <head>). Four independent features, each
   fully skippable:
     1. Lenis smooth scroll
     2. Scroll-reveal on major sections (IntersectionObserver)
     3. Count-up number ("Thirty years" in the Family Owned section)
     4. Parallax on full-bleed texture bands (desktop only, >=768px)

   Every feature checks prefers-reduced-motion independently and no-ops if
   set — content is already visible by default in HTML/CSS (see the
   .reveal rules in style.css), so a reduced-motion visitor or a visitor
   whose browser doesn't support IntersectionObserver sees the finished
   page immediately, never a stuck-hidden state.
   ========================================================================== */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ------------------------------------------------------------------------
     1. LENIS SMOOTH SCROLL
     Desktop only. On touch devices Lenis's own rAF-driven scroll fights
     the phone's native momentum scrolling instead of complementing it,
     which is what reads as "choppy" — phones already scroll smoothly on
     their own, so below the tablet breakpoint this just gets out of the
     way entirely rather than trying to tune it down.
     ------------------------------------------------------------------------ */
  function initLenis() {
    if (reducedMotion || typeof window.Lenis === "undefined") return null;
    if (window.innerWidth < 768) return null;

    var lenis = new window.Lenis({
      duration: 1.0,
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return lenis;
  }

  /* ------------------------------------------------------------------------
     2. SCROLL REVEAL
     Targets "major sections": direct section/div.section/.page-hero/
     .material-block children of <main>. Each gets .reveal; its content
     children (one level past a bare .container wrapper, if present) get
     .reveal-child with a staggered transition-delay. Reveals once, never
     re-hides on scroll back up.

     Elements matching .reveal-exempt (or SCRIPT tags) are left out of the
     stagger entirely, staying at their CSS-default visible state. This
     matters for the scroll-scrubbed diagram sections: a .scroll-diagram
     is 140-200vh tall, which can make its own .material-block/.section
     several times the viewport height. The reveal observer fires once
     15% of that *whole* tall ancestor is visible — for a diagram sitting
     deep inside a tall section, that threshold can be reached before the
     diagram (or its heading/caption, right next to it in the DOM) has
     actually scrolled into view, leaving it stuck at opacity:0 the whole
     time it's on screen. Exempting these elements sidesteps the mismatch
     instead of trying to retune the threshold for every section shape.
     ------------------------------------------------------------------------ */
  function getStaggerChildren(section) {
    var el = section;
    var kids = Array.prototype.filter.call(el.children, function (c) {
      return c.tagName !== "SCRIPT" && !c.classList.contains("reveal-exempt");
    });
    if (kids.length === 1 && kids[0].classList.contains("container")) {
      el = kids[0];
      kids = Array.prototype.filter.call(el.children, function (c) {
        return c.tagName !== "SCRIPT" && !c.classList.contains("reveal-exempt");
      });
    }
    return kids;
  }

  function initReveal() {
    if (reducedMotion || !hasIO) return;

    var raw = document.querySelectorAll(
      "main > section, main > div.section, main > div.page-hero, main .material-block"
    );
    var targets = [];
    var seen = typeof Set !== "undefined" ? new Set() : null;
    for (var i = 0; i < raw.length; i++) {
      var el = raw[i];
      if (seen) {
        if (seen.has(el)) continue;
        seen.add(el);
      }
      targets.push(el);
    }
    if (!targets.length) return;

    targets.forEach(function (section) {
      section.classList.add("reveal", "is-pending");
      var kids = getStaggerChildren(section);
      kids.forEach(function (child, i) {
        child.classList.add("reveal-child", "is-pending");
        child.style.transitionDelay = (i * 80) + "ms";
      });
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var section = entry.target;
          section.classList.remove("is-pending");
          section.classList.add("is-visible");
          getStaggerChildren(section).forEach(function (child) {
            child.classList.remove("is-pending");
            child.classList.add("is-visible");
          });
          obs.unobserve(section);
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
     3. COUNT-UP NUMBER
     Looks for [data-count-to] (the "Thirty" in the Family Owned heading).
     Counts 0 -> target once, ease-out, ~1.2s, then leaves the numeral in
     place permanently — the surrounding sentence text is untouched since
     only this one word is wrapped.
     ------------------------------------------------------------------------ */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;

    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count-to"), 10);
      if (isNaN(target)) return;

      if (reducedMotion || !hasIO) {
        el.textContent = target;
        return;
      }

      var done = false;
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || done) return;
            done = true;
            obs.unobserve(el);

            var duration = 1200;
            var start = null;

            function step(ts) {
              if (start === null) start = ts;
              var progress = Math.min((ts - start) / duration, 1);
              el.textContent = Math.round(easeOutCubic(progress) * target);
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                el.textContent = target;
              }
            }
            requestAnimationFrame(step);
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     4. TEXTURE BAND PARALLAX
     Desktop only (>=768px) per spec — disabled on mobile, image stays
     static there. Only bands currently near the viewport are animated
     (tracked via IntersectionObserver), and the transform is written
     inside a single shared requestAnimationFrame per scroll tick rather
     than one listener per band.
     ------------------------------------------------------------------------ */
  function initParallax(lenis) {
    if (reducedMotion || !hasIO) return;
    if (window.innerWidth < 768) return;

    var bands = document.querySelectorAll(".texture-band");
    if (!bands.length) return;

    var SPEED = 0.85;
    var active = [];
    var ticking = false;

    function update() {
      for (var i = 0; i < active.length; i++) {
        var band = active[i];
        var inner = band.querySelector(".texture-band-inner");
        if (!inner) continue;
        var rect = band.getBoundingClientRect();
        var offset = rect.top * (1 - SPEED);
        inner.style.transform = "translateY(" + offset.toFixed(1) + "px)";
      }
      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var idx = active.indexOf(entry.target);
          if (entry.isIntersecting) {
            if (idx === -1) active.push(entry.target);
          } else if (idx !== -1) {
            active.splice(idx, 1);
          }
        });
        requestUpdate();
      },
      { rootMargin: "200px 0px" }
    );

    bands.forEach(function (band) {
      observer.observe(band);
    });

    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", requestUpdate);
    } else {
      window.addEventListener("scroll", requestUpdate, { passive: true });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lenis = initLenis();
    initReveal();
    initCounters();
    initParallax(lenis);
  });
})();
