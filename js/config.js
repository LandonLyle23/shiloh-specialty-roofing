/* ==========================================================================
   SHILOH SPECIALTY ROOFING — CAMPAIGN CONFIG
   ==========================================================================
   Single source of truth for tracking phone numbers. Each of the four
   campaign landing pages (Home, Specialty Materials, Storm & Insurance,
   Roof Replacement) reads its own number from here via body[data-page].

   TO SWAP A TRACKING NUMBER: edit the "display" and "href" values below.
   Nothing else in the codebase needs to change — every phone link and every
   visible phone number on that page is populated from this object by
   js/main.js at load time.

   [PLACEHOLDER] All numbers below are placeholders. Replace with real
   direct or call-tracking numbers (e.g. CallRail) before launch.
   ========================================================================== */

window.SHILOH_CONFIG = {
  phones: {
    /* display strings are kept short on purpose — real tracking numbers
       are ~14 characters and need to fit the header/sticky-bar layout
       without wrapping. Swap the placeholder text and href per campaign. */
    home: {
      display: "[PHONE]", /* campaign: Home */
      href: "tel:+10000000000"
    },
    specialty: {
      display: "[PHONE]", /* campaign: Specialty Materials */
      href: "tel:+10000000000"
    },
    storm: {
      display: "[PHONE]", /* campaign: Storm & Insurance */
      href: "tel:+10000000000"
    },
    replacement: {
      display: "[PHONE]", /* campaign: Roof Replacement */
      href: "tel:+10000000000"
    },
    contact: {
      display: "[PHONE]", /* campaign: Contact / main line */
      href: "tel:+10000000000"
    },
    default: {
      display: "[PHONE]",
      href: "tel:+10000000000"
    }
  },

  /* Business email for on-page mailto links. */
  email: "info@shilohspecialtyroofing.com",

  /* Where forms submit. Netlify Forms works with no backend once the site
     is deployed on Netlify (see netlify.toml and the form's data-netlify
     attribute in each page). To use a different endpoint instead, change
     the <form action="..."> value in each HTML file — search for
     "FORM ENDPOINT" comments. */
  thankYouUrl: "thank-you.html"
};
