# Shiloh Specialty Roofing — Marketing Site

Static, no-CMS marketing site for Shiloh Specialty Roofing LLC. Plain HTML/CSS with minimal vanilla JS. No build step, no framework, no dependencies to install — open `index.html` in a server or deploy the folder as-is.

## Structure

```
index.html                 Home — asymmetric hero split, who-we-are, service area, contact form
specialty-materials.html   Cedar / standing seam metal / slate / copper / tile — the deep trade page
storm-insurance.html       Full insurance claim walkthrough
roof-replacement.html      Short asphalt shingle landing page (for search ads)
contact.html               Contact form + details
thank-you.html             Form redirect target — own URL for ad conversion tracking
css/style.css              Entire design system: tokens, layout, components
js/config.js               Per-campaign phone numbers — the one file to edit for tracking numbers
js/main.js                 Populates phone numbers from config.js, mobile nav toggle
assets/logo/               Favicon + logo mark (placeholder — see below)
assets/svg/                Standalone copies of the 4 technical diagrams (also inlined in specialty-materials.html)
netlify.toml                Netlify build/headers config
```

## Before launch — things you need to supply

Everything below is marked with a bracketed placeholder in the HTML (e.g. `[PHONE]`, `[LICENSE NUMBER]`). Search any file for `[` to find them all, or use the list below.

| Placeholder | Where | Notes |
|---|---|---|
| Phone numbers (×5) | `js/config.js` | One per campaign: Home, Specialty, Storm, Replacement, Contact/main. Edit `display` and `href` for each — this is the **only** place phone numbers live in the codebase. |
| Email address | `js/config.js` → `email` | Populates every `mailto:` link and visible email site-wide. |
| Street address / ZIP | `index.html`, `contact.html`, footers, schema | Search `[STREET ADDRESS]` / `[ZIP CODE]`. |
| License number | Every footer + `contact.html` | Search `[LICENSE NUMBER]`. |
| Years in business / founding story | `index.html` "Who We Are" section | Currently a placeholder sentence — send real specifics and it can be written in properly. |
| Business hours | `contact.html` | Search `[PLACEHOLDER: business hours]`. |
| Workmanship warranty terms | `roof-replacement.html` | Search `[PLACEHOLDER: workmanship warranty`. |
| Logo files | `assets/logo/` | See below — currently a hand-drawn placeholder mark + CSS wordmark. |
| Conversion tracking snippet | `thank-you.html` `<head>` | Commented-out example for Google Ads/GA4 — uncomment and fill in your IDs once accounts exist. |

## Fonts

- **Body/subheadings — Montserrat**: already loaded from Google Fonts on every page. No action needed.
- **Headings — Monument Extended**: this is a licensed font and is **not** bundled or loaded from a CDN. Until you add it:
  1. Purchase/download the license and webfont files (need at least a regular and bold/black weight, `.woff2`).
  2. Create `assets/fonts/` and drop in `monument-extended-regular.woff2` and `monument-extended-bold.woff2`.
  3. Open `css/style.css`, find the commented `@font-face` blocks near the top, and uncomment them.

  Until then, headings render in the fallback stack (`Archivo Expanded`, `Arial Black`, heavy sans) — a close visual stand-in, not a placeholder-looking gap.

## Logo

The header, footer, and favicon currently use a hand-drawn placeholder SVG mark (a simplified layered roof-peak chevron) plus a CSS-styled "Shiloh / Specialty Roofing" wordmark — built to match the approved brand board's proportions and typography until the real files are dropped in.

To swap in the real logo:
1. Export the approved mark as SVG (ideally) or PNG from your source files.
2. Add it to `assets/logo/`.
3. Each page has two identical inline `<svg>` blocks marked `<!-- PLACEHOLDER MARK -->` (one in the header, one in the footer) — replace both with an `<img src="assets/logo/your-file.svg" alt="Shiloh Specialty Roofing">` or inline the new SVG directly.
4. Replace `assets/logo/favicon.svg` with a simplified version of the real mark for browser tabs.

