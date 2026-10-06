/* ==========================================================================
   SHILOH SPECIALTY ROOFING — SCROLL-SCRUBBED DIAGRAMS
   One generic engine drives all three Specialty Roofing diagrams. Each
   diagram is a stack of .sd-step groups inside an SVG; scrolling through
   the diagram's sticky container maps linearly to progress 0..1, which is
   split evenly across the steps (or by a per-step data-range override).
   Within a step, drawable paths (.sd-draw*) wipe in via stroke-dashoffset
   and fading pieces (.sd-fade) animate opacity/translate, with labels
   following ~150ms (translated to a progress fraction) behind the layer.

   No animation library. rAF-throttled scroll handler, single listener for
   the whole page; IntersectionObserver gates which diagrams are actively
   recomputed so off-screen diagrams cost nothing on scroll.
   ========================================================================== */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Below 768px (see css/style.css's matching breakpoint) the diagrams
  // drop out of the sticky-scrub engine entirely and render in their
  // complete default state instead — scroll-scrubbing is unreliable on
  // a phone and most people scroll past before the payoff lands.
  var isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (reducedMotion || isMobile) return;
  if (!("IntersectionObserver" in window)) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function clamp01(n) {
    return Math.max(0, Math.min(1, n));
  }

  function Diagram(container) {
    this.container = container;
    this.sticky = container.querySelector(".scroll-diagram-sticky");
    this.steps = Array.prototype.slice.call(container.querySelectorAll(".sd-step"));
    this.mobileItems = Array.prototype.slice.call(
      container.querySelectorAll(".scroll-diagram-labels-mobile li")
    );
    this.active = false;
    this.lastProgress = -1;
    this.init();
  }

  Diagram.prototype.init = function () {
    var count = this.steps.length;
    this.steps.forEach(function (step, i) {
      var range = step.getAttribute("data-range");
      if (range) {
        var parts = range.split(",");
        step._start = parseFloat(parts[0]);
        step._end = parseFloat(parts[1]);
      } else {
        step._start = i / count;
        step._end = (i + 1) / count;
      }

      var draws = Array.prototype.slice.call(step.querySelectorAll(".sd-draw, .sd-draw-accent, .sd-draw-thin"));
      step._draws = draws.map(function (path) {
        var length = path.getTotalLength ? path.getTotalLength() : 0;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        return { el: path, length: length };
      });

      var fades = Array.prototype.slice.call(step.querySelectorAll(".sd-fade"));
      step._fades = fades.map(function (el) {
        el.style.opacity = "0";
        return {
          el: el,
          fromX: parseFloat(el.getAttribute("data-from-x") || "0"),
          fromY: parseFloat(el.getAttribute("data-from-y") || "0")
        };
      });
    });
  };

  Diagram.prototype.getProgress = function () {
    var rect = this.container.getBoundingClientRect();
    // this.sticky's own height (100svh in CSS) is used here instead of
    // window.innerHeight, which fluctuates as the mobile browser's
    // address bar hides and shows during scroll. Mixing a stable
    // svh-based container height with a fluctuating innerHeight would
    // make this progress value jitter independently of the page-level
    // layout-height fix in style.css.
    var stickyHeight = this.sticky.getBoundingClientRect().height;
    var total = rect.height - stickyHeight;
    if (total <= 0) return 1;
    return clamp01(-rect.top / total);
  };

  Diagram.prototype.apply = function (progress) {
    if (Math.abs(progress - this.lastProgress) < 0.001) return;
    this.lastProgress = progress;

    this.steps.forEach(function (step) {
      var localT = clamp01((progress - step._start) / (step._end - step._start));
      var drawT = easeOutCubic(clamp01(localT / 0.5));
      var labelT = easeOutCubic(clamp01((localT - 0.15) / 0.5));

      step._draws.forEach(function (d) {
        d.el.style.strokeDashoffset = d.length * (1 - drawT);
      });
      step._fades.forEach(function (f) {
        f.el.style.opacity = labelT;
        if (f.fromX || f.fromY) {
          var x = f.fromX * (1 - labelT);
          var y = f.fromY * (1 - labelT);
          f.el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
        }
      });
    });

    this.mobileItems.forEach(function (li) {
      var threshold = parseFloat(li.getAttribute("data-at") || "0");
      if (progress >= threshold) {
        li.classList.add("is-active");
      } else {
        li.classList.remove("is-active");
      }
    });
  };

  var diagrams = Array.prototype.map.call(
    document.querySelectorAll(".scroll-diagram"),
    function (el) {
      return new Diagram(el);
    }
  );

  if (!diagrams.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var diagram = diagrams.filter(function (d) {
          return d.container === entry.target;
        })[0];
        if (diagram) diagram.active = entry.isIntersecting;
      });
      requestTick();
    },
    { rootMargin: "100px 0px" }
  );
  diagrams.forEach(function (d) {
    observer.observe(d.container);
  });

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  function update() {
    diagrams.forEach(function (d) {
      if (d.active) d.apply(d.getProgress());
    });
    ticking = false;
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  update();
})();
