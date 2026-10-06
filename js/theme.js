/* ==========================================================================
   SHILOH SPECIALTY ROOFING — THEME TOGGLE (click handler)
   The decision of WHICH theme to show on load happens earlier, in a
   synchronous inline script in each page's <head> (so it runs before
   first paint and there's no flash of the wrong theme) — see the
   "set initial theme" script there. This file only wires up the click
   handlers on the two .theme-toggle buttons (mobile + desktop copies)
   once the DOM is ready, flipping the data-theme attribute and
   persisting the choice to localStorage.
   ========================================================================== */
(function () {
  "use strict";

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function setTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* private browsing / storage disabled: theme still applies for
         this page view, it just won't persist to the next one */
    }
  }

  function toggleTheme() {
    setTheme(getTheme() === "light" ? "dark" : "light");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", toggleTheme);
    }
  });
})();
