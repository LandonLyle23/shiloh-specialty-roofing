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

     Real ID for the shilohspecialtyroofing.com web stream (set Oct 29,
     2026). Note the character after "H" is a zero, not the letter O.
     Found in GA: Admin > Data Streams > Website > Measurement ID.
     Setting this back to "G-XXXXXXXXXX" turns tracking off entirely:
     js/analytics.js skips loading gtag.js for that placeholder.
     ==================================================================== */
  ga4MeasurementId: "G-DY5LH0MGPF",

  /* ====================================================================
     GOOGLE ADS CONVERSIONS — *** PLACEHOLDERS, owner to supply ***
     In Google Ads: Goals > Conversions > New conversion action > Website.
     Make two actions ("Website lead form" and "Phone number tap"), choose
     "Use Google tag", and copy the send_to value each one shows, which
     looks like AW-123456789/AbCdEfGhIjK. The part before the slash goes in
     conversionId (same for both); the part after it is that action's
     label. While any of these is still a placeholder, js/analytics.js
     sends nothing to Google Ads.
       leadLabel: fires on the thank you page, after any form submission.
       callLabel: fires on every tap or click of a tel: phone link.
     ==================================================================== */
  googleAds: {
    conversionId: "AW-XXXXXXXXXX",
    leadLabel: "XXXXXXXXXXX",
    callLabel: "XXXXXXXXXXX"
  },

  /* Where forms submit. Netlify Forms works with no backend once the site
     is deployed on Netlify (see netlify.toml and the form's data-netlify
     attribute in each page). To use a different endpoint instead, change
     the <form action="..."> value in each HTML file — search for
     "FORM ENDPOINT" comments. */
  thankYouUrl: "thank-you.html"
};
