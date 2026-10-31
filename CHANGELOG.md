# Changelog

Every change merged to main (and so published to shilohspecialtyroofing.com) gets an entry here: date, what changed, why.

## 2026-10-31

**Replacement now opens the Asphalt Roofing page; Deborah's photo on Our Story.**
- The Asphalt Roofing page already is the replacement page (process, warranties, estimate form), so the Replacement menu item now opens it. The empty Replacement placeholder was deleted; /asphalt-roof-replacement redirects to /asphalt-roofing and left the site map.
- Why Shiloh now shows the owner's photo of Deborah on the treehouse deck (WebP 94 KB, JPG fallback 114 KB), uncropped so the cedar shake roof Danny built stays in frame, with the owner's alt text.
- Why: owner chose to point Replacement at Asphalt Roofing, and sent the photo.

**New mobile hero image (phones only).**
- The phone poster and autoplay fallback is now the strongest frame of the hero video (17.5 seconds: the full house, pool and tree canopy), cropped 608 by 1080 with the house centered. WebP 49 KB, with a 71 KB JPG fallback for browsers without WebP. Desktop is unchanged.
- Phones get a slightly darker overlay (0.66 instead of 0.62) so the intro paragraph passes 4.5:1 contrast over the brightest part of the image (measured 4.9:1).
- File slot for the owner's own vertical photo: replace assets/hero-poster-mobile.webp and assets/hero-poster-mobile.jpg, keeping the names.
- Why: owner asked for a stronger vertical mobile hero image.

**Our Team: Landon as the first card, Founder & CEO.**
- The large founder block is replaced by a regular team card, first in the row, the same size as the others, with a tan border and a "Read Landon's story" link that opens his bio in place. Cards now run three across on desktop with the last row centered, so every photo is about twice as large as before.
- Why: owner wants to be first and slightly set apart, not bigger than everyone, and asked for bigger photos for all.

**Asphalt Roofing dropdown: Replacement, Storm and Restoration, Inspections; Repairs page removed.**
- Replacement and Storm and Restoration are now in the menu and site map and open to search engines, still showing "Content coming soon" until the owner sends content. The Repairs placeholder page was deleted.
- Why: owner does not offer repairs and asked for the remaining pages to go live.

**Home video plays on phones; Why Shiloh and founder bio; copper and all insurance wording removed.**
- Home hero video: phones were hidden from the video by CSS yet still downloaded the full 13 MB desktop file. Phones now get a 6 second vertical cut (WebM 234 KB or MP4 350 KB) with a 49 KB vertical poster; desktop keeps the original. If autoplay is blocked the poster zooms in slowly; reduced motion and Data Saver get a still poster and no video. Mobile page weight in Lighthouse: about 12.8 MB before, 1.5 MB after.
- Our Story: new Why Shiloh section in the owner's words, with a photo slot (alt text ready) for Deborah on the treehouse deck.
- Our Team: Landon's founder bio in the owner's words; Mark, Brandi, Melissa and Amy stay as name, role and photo cards until their bios arrive.
- Specialty menu and overview cards now run Standing Seam Metal, Cedar, Slate, Tile.
- Copper removed everywhere: the Copper section, list mentions, the form option, and search engine details. Sentences on the Slate and Standing Seam pages that used copper as an example were trimmed.
- Insurance wording removed everywhere: the footer public adjuster note, the home page claim line, the "Storm / insurance claim" form option (now "Storm damage"), and search engine details.
- Removed "fully insured" from the Asphalt page's search and social descriptions; not yet confirmed in writing.
- Why: owner's Oct 31 change list.

**Phone number in the desktop header; no more requests for missing images.**
- (770) 235-1146 now sits in the desktop header next to the theme toggle, tap or click to call. Phones keep the Call Now bar.
- Pages no longer ask for texture photos that were never added (two to four missing files per page). The bands and cards look the same as before: solid black until real photos are supplied. The Monument Extended font was already switched off, so nothing changed there.
- Why: owner approved both fixes; missing files slow every page load.

## 2026-10-30

**Specialty Roofing dropdown: Cedar, Standing Seam, Slate, Tile; Storm and Restoration placeholder.**
- The cedar, standing seam metal, slate and tile sections moved word for word from the Specialty Roofing page onto their own pages, which are now in the menu and the site map. The Specialty page keeps its intro, the assembly diagram, Copper and TPO, plus a card linking to each material page.
- New Storm and Restoration placeholder page under Asphalt Roofing, kept out of the menu and site map and hidden from search engines until the owner sends content and approves it.
- Why: owner asked for a tab per specialty material and a Storm and Restoration item.

