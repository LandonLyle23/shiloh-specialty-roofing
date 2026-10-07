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

   All five campaign keys currently point to the same main line. Give any
   one of them its own "display"/"href" later (e.g. a CallRail number) to
   start tracking that campaign separately; nothing else needs to change.
   ========================================================================== */

window.SHILOH_CONFIG = {
  phones: {
    /* display strings are kept short on purpose — real tracking numbers
       are ~14 characters and need to fit the header/sticky-bar layout
       without wrapping. */
    home: {
      display: "(770) 235-1146", /* campaign: Home */
      href: "tel:+17702351146"
    },
    specialty: {
      display: "(770) 235-1146", /* campaign: Specialty Materials */
      href: "tel:+17702351146"
    },
    storm: {
      display: "(770) 235-1146", /* campaign: Storm & Insurance */
      href: "tel:+17702351146"
    },
    replacement: {
      display: "(770) 235-1146", /* campaign: Roof Replacement */
      href: "tel:+17702351146"
    },
    contact: {
      display: "(770) 235-1146", /* campaign: Contact / main line */
      href: "tel:+17702351146"
    },
    default: {
      display: "(770) 235-1146",
      href: "tel:+17702351146"
    }
  },

  /* Business email for on-page mailto links. */
  email: "info@shilohspecialtyroofing.com",

  /* ====================================================================
     GOOGLE ANALYTICS 4 — single place to set this. js/analytics.js reads
     it on every page; nothing else needs to change once a real ID exists.

     *** PLACEHOLDER — NOT A REAL ID YET ***
     Replace "G-XXXXXXXXXX" with the real GA4 Measurement ID (Admin >
     Data Streams > [your stream] > Measurement ID, format G-XXXXXXXXXX).
     Until it's replaced, js/analytics.js detects this placeholder and
     skips loading gtag.js entirely rather than sending test traffic to
     a nonexistent property.
     ==================================================================== */
  ga4MeasurementId: "G-XXXXXXXXXX",

  /* Where forms submit. Netlify Forms works with no backend once the site
     is deployed on Netlify (see netlify.toml and the form's data-netlify
     attribute in each page). To use a different endpoint instead, change
     the <form action="..."> value in each HTML file — search for
     "FORM ENDPOINT" comments. */
  thankYouUrl: "thank-you.html"
};