Brand colors are defined once, at the top of `css/style.css`, as CSS custom properties (`--color-black`, `--color-white`, `--color-tan`) — do not add new colors elsewhere.

## Mobile texture images

`css/style.css` (`.texture-band`, `.route-card--specialty`, `.route-card--storm`) and `index.html` reference material close-up photos that don't exist yet — macro shots of cedar shake, slate, copper, standing seam metal, and clay tile, used as a photography stand-in to break up page rhythm on mobile. Until real files are dropped in, every reference fails gracefully (empty `alt`, an `onerror` hide on the `<img>` bands, and a black/roofline-vector fallback on the card backgrounds) — nothing broken shows on screen.

To add the real photos, save them into `assets/textures/` using these exact filenames (referenced directly in `index.html` and `css/style.css`, no other markup changes needed):

| Filename | Used by | Target size | Target weight |
|---|---|---|---|
| `cedar-shake-01.jpg` | Texture band after hero | 1200×400px (crops to ~800×200 on mobile, ~1200×120 on desktop) | ≤150KB |
| `standing-seam-01.jpg` | Texture band between routing cards (mobile only) | 900×400px | ≤120KB |
| `slate-copper-01.jpg` | Texture band before Family Owned | 1200×400px | ≤150KB |
| `clay-tile-01.jpg` | Texture band before contact form | 1200×400px | ≤150KB |
| `cedar-shake-02.jpg` | Specialty Replacement card background (mobile) | 800×600px | ≤120KB |
| `metal-sky-01.jpg` | Storm & Insurance card background (mobile) | 800×600px | ≤120KB |

Export as JPG at ~75% quality (these sit under a 40-55% black overlay, so fine detail is wasted bytes). All are decorative texture, not content photos, so no alt text is needed.

## Forms

All five lead forms (Home, Specialty, Storm, Replacement, Contact) share `name="lead"` and post to **Netlify Forms** via `data-netlify="true"` — no backend or JS required once deployed on Netlify. Netlify detects the form automatically at deploy time from the static HTML. Submissions land in one place in the Netlify dashboard (Site → Forms), with a hidden `source-page` field so you can tell which page each lead came from. A honeypot field (`bot-field`) filters basic spam bots.

Every form redirects to `thank-you.html` on success (`action="thank-you.html"`).

**If you deploy somewhere other than Netlify** (Cloudflare Pages, etc.), Netlify Forms won't work. In each HTML file, change the `<form>` tag's `action` to your endpoint (e.g. Formspree) and remove the `data-netlify` / `netlify-honeypot` attributes and the hidden `form-name` input.

## Deploying

**Netlify (recommended, matches the forms setup above):**
1. Drag the project folder into Netlify's dashboard, or connect it as a Git repo.
2. No build command needed — publish directory is `.` (already set in `netlify.toml`).
3. Add your custom domain (`shilohspecialtyroofing.com`) in Site settings → Domain management.
4. In GoDaddy, point the domain at Netlify: either change nameservers to Netlify's, or add the A/CNAME records Netlify provides.
5. Enable HTTPS (Netlify provisions this automatically once DNS resolves).

**Cloudflare Pages:** same static deploy, but see the Forms note above first — you'll need an external form endpoint.

## Local preview

No build step — any static file server works:

```
python3 -m http.server 8898
```

Note: Python's built-in server doesn't handle POST requests, so form submission won't actually redirect locally — that's expected, and works correctly once deployed to Netlify.

## SEO / schema

Every page has a unique `<title>` and meta description. `index.html` carries the primary `RoofingContractor` JSON-LD schema (name, address, service area by county, service catalog); the other service pages carry a lighter `Service` schema referencing it. Service area in schema and on-page copy explicitly names Dawsonville, Dawson County, Hall County (Gainesville), Forsyth County, Fulton County, Jackson County, and Gwinnett County.