**Top navigation rebuilt with dropdowns; Storm & Insurance folded into Roof Inspections.**
- Menu is now Home, Specialty Roofing (Cedar, Standing Seam, Slate, Tile), Asphalt Roofing (Inspections), About (Our Story, Our Team), and a Request an Estimate button. Each tab opens its overview page; the arrow beside it opens the dropdown by click, tap, or keyboard. On phones each tab expands in place. Contact left the menu (Request an Estimate goes to the Contact page); Home stays first.
- New placeholder pages for Asphalt Roof Replacement and Asphalt Roof Repairs, each with its own title, H1 and estimate button. They stay out of the menu and site map, and are hidden from search engines, until the owner sends content and approves them.
- New Roof Inspections page (/roof-inspections) carries over the storm page's wind and hail text and inspection steps, with all claim, coverage and deductible wording removed. The storm page and its PDF guide form are gone; /storm-insurance redirects to Roof Inspections. The home page storm card now points there too.
- Site map lists every live page with clean URLs.
- Why: owner asked for dropdown navigation and to fold storm content into Asphalt as Inspections.

**About split into two pages: Our Story and Our Team.**
- Our Story (/our-story) has the four generation biography; Our Team (/our-team) has the team cards. Each has its own title and H1, no repeated copy, and ends with a Request an Estimate button.
- The top menu's About is now a dropdown with Our Story then Our Team; in the phone menu both are listed under About. Footers link to both pages.
- /about and /about.html now redirect to /our-story, and both new pages are in the site map.
- Why: owner asked for separate Story and Team pages.

**About page: team and family photos.**
- Snooks Samples (First Generation block), Danny Samples (Second Generation block), Landon Lyle (Our Team card and Fourth Generation block), Mark Samples (Our Team card and Third Generation block), Brandi Miller, Melissa Samples and Amy Lyle (Our Team cards). Every team and family block now has a photo; they keep their frame shape on every screen size.
- Why: owner sent the photos.

**About page: Our Team now has five named cards.**
- Landon Lyle (Founder & CEO), Mark Samples (Roofing Advisor), Brandi Miller (Operations Advisor), Melissa Samples (Office Manager), Amy Lyle (Chief Prayer Officer). Photos and one line bios still coming soon. Cards sit two across on tablets and three across on wide screens.
- Why: owner sent the team names and roles.

## 2026-10-29

**About page: corrected spelling to "Snooks Samples".**
- First generation heading fixed from "Snook".
- Why: owner correction.

**About page: full family names in Legacy.**
- Headings now read Snook Samples, Danny Samples, Mark Samples and Landon Lyle, under the First through Fourth Generation labels.
- Why: owner sent the full names.

**About page split into Legacy and Our Team.**
- The page now opens with "Built Higher." and two cards, Legacy and Our Team, that jump to each section. The biography section is now titled Legacy; family names are subheadings under it.
- Why: owner asked for two distinct sections at the top of one About page.

**Turned on Google Analytics (G-DY5LH0MGPF).**
- Every page now reports visits. Tapping any phone number records a phone_call_click event; reaching the Thank You page after a form submission records a generate_lead event.
- Why: owner created the Analytics property so calls and leads can be measured.

**Privacy page: removed "We do not use advertising or retargeting cookies."**
- Why: the Google Analytics setup also contacts Google's advertising server (Google signals), so the sentence was not accurate.

**About page: family names in the biography.**
- Third generation heading is now "Uncle Mark"; fourth generation is now "Landon". Great Grandfather and Grandfather stay as titles until their names arrive.
- Why: owner sent the family order and names.

**"More than fifty years" now reads "fifty years".**
- Home page, Who We Are section.
- Why: owner confirmed the number is exactly 50.

**Restructured the About page: four generations biography, Our Team cards, Request an Estimate button.**
- "Four Generations. One Standard." with four blocks in order (first through fourth generation: great grandfather, grandfather, Mark, owner), then an Our Team section with one card per person (photo, name, role, one line), then a Request an Estimate button to the Contact page.
- Copy and photos are "coming soon" placeholders until the owner sends the exact text and photos.
- Removed the "Insured on every job" claim (not yet confirmed in writing) and the page's own form; the header and phone bar buttons now go to the Contact page form.
- Why: owner requested the new About structure and asked for it live with placeholders.

**Fixed sideways scrolling on phones; closed mobile menu now fully hidden.**
- Every page was 690px wide on a 375px phone because the closed menu drawer sat just off screen, so visitors could drag the page sideways. The page now clips anything wider than the screen, and the closed menu is hidden from keyboard and screen reader users too.
- Why: found during the live mobile check after the 50 years change; it made the site feel broken on phones.

**Changed 30 years to 50 years site wide; new home page headline.**
- Every mention of thirty years now reads fifty (home hero, Family Owned count up now counting to 50, Who We Are, About page, every page footer, home page search and social descriptions). "Three decades" now reads "Five decades".
- Home hero headline changed from "The roof should be as good as the house." to "The roof should be the best part of the house."
- Why: owner confirmed the family has 50 years on north Georgia roofs, and requested the new headline.
