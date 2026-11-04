# Test cases — The site as designed

Module: `site` · Plan item: The site as designed
Source: `docs/site/SRS.md` (SITE-001..007), `docs/site/stories/the-site-as-designed.md` (SC-1..29)

Risk framing: this module is read-only, public, static-data content (no
auth, no writes, no payment). Depth is proportional — one happy-path case
per criterion, a boundary case wherever the SRS states a number (6, 4), and
an empty/not-found case wherever the SRS draws one. No speculative cases
beyond what SITE-001..007 state.

Instruments available to the verifier: `fetch_url`, `render_url`,
`measure_styles`, `interact_page`, `manual`. This module ships no backend
(shape `static`), so there is no API response to `fetch_url`; every case
below is checked by `render_url` (what the page shows), `interact_page`
(what an action does) or `measure_styles` (a computed visual fact). `manual`
is used only where the arrangement needed (emptying a committed JSON data
file, or emptying `content.json`'s owner-supplied contact fields) is not
something any instrument can produce at verification time.

---

## Home (SITE-001)

**Scenario**: Home shows up to 3 featured teas, each priced and linking out
**Given**: `src/data/teas.json` has 3 records (lotus, jasmine, oolong)
**When**: the visitor opens `/`
**Then**: "The board" section shows up to 3 tea tiles, each with its name, English name, 100g price and 250g price, and each tile links to its own `/teas/:id`
**Traces**: SC-1 (SITE-001 AC-1)
**Check**: render_url

**Scenario**: Home lists every pot with a correct count line
**Given**: `src/data/pots.json` has 3 records
**When**: the visitor opens `/`
**Then**: "At the table" shows all 3 pots, each with name, note and price, and the count line reads "3 pots on the list"
**Traces**: SC-2 (SITE-001 AC-2)
**Check**: render_url

**Scenario**: Home shows a gallery preview with a link to the full gallery
**Given**: `src/data/gallery.json` has 6 records
**When**: the visitor opens `/`
**Then**: "Inside the shop" shows up to 3 photographs each with its caption, and "All the photographs" links to `/gallery`
**Traces**: SC-3 (SITE-001 AC-3)
**Check**: render_url

**Scenario**: Home's address and hours match the owner's contact record exactly
**Given**: `content.json`'s `contact.address` is "58 Quán Thánh, Ba Đình, Hà Nội" and `contact.hours` is "8:00–21:00 every day"
**When**: the visitor opens `/`
**Then**: "Finding us" shows that address and hours verbatim, and "The map and the hours" links to `/visit`
**Traces**: SC-4 (SITE-001 AC-4)
**Check**: render_url

**Scenario**: Home's board renders with no tiles when the teas list is empty
**Given**: `src/data/teas.json` is emptied to `[]`
**When**: the visitor opens `/`
**Then**: "The board" section renders with its heading and note but no tea tiles, and no error or placeholder is shown
**Traces**: SC-5 (SITE-001, empty teas)
**Check**: manual — reason: emptying the committed `src/data/teas.json` is not reachable by `fetch_url`/`render_url`/`interact_page`/`measure_styles`; no data-state tool exists for this static-JSON module

**Scenario**: Home's pots list renders with a count of 0 when the pots list is empty
**Given**: `src/data/pots.json` is emptied to `[]`
**When**: the visitor opens `/`
**Then**: "At the table" shows no rows and the count line reads "0 pots on the list"; no error shown
**Traces**: SC-5 (SITE-001, empty pots)
**Check**: manual — reason: same as above, no tool empties the committed JSON fixture

**Scenario**: Home's gallery preview renders with no photographs when the gallery is empty
**Given**: `src/data/gallery.json` is emptied to `[]`
**When**: the visitor opens `/`
**Then**: "Inside the shop" shows its heading and the "All the photographs" link but no photographs; no error shown
**Traces**: SC-5 (SITE-001, empty gallery)
**Check**: manual — reason: same as above

---

## Teas listing (SITE-002)

**Scenario**: More than 6 teas — first page, count and "Show more" visible
**Given**: the teas list has more than 6 records
**When**: the visitor opens `/teas`
**Then**: the first 6 tea tiles are shown, the count line reads the total number of blends, and "Show more blends" is visible
**Traces**: SC-6 (SITE-002 AC-1)
**Check**: render_url

**Scenario**: Clicking "Show more blends" appends the next page
**Given**: the visitor is on `/teas` with "Show more blends" visible
**When**: the visitor clicks "Show more blends"
**Then**: the next page of tea tiles is appended below the first 6, and the grid now shows more tiles than before the click
**Traces**: SC-7 (SITE-002 AC-2)
**Check**: interact_page

**Scenario**: "Show more blends" shows a loading state while the next page loads
**Given**: the visitor is on `/teas` with "Show more blends" visible
**When**: the visitor clicks "Show more blends"
**Then**: "Loading…" text is shown while the next page loads
**Traces**: SC-7 (SITE-002, loading state)
**Check**: interact_page

**Scenario**: 3 teas (6 or fewer) — all shown, no "Show more" button
**Given**: `src/data/teas.json` has 3 records
**When**: the visitor opens `/teas`
**Then**: all 3 tea tiles are shown and "Show more blends" does not appear
**Traces**: SC-8 (SITE-002 AC-3)
**Check**: render_url

**Scenario**: Exactly 6 teas — all shown on first load, no "Show more" button
**Given**: the teas list has exactly 6 records
**When**: the visitor opens `/teas`
**Then**: all 6 tea tiles are shown on the first load and "Show more blends" does not appear
**Traces**: SC-8 (SITE-002, boundary: exactly 6)
**Check**: manual — reason: the committed fixture holds 3 teas; producing exactly 6 needs editing `src/data/teas.json`, which no verification instrument can do

**Scenario**: `/teas` lists every pot with its name, note and price
**Given**: `src/data/pots.json` has 3 records
**When**: the visitor opens `/teas`
**Then**: the pots section lists all 3 pots, each with its name, note and price
**Traces**: SC-9 (SITE-002 AC-4)
**Check**: render_url

---

## Tea detail (SITE-003)

**Scenario**: Existing blend shows its full detail
**Given**: `src/data/teas.json` has a record with id `tra-sen`
**When**: the visitor opens `/teas/tra-sen`
**Then**: the page shows the blend's name ("Trà sen"), English name ("Lotus"), note, leaf description, brewing note, both photographs (tin and scene), the "We do not sell online" order note, the call/Zalo buttons, and the 100g price (320.000₫) and 250g price (740.000₫) each on their own row
**Traces**: SC-10 (SITE-003 AC-1)
**Check**: render_url

**Scenario**: Unknown blend id shows the missing-blend state, not the blend fields
**Given**: no tea record has id `does-not-exist`
**When**: the visitor opens `/teas/does-not-exist`
**Then**: the page shows "We do not have that blend", names the three board blends, and shows a link back to `/teas`; none of a blend's name, note, leaf, brewing or price fields are rendered
**Traces**: SC-11 (SITE-003 AC-2)
**Check**: render_url

---

## Gallery (SITE-004)

**Scenario**: More than 4 photographs — first page, count and "Show more" visible
**Given**: `src/data/gallery.json` has 6 records
**When**: the visitor opens `/gallery`
**Then**: the first 4 photographs are shown full-width with captions, the count reads "6 photographs", and "Show more photographs" is visible
**Traces**: SC-12 (SITE-004 AC-1)
**Check**: render_url

**Scenario**: Clicking "Show more photographs" appends the next page
**Given**: the visitor is on `/gallery` with "Show more photographs" visible
**When**: the visitor clicks "Show more photographs"
**Then**: the next page of photographs (the remaining 2) is appended below the first 4
**Traces**: SC-13 (SITE-004 AC-2)
**Check**: interact_page

**Scenario**: "Show more photographs" shows a loading state while the next page loads
**Given**: the visitor is on `/gallery` with "Show more photographs" visible
**When**: the visitor clicks "Show more photographs"
**Then**: "Loading…" text is shown while the next page loads
**Traces**: SC-13 (SITE-004, loading state)
**Check**: interact_page

**Scenario**: 4 or fewer photographs — all shown, no "Show more" button
**Given**: the gallery list has 4 or fewer records
**When**: the visitor opens `/gallery`
**Then**: all of them are shown full-width with captions and "Show more photographs" does not appear
**Traces**: SC-14 (SITE-004 AC-3)
**Check**: manual — reason: the committed fixture holds 6 photographs; reducing it to 4 or fewer needs editing `src/data/gallery.json`, which no verification instrument can do

**Scenario**: Exactly 4 photographs — all shown, no "Show more" button
**Given**: the gallery list has exactly 4 records
**When**: the visitor opens `/gallery`
**Then**: all 4 are shown and "Show more photographs" does not appear
**Traces**: SC-14 (SITE-004, boundary: exactly 4)
**Check**: manual — reason: same as above

---

## About (SITE-005)

**Scenario**: Story chapters with non-empty body are shown; empty ones are not
**Given**: `src/data/story.json` has 3 chapters, all with non-empty `body`
**When**: the visitor opens `/about`
**Then**: all 3 chapters are shown, each with its heading and body text
**Traces**: SC-15 (SITE-005 AC-1)
**Check**: render_url

**Scenario**: Team section appears when at least one team record has a non-empty name
**Given**: at least one record in `src/data/team.json` has a non-empty `name`
**When**: the visitor opens `/about`
**Then**: the team section and its heading are shown, listing each named person's name and role
**Traces**: SC-16 (SITE-005 AC-2)
**Check**: manual — reason: the committed `src/data/team.json` has both records with empty `name`; setting a name needs editing that file, which no verification instrument can do

**Scenario**: Team section is entirely hidden when no team record has a name
**Given**: `src/data/team.json` has 2 records, both with empty `name`
**When**: the visitor opens `/about`
**Then**: the team section, including its heading ("Who blends the tea"/"The people here"), does not appear anywhere on the page
**Traces**: SC-17 (SITE-005 AC-3)
**Check**: render_url

**Scenario**: Testimonials section appears when at least one testimonial has a non-empty quote
**Given**: at least one record in `src/data/testimonials.json` has a non-empty `quote`
**When**: the visitor opens `/about`
**Then**: the testimonials section and its heading are shown, listing each quote and who said it
**Traces**: SC-18 (SITE-005 AC-4)
**Check**: manual — reason: the committed `src/data/testimonials.json` has all 3 records with empty `quote`; setting one needs editing that file, which no verification instrument can do

**Scenario**: Testimonials section is entirely hidden when no testimonial has a quote
**Given**: `src/data/testimonials.json` has 3 records, all with empty `quote`
**When**: the visitor opens `/about`
**Then**: the testimonials section, including its heading ("What customers say"/"In our customers' words"), does not appear anywhere on the page
**Traces**: SC-19 (SITE-005 AC-5)
**Check**: render_url

---

## Visit (SITE-006)

**Scenario**: Visit page's address and hours match the owner's contact record exactly
**Given**: `content.json`'s `contact.address` is "58 Quán Thánh, Ba Đình, Hà Nội" and `contact.hours` is "8:00–21:00 every day"
**When**: the visitor opens `/visit`
**Then**: the facts list shows that address and those hours verbatim
**Traces**: SC-20 (SITE-006 AC-1)
**Check**: render_url

**Scenario**: Visit page shows a map embed reflecting the shop's name and address
**Given**: `content.json`'s `site.name` is "Trà Sen Hồ Tây" and `contact.address` is "58 Quán Thánh, Ba Đình, Hà Nội"
**When**: the visitor opens `/visit`
**Then**: a map embed (iframe) is present beside a photograph, and its source query reflects the shop's name and address
**Traces**: SC-21 (SITE-006 AC-2)
**Check**: render_url

**Scenario**: Tapping the phone row targets the device dialer with the owner's phone digits
**Given**: `content.json`'s `contact.phone` is "024 3829 1188"
**When**: the visitor taps the phone row on `/visit`
**Then**: the row is an anchor with `href="tel:02438291188"` (digits only)
**Traces**: SC-22 (SITE-006 AC-3)
**Check**: interact_page

**Scenario**: Tapping the Zalo row opens a new tab to the owner's Zalo chat
**Given**: `content.json`'s `contact.zalo` is "024 3829 1188"
**When**: the visitor taps the Zalo row on `/visit`
**Then**: the row is an anchor with `href="https://zalo.me/02438291188"` and `target="_blank"`
**Traces**: SC-23 (SITE-006 AC-4)
**Check**: interact_page

---

## Shared chrome and contact buttons (SITE-007)

**Scenario**: CallButtons shows a call button and a Zalo button, in that order
**Given**: `content.json`'s `contact.phone` and `contact.zalo` are both set
**When**: the visitor opens any page that places `CallButtons` (Home, Teas, Tea detail, Visit, About)
**Then**: a filled call button labelled with the phone number appears first, followed by an outline Zalo button
**Traces**: SC-24 (SITE-007 AC-1)
**Check**: render_url

**Scenario**: Call button is omitted when the phone number is empty
**Given**: `content.json`'s `contact.phone` is empty and `contact.zalo` is set
**When**: the visitor opens a page placing `CallButtons`
**Then**: no call button is shown; the Zalo button still shows
**Traces**: SC-24 (SITE-007, behaviour 1 — missing phone)
**Check**: manual — reason: `content.json`'s `contact.phone` is the owner's real, committed value; emptying it is not reachable by any verification instrument

**Scenario**: Zalo button is omitted when the Zalo value is empty
**Given**: `content.json`'s `contact.zalo` is empty and `contact.phone` is set
**When**: the visitor opens a page placing `CallButtons`
**Then**: no Zalo button is shown; the call button still shows
**Traces**: SC-24 (SITE-007, behaviour 1 — missing Zalo)
**Check**: manual — reason: same as above, `contact.zalo` is the owner's real, committed value

**Scenario**: ContactDock appears fixed in the lower-right corner below 1024px
**Given**: `content.json`'s `contact.phone` and `contact.zalo` are both set
**When**: the visitor opens any page at a viewport width below 1024px
**Then**: `ContactDock` is present with computed `position: fixed`, pinned to the lower-right corner (non-zero `bottom`/`right`, not `top`/`left`)
**Traces**: SC-25 (SITE-007 AC-2)
**Check**: measure_styles

**Scenario**: ContactDock does not render when neither phone nor Zalo is set
**Given**: `content.json`'s `contact.phone` and `contact.zalo` are both empty
**When**: the visitor opens any page at a viewport width below 1024px
**Then**: `ContactDock` does not render at all
**Traces**: SC-26 (SITE-007 AC-3)
**Check**: manual — reason: both owner-supplied contact fields are committed, non-empty values; emptying both is not reachable by any verification instrument

**Scenario**: An undefined URL shows the not-found page with a link back to the teas list
**Given**: no `<Route>` in `src/App.tsx` matches `/this-page-does-not-exist`
**When**: the visitor opens `/this-page-does-not-exist`
**Then**: the not-found page shows its label, heading, body text, and a link back to `/teas`; the page is never blank
**Traces**: SC-27 (SITE-007 AC-4)
**Check**: render_url

**Scenario**: Footer shows the shop's details exactly as given in content.json
**Given**: `content.json` has the shop's name, address, hours, phone, Zalo and the footer's "we do not sell online" line
**When**: the visitor opens any page
**Then**: the footer shows the shop name, address, hours, phone, Zalo, the four nav links, and the "we do not sell online" line, each matching `content.json` verbatim
**Traces**: SC-28 (SITE-007 AC-5)
**Check**: render_url

**Scenario**: Header at desktop width shows logo, nav links and a call button
**Given**: viewport width is at or above 1024px
**When**: the visitor opens any page
**Then**: the header shows the shop logo/name linking to `/`, the four nav links ("The teas", "Photographs", "The shop", "Visit"), and the phone number as a call button
**Traces**: SC-29 (SITE-007, header ≥1024px)
**Check**: render_url

**Scenario**: Header at mobile width opens a full-screen nav panel from the menu toggle
**Given**: viewport width is below 1024px
**When**: the visitor taps the menu toggle
**Then**: a full-screen nav panel opens showing the same four nav links and the call button
**Traces**: SC-29 (SITE-007, header <1024px)
**Check**: interact_page
