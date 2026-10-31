/* ==========================================================================
   SHILOH SPECIALTY ROOFING — GOOGLE ANALYTICS 4
   Loaded on every page. The Measurement ID lives in ONE place —
   window.SHILOH_CONFIG.ga4MeasurementId in js/config.js — so swapping in
   the real ID later is a one-line change here, nowhere else.

   Two conversion events, both plain GA4 events (no Google Ads account
   needed to receive them; map them to Ads conversions later if/when that
   account exists):
     - "generate_lead" fires once, on page load, only when the current
       page is /thank-you — i.e. only after a real form submission,
       since that's the only way to land there.
     - "phone_call_click" fires on any tel: link anywhere on the page,
       via one delegated listener rather than wiring up every phone
       link (header, sticky bar, footer, contact page) individually.

   If the Measurement ID in config.js is still the placeholder, this
   script does nothing — no gtag.js request, no dataLayer, no event
   listeners — rather than sending real traffic to a property that
   doesn't exist yet.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SHILOH_CONFIG;
  var id = cfg && cfg.ga4MeasurementId;
  if (!id || id === "G-XXXXXXXXXX") return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);

  /* Google Ads conversions ride on the same gtag.js. Off until all three
     values in SHILOH_CONFIG.googleAds are real (none contain "XXXX"). */
  var ads = cfg.googleAds || {};
  var adsOn = [ads.conversionId, ads.leadLabel, ads.callLabel].every(function (v) {
    return v && v.indexOf("XXXX") === -1;
  });
  if (adsOn) gtag("config", ads.conversionId);

  var loader = document.createElement("script");
  loader.async = true;
  loader.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(loader);

  if (/\/thank-you(\.html)?\/?$/.test(window.location.pathname)) {
    gtag("event", "generate_lead", {
      event_category: "lead_form",
      event_label: "thank_you_page_view"
    });
    if (adsOn) {
      gtag("event", "conversion", { send_to: ads.conversionId + "/" + ads.leadLabel });
    }
  }

  document.addEventListener("click", function (e) {
    var link = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
    if (!link) return;
    gtag("event", "phone_call_click", {
      event_category: "contact",
      event_label: link.getAttribute("href")
    });
    if (adsOn) {
      // Beacon transport so the hit survives the phone app taking over.
      gtag("event", "conversion", {
        send_to: ads.conversionId + "/" + ads.callLabel,
        transport_type: "beacon"
      });
    }
  });
})();
