/* ==========================================================================
   SHILOH SPECIALTY ROOFING — MAIN JS
   Minimal, no framework. Two jobs: populate per-campaign phone numbers from
   config.js, and toggle the mobile nav. Forms rely on native HTML5
   validation and Netlify's zero-JS form handling — no JS required there.
   ========================================================================== */
(function () {
  "use strict";

  function populatePhones() {
    var cfg = window.SHILOH_CONFIG;
    if (!cfg) return;
    var page = document.body.getAttribute("data-page") || "default";
    var entry = cfg.phones[page] || cfg.phones.default;

    var textNodes = document.querySelectorAll("[data-phone-text]");
    for (var i = 0; i < textNodes.length; i++) {
      textNodes[i].textContent = entry.display;
    }

    var linkNodes = document.querySelectorAll("[data-phone-link]");
    for (var j = 0; j < linkNodes.length; j++) {
      linkNodes[j].setAttribute("href", entry.href);
    }

    var emailNodes = document.querySelectorAll("[data-email-text]");
    for (var k = 0; k < emailNodes.length; k++) {
      emailNodes[k].textContent = cfg.email;
    }

    var emailLinks = document.querySelectorAll("[data-email-link]");
    for (var m = 0; m < emailLinks.length; m++) {
      emailLinks[m].setAttribute("href", "mailto:" + cfg.email);
    }
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    var overlay = document.querySelector("[data-nav-overlay]");
    if (!toggle || !nav) return;

    var lockedScrollY = 0;

    /* position:fixed + a negative top offset, not plain overflow:hidden
       on body: overflow:hidden alone doesn't reliably stop background
       touch-scroll on iOS Safari, which is the one platform this fix is
       actually for. window.scrollTo below puts the page back exactly
       where it was once the fixed positioning is removed. */
    function lockBodyScroll() {
      lockedScrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + lockedScrollY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
    }

    function unlockBodyScroll() {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, lockedScrollY);
    }

    function openDrawer() {
      nav.classList.add("is-open");
      if (overlay) overlay.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      lockBodyScroll();
    }

    function closeDrawer() {
      nav.classList.remove("is-open");
      if (overlay) overlay.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      unlockBodyScroll();
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        closeDrawer();
      }
    });

    if (overlay) {
      overlay.addEventListener("click", closeDrawer);
    }
  }

  function setFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* Any page with a .hero-full media hero starts the header transparent
     over it (see body.has-media-hero rules in style.css), fading to
     solid once the hero scrolls out of view. This watches the hero
     itself via IntersectionObserver rather than a window.scrollY pixel
     threshold — a fixed pixel number drifts across viewport heights
     (a short hero on a tall phone clears it almost immediately; a tall
     hero on a short laptop screen never does), where "is the hero still
     on screen" does not. A no-op on every inner page: those have no
     .hero-full, so this returns immediately and the header just stays
     solid/theme-aware like it always has. */
  function initHeroHeaderObserver() {
    var header = document.querySelector(".site-header");
    var hero = document.querySelector(".hero-full");
    if (!header || !hero || !("IntersectionObserver" in window)) return;

    var observer;

    function observe() {
      if (observer) observer.disconnect();
      // rootMargin shrinks the observed viewport by the header's own
      // height, so "intersecting" means "visible below the sticky
      // header," not just "visible somewhere on screen" — otherwise a
      // sliver of hero still peeking out from under the header would
      // read as not-scrolled-past.
      var headerHeight = header.offsetHeight;
      observer = new IntersectionObserver(
        function (entries) {
          var entry = entries[0];
          header.classList.toggle("is-scrolled", !entry.isIntersecting);
        },
        { rootMargin: "-" + headerHeight + "px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(hero);
    }

    observe();

    // Header height changes across the 1350px breakpoint (and on
    // orientation change), so the rootMargin needs to be recomputed
    // rather than captured once at load.
    var resizeTimer;
    window.addEventListener(
      "resize",
      function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(observe, 150);
      },
      { passive: true }
    );
  }

  /* Hero video hardening. The HTML autoplay attribute is left in place
     (some browsers/crawlers only read markup), but actual playback is
     driven from here so a blocked or rejected autoplay (iOS Low Power
     Mode, Android Data Saver, or just a browser being strict about it)
     fails silently instead of leaving a stuck first frame — the poster
     (both .hero-full's own CSS background and <video poster>) is always
     underneath and stays the fallback, not a broken-looking gap. */
  function initHeroVideo() {
    var video = document.querySelector(".hero-video");
    if (!video) return;

    var reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      // Autoplay may have already fired in the moment between parse and
      // this script running; stop it immediately rather than letting it
      // run for however long the video's first few frames take to load.
      video.pause();
      return;
    }

    video.addEventListener("canplay", function () {
      video.classList.add("is-playing");
    });

    if (video.paused) {
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          // Autoplay refused: leave the poster showing, do nothing else.
        });
      }
    }
  }

  /* Hides the mobile sticky call bar once the contact form itself
     scrolls into view — its "Free Inspection" button exists to get the
     visitor to this exact form, so once they're already looking at it
     the bar is just sitting in front of what it was pointing at.
     No-ops cleanly on pages without a #contact section (e.g.
     thank-you.html), where the bar has no reason to ever hide. */
  function initStickyBarAutoHide() {
    var bar = document.querySelector(".sticky-call-bar");
    var contact = document.getElementById("contact");
    if (!bar || !contact || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        bar.classList.toggle("is-hidden", entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(contact);
  }

  document.addEventListener("DOMContentLoaded", function () {
    populatePhones();
    initMobileNav();
    setFooterYear();
    initHeroHeaderObserver();
    initHeroVideo();
    initStickyBarAutoHide();
  });
})();
