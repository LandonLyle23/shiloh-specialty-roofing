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
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    populatePhones();
    initMobileNav();
    setFooterYear();
  });
})();
