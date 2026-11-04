# SRS — Site

Module: `site`
Design: [View the approved design](http://localhost:9401)
Design system: `design/design-system.md`

## 1. Purpose

The `site` module is Trà Sen Hồ Tây's public-facing shop window: the six
pages a visitor browses to learn what the shop sells, see it, and decide to
walk in or ring up — Home, the teas listing, one blend's own page, the
photograph gallery, the shop's story/team/testimonials, and the visit page's
location/hours/map. Without it the shop has no way for a stranger on Quán
Thánh, or searching online, to find out what is on the board, what it costs,
or whether the shop is open right now. The message form and its delivery to
the owner are a separate module (`contact`); this module covers everything a
visitor reads and the two always-available ways to reach the shop by phone or
Zalo.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Visitor | Anyone who opens the site; not signed in — there is no account system | Browse every page, read prices, view photographs, tap a phone/Zalo button, open the map |

There is no second role in this module: every page is public and read-only.

## 3. Scope

**In scope** — the function specified below, by its plan title:

- The site as designed — Home, Teas listing, one tea's page, Gallery,
  About (story/team/testimonials), Visit's location/hours/map display, the
  call-and-Zalo buttons wherever they appear, and the shared header, footer
  and not-found page.

**Out of scope**

- The message form on the Visit page (fields, validation, sending, the
  sent/failed/offline states) and its delivery to the owner — belongs to the
  `contact` module.
- Any online ordering, cart or checkout — deliberately not built; the owner
  does not want to sell online.
- Editing the site's own words, colours or photographs in the Studio —
  that is the design/content-management system the scaffold already
  provides, not a requirement this module implements.

## 4. Functional requirements

### 4.1 Home

**Requirement SITE-001 — The home page shows the shop, the board and the way in**

*As a* visitor, *I want to* see the shop's name, address, hours, call and
Zalo buttons, three featured blends with their prices, a pots list, a
gallery preview and a map teaser on one page, *so that* I can tell what the
shop is and how to reach it without navigating anywhere.

Behaviour:

1. On opening `/`, the page shows the shop name, the label "58 Quán Thánh ·
   Ba Đình, Hà Nội", a lede sentence, the address, the opening hours, and the
   call/Zalo buttons (SITE-007).
2. The page shows a "The board" section: a heading, a note stating the blend
   and weight count, and up to three teas, each with its name, English name,
   and both weights' prices (100g and 250g), and a link to the full teas
   list.
3. The page shows an "At the table" section: a heading, a body sentence, and
   every pot on the list with its name, note and price, followed by a count
   of how many pots are listed.
4. The page shows an "Inside the shop" section: a heading, a link to the full
   gallery, and up to three photographs with captions.
5. The page shows a "Finding us" section: a heading, the address, the hours,
   a photograph, and a link to the Visit page.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | The teas list has at least one record | The visitor opens `/` | The name, English name, 100g price and 250g price of up to 3 teas are shown, each linking to its own page |
| AC-2 | The pots list has one or more records | The visitor opens `/` | Every pot's name, note and price are shown, and the count line reads the number of pots on the list |
| AC-3 | The gallery has one or more records | The visitor opens `/` | Up to 3 photographs are shown with their captions, and "All the photographs" links to `/gallery` |
| AC-4 | — | The visitor opens `/` | The address and opening hours shown match `contact.address` and `contact.hours` exactly, and "The map and the hours" links to `/visit` |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| No teas | Teas list is empty | The board section renders with no tiles; no placeholder error is shown (design shows no empty-state variant for this section) |
| No pots | Pots list is empty | The pots list renders with no rows and a count of 0; no error shown |
| No gallery photos | Gallery is empty | The preview section renders with no photographs; no error shown |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| teas.name, teas.english, teas.price_100, teas.price_250, teas.image | text/price/image | yes | Read-only; sourced from `src/data/teas.json` |
| pots.name, pots.note, pots.price | text/price | yes | Read-only; sourced from `src/data/pots.json` |
| gallery.caption, gallery.image | text/image | yes | Read-only; sourced from `src/data/gallery.json` |

### 4.2 Teas listing page

**Requirement SITE-002 — Every blend and both weights, priced**

*As a* visitor, *I want to* see every tea the shop sells with both weights'
prices, and a pot-at-the-table price list, *so that* I can check a price
before I ring or walk in.

Behaviour:

1. On opening `/teas`, the page shows a heading, a body sentence, a count of
   how many blends are on the board, the call/Zalo buttons, and a grid of
   tea tiles (name, English name, 100g price, 250g price), six at a time.
2. A "Show more blends" button appears while more teas remain unloaded; it
   loads the next six.
3. A pots section below lists every pot with its name, note and price.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | More than 6 teas exist | The visitor opens `/teas` | The first 6 are shown, the count line reads the total, and "Show more blends" is visible |
| AC-2 | "Show more blends" is visible | The visitor clicks it | The next page of teas is appended to the grid |
| AC-3 | 6 or fewer teas exist | The visitor opens `/teas` | All of them are shown and "Show more blends" does not appear |
| AC-4 | — | The visitor opens `/teas` | Every pot's name, note and price are listed |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Boundary | Exactly 6 teas exist | All 6 shown on first load; no "Show more" button |
| Loading | A further page is requested | "Loading…" text is shown while it loads |
| No teas | Teas list is empty | The grid shows no tiles and the count reads 0; no error (design has no empty-state variant for this list) |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| teas.* | — | yes | Same records as SITE-001, paged 6 at a time |
| pots.* | — | yes | Same records as SITE-001, full list, unpaged |

### 4.3 Tea detail page

**Requirement SITE-003 — One blend's own page**

*As a* visitor, *I want to* open one blend and see what it is, how it is
brewed, and both weights' prices, *so that* I can decide which to ask for by
phone or at the counter.

Behaviour:

1. On opening `/teas/:id` for an id that exists, the page shows the blend's
   name, English name, note, the leaf description, the brewing note, two
   photographs (the tin and a scene), a "We do not sell online" order note,
   the call/Zalo buttons, a weights heading, and the 100g and 250g prices
   each on their own row.
2. On opening `/teas/:id` for an id that does not exist, the page shows a
   "We do not have that blend" message naming the three blends on the board,
   and a link back to the full list, in place of the blend's own content.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | `:id` matches a tea record | The visitor opens `/teas/:id` | The blend's name, note, leaf, brewing, both prices and both images are shown |
| AC-2 | `:id` does not match any tea record | The visitor opens `/teas/:id` | The "We do not have that blend" message and a link back to `/teas` are shown; none of the blend fields are rendered |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Not found | `:id` matches no record | The missing-blend state described in AC-2; not a blank page |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| teas.id, .name, .english, .note, .leaf, .brewing, .image, .scene, .price_100, .price_250 | — | yes | Read-only, looked up by `id` from the route |

### 4.4 Gallery page

**Requirement SITE-004 — A gallery of photographs, shown large**

*As a* visitor, *I want to* see the shop's photographs large, one at a time,
*so that* I get a feel for the counter, the tables and the leaf before I
visit.

Behaviour:

1. On opening `/gallery`, the page shows a heading, a body sentence, a count
   of how many photographs exist, and the photographs one per row, each
   full-width with its caption beneath, four at a time.
2. A "Show more photographs" button appears while more remain unloaded; it
   loads the next four.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | More than 4 photographs exist | The visitor opens `/gallery` | The first 4 are shown full-width with captions, the count reads the total, and "Show more photographs" is visible |
| AC-2 | "Show more photographs" is visible | The visitor clicks it | The next page of photographs is appended |
| AC-3 | 4 or fewer photographs exist | The visitor opens `/gallery` | All of them are shown and the button does not appear |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Boundary | Exactly 4 photographs exist | All 4 shown; no "Show more" button |
| Loading | A further page is requested | "Loading…" text is shown while it loads |
| No photographs | Gallery is empty | The page shows the heading and a count of 0 with no photographs; no error (design has no empty-state variant) |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| gallery.id, .caption, .image | — | yes | Read-only, paged 4 at a time |

### 4.5 About page — the shop, the team, what customers say

**Requirement SITE-005 — Who is behind the shop**

*As a* visitor, *I want to* read the shop's story, see who blends the tea,
and read what other customers say, *so that* I can decide to trust and visit
the shop.

Behaviour:

1. On opening `/about`, the page shows a heading, a photograph, and the
   call/Zalo buttons.
2. A story section shows every chapter whose body is not empty, each with a
   heading and body text.
3. A team section shows only when at least one team record has a
   non-empty name; it lists each named person's name and role. When no
   record has a name, the whole section (heading included) is not rendered.
4. A testimonials section shows only when at least one testimonial has a
   non-empty quote; it lists each quote and who said it. When no record has
   a quote, the whole section (heading included) is not rendered.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | At least one story chapter has non-empty body text | The visitor opens `/about` | Every chapter with non-empty body is shown with its heading and body; chapters with empty body are not shown |
| AC-2 | At least one team record has a non-empty name | The visitor opens `/about` | The team section and its heading are shown, listing each named person's name and role |
| AC-3 | No team record has a non-empty name | The visitor opens `/about` | The team section, including its heading, does not appear anywhere on the page |
| AC-4 | At least one testimonial has a non-empty quote | The visitor opens `/about` | The testimonials section and its heading are shown, listing each quote and who said it |
| AC-5 | No testimonial has a non-empty quote | The visitor opens `/about` | The testimonials section, including its heading, does not appear anywhere on the page |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Empty team | No team record has a name | Section hidden entirely, per AC-3 — this is the design's own empty-state rule, not an invented error |
| Empty testimonials | No testimonial has a quote | Section hidden entirely, per AC-5 |
| Empty story | No chapter has body text | Story section renders with no chapters; the heading above it still shows (the design draws this heading unconditionally, unlike team/testimonials) |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| story.heading, story.body | text | body may be empty | Record with empty `body` is excluded from display |
| team.name, team.role | text | name may be empty | Record with empty `name` is excluded from display |
| testimonials.quote, testimonials.who | text | quote may be empty | Record with empty `quote` is excluded from display |

### 4.6 Visit page — location, hours, and map

**Requirement SITE-006 — Where the shop is and when it is open**

*As a* visitor, *I want to* see the shop's address and hours, find it on a
map, and have the call/Zalo buttons at hand, *so that* I can get there or
reach the shop without using the message form.

Behaviour:

1. On opening `/visit`, the page shows a heading, a body sentence, the
   call/Zalo buttons, and a facts list of address, hours, phone and Zalo —
   phone and Zalo are tappable links (`tel:`/`zalo.me`).
2. A map section shows a Google Maps embed centred on the shop's name and
   address, beside a photograph, with the hours repeated alongside.
3. The message-form section on this page is specified in `docs/contact/SRS.md`
   (SITE module shows only its label, heading and body copy slot; the form
   itself is out of scope here).

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | — | The visitor opens `/visit` | The address shown equals `contact.address` exactly, and the hours shown equal `contact.hours` exactly |
| AC-2 | — | The visitor opens `/visit` | The map embed is present and reflects the shop's name and address |
| AC-3 | — | The visitor taps the phone row | The device's dialer opens with `contact.phone`'s digits |
| AC-4 | — | The visitor taps the Zalo row | A new tab opens to `zalo.me/<contact.zalo digits>` |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Not applicable | The approved design shows one state for this page's location/hours/map content, with no error or empty variant | — |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| contact.address | text | yes | Exactly "58 Quán Thánh, Ba Đình, Hà Nội" |
| contact.hours | text | yes | Exactly "8:00–21:00 every day" |
| contact.phone, contact.zalo | text | yes | Exactly "024 3829 1188" each |

### 4.7 Call and Zalo buttons, header, footer, and not-found page

**Requirement SITE-007 — Always a way to call or message, on every page**

*As a* visitor, *I want to* reach the shop by phone or Zalo from any page,
and reach every other page from the header and footer, *so that* I never
have to hunt for the way to get in touch or get around.

Behaviour:

1. On every page, a CallButtons pair appears wherever the page design
   places it (Home, Teas, Tea detail, Visit, About): a filled "call" button
   showing the phone number as its own label, and an outline "Zalo" button,
   in that order; either is omitted if its content value is empty.
2. Below 1024px width, a fixed ContactDock shows the same two actions as
   round buttons in the lower-right corner on every page, and is omitted
   entirely when neither `contact.phone` nor `contact.zalo` is set.
3. The header on every page shows the shop's logo/name linking to `/`, the
   four nav links (The teas, Photographs, The shop, Visit), and — at
   1024px and above — the phone number as a call button; below 1024px, a
   menu toggle opens a full-screen nav panel with the same links and call
   button.
4. The footer on every page repeats the shop name, address, hours, phone,
   Zalo, the four nav links, and the footer line stating the shop does not
   sell online.
5. Any URL not matching a defined route shows the not-found page: a label,
   heading, body text, and a link back to `/teas`.

**Acceptance criteria**

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | `contact.phone` and `contact.zalo` are both set | The visitor opens any page | A call button (labelled with the phone number) and a Zalo button both appear wherever CallButtons is placed on that page |
| AC-2 | Viewport width is below 1024px and at least one of phone/zalo is set | The visitor opens any page | The ContactDock appears fixed in the lower-right corner |
| AC-3 | Viewport width is below 1024px and neither phone nor zalo is set | The visitor opens any page | The ContactDock does not render |
| AC-4 | — | The visitor opens an undefined URL | The not-found page shows, with a link back to `/teas` |
| AC-5 | — | The visitor opens any page | The footer shows the shop name, address, hours, phone, Zalo and the "we do not sell online" line, exactly as given in content.json |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Missing phone | `contact.phone` is empty | Call button/dock-call omitted; Zalo half still shows if set |
| Missing Zalo | `contact.zalo` is empty | Zalo button/dock-Zalo omitted; call half still shows if set |
| Both missing | Both empty | CallButtons renders nothing; ContactDock does not render at all (AC-3) |
| Unknown route | URL matches no `<Route>` | Not-found page shown, never a blank screen |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| contact.phone, contact.zalo | text | no (either may be empty) | Digits-only transform for `tel:`/`zalo.me` links via `digits()` |
| site.name | text | yes | "Trà Sen Hồ Tây" |

## 5. Screens

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Home (`/`) | "Prices on the board" first screen + Pots/Room/Where sections | SITE-001, SITE-007 | default |
| Teas (`/teas`) | Board listing, full grid + pots | SITE-002, SITE-007 | default, loading (on "Show more") |
| Tea detail (`/teas/:id`) | One blend's own page | SITE-003, SITE-007 | default, not-found |
| Gallery (`/gallery`) | Full-width photograph column | SITE-004, SITE-007 | default, loading (on "Show more") |
| About (`/about`) | Story / team / testimonials | SITE-005, SITE-007 | default |
| Visit (`/visit`) | Facts list + map, form section (contact module) | SITE-006, SITE-007 | default |
| Not found (`*`) | 404 panel | SITE-007 | default |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Accessibility | Keyboard reachable, visible focus (browser default, never suppressed), labelled inputs, contrast ≥ 4.5:1 per the design system's contrast audit |
| Responsive | Works at 320px width and up; the 340px-rail layout switches to single column below 1024px; no horizontal page scroll |
| Localisation | Copy is in Vietnamese/English as written in `content.json`; locale `vi-VN`; prices formatted as Vietnamese dong with no decimals |
| Motion | Section entrance animation is disabled under `prefers-reduced-motion: reduce`, end state unchanged |

## 7. Dependencies and assumptions

- **Depends on:** `src/data/*.json` (teas, pots, gallery, story, team,
  testimonials) as the data source — this is a `static` shape project with no
  backend or database; a later module may replace these files with an API
  without changing this module's requirements (see `src/data/index.ts`'s own
  migration note).
- **Depends on:** `contact` module for the message form shown on `/visit`.
- **Assumption:** prices in `src/data/teas.json` and `pots.json` are sample
  figures pending the owner's real price list (noted in `design/directions.md`);
  if the owner supplies different prices, only the data file changes, not this
  specification.

No open questions: the design draws one state for every screen in this
module and the brief's scope is unambiguous (no online sale).

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| The site as designed | SITE-001, SITE-002, SITE-003, SITE-004, SITE-005, SITE-006, SITE-007 | `test-cases/the-site-as-designed.md` |
