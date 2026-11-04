# Story — The site as designed

Module: `site`
Plan item: The site as designed

## User story

As a **visitor** to Trà Sen Hồ Tây's website, I want to browse the shop's
six public pages — Home, Teas listing, one tea's own page, Gallery, About,
and Visit — and reach the shop by phone or Zalo from any of them, so that I
can decide what to order and how to get there without having to call first
to ask basic questions.

## Scope

**In scope**

- All six routes and their content, exactly as the approved design and
  `docs/site/SRS.md` specify: `/`, `/teas`, `/teas/:id`, `/gallery`,
  `/about`, `/visit`.
- Shared chrome on every page: header (logo/name, nav, desktop call button,
  mobile menu), footer (shop name, address, hours, phone, Zalo, nav links,
  "we do not sell online" line), the not-found page (`*` route).
- `CallButtons` (call + Zalo) wherever the design places them: Home, Teas,
  Tea detail, Visit, About.
- `ContactDock` (fixed call/Zalo pair below 1024px) on every page.
- Pagination behaviour: "Show more blends" on `/teas` (6 at a time), "Show
  more photographs" on `/gallery` (4 at a time).
- Reading all data through `src/data/index.ts`'s `useCollection`/`useRecord`
  hooks against `src/data/*.json` (teas, pots, gallery, story, team,
  testimonials) — no page imports a JSON file directly.
- Empty-state and not-found rendering exactly as SRS §4.1–4.7 describe (no
  invented error states beyond what the design draws).
- Responsive behaviour from 320px up, the 1024px rail→single-column switch,
  `prefers-reduced-motion` honoured by `Reveal`.

**Out of scope**

- The message form on `/visit` (fields, validation, sending, states) and its
  delivery to the owner — covered by the separate story "Contact form sends
  enquiry to owner" (`contact` module). This story renders only the Visit
  page's label/heading/body copy slot where that form will sit.
- Any online ordering, cart or checkout — the owner does not sell online;
  not built anywhere in this story.
- Editing site copy, colours or photographs via the Studio — scaffold
  capability, not something this story implements.
- Changing `design/design-system.md` tokens, `src/theme.css`, or
  `src/App.tsx`'s routing structure beyond adding this story's own routes —
  those are frozen/shared and not this story's to redesign.
- A real backend or database — this project's shape is `static`; data stays
  in `src/data/*.json` for this story.

## UI scope

Every screen in the table below is built and uses only tokens from
`design/design-system.md` (no raw hex, no arbitrary Tailwind values):

| Screen | Route | States |
|---|---|---|
| Home | `/` | default |
| Teas listing | `/teas` | default, loading (on "Show more blends") |
| Tea detail | `/teas/:id` | default, not-found |
| Gallery | `/gallery` | default, loading (on "Show more photographs") |
| About | `/about` | default (team/testimonials sections conditionally hidden) |
| Visit | `/visit` | default (form section is a copy/label slot only — no interactive form) |
| Not found | `*` | default |

Shared components built once, used across these screens: `CallButtons`,
`ContactDock`, header, footer, `Label`, `Price`, `TeaTile`, `ProductImage`,
`Picture`, `Reveal`, `MapEmbed`, `MenuToggle`/`MobileMenu`.

This story has no backend stage — the project shape is `static` and all data
is already in `src/data/*.json`; steps 6–9 of the delivery flow (technical
design, BE PR, BE review) are not applicable here beyond confirming no
schema change is needed.

## Acceptance criteria

### Home (SITE-001)

- SC-1 [SITE-001 AC-1]: With the teas list non-empty, opening `/` shows up
  to 3 teas each with name, English name, 100g price and 250g price, each
  tile linking to its own `/teas/:id` page.
- SC-2 [SITE-001 AC-2]: With one or more pots on the list, opening `/` shows
  every pot's name, note and price, and a count line reading the number of
  pots listed.
- SC-3 [SITE-001 AC-3]: With one or more gallery records, opening `/` shows
  up to 3 photographs with captions and an "All the photographs" link to
  `/gallery`.
- SC-4 [SITE-001 AC-4]: Opening `/` shows the address and hours exactly
  matching `contact.address` and `contact.hours`, with a link to `/visit`.
- SC-5 [SITE-001 (empty-state)]: With the teas list, pots list, or gallery
  empty, the corresponding section renders with no tiles/rows/photos and no
  error (board = no tiles, pots = count of 0, gallery = no photos).

### Teas listing (SITE-002)

- SC-6 [SITE-002 AC-1]: With more than 6 teas, opening `/teas` shows the
  first 6, a count line reading the total, and "Show more blends" visible.
- SC-7 [SITE-002 AC-2]: Clicking "Show more blends" appends the next page of
  teas to the grid.
- SC-8 [SITE-002 AC-3]: With 6 or fewer teas, opening `/teas` shows all of
  them and "Show more blends" does not appear.
- SC-9 [SITE-002 AC-4]: Opening `/teas` lists every pot's name, note and
  price.

### Tea detail (SITE-003)

- SC-10 [SITE-003 AC-1]: Opening `/teas/:id` for an existing id shows the
  blend's name, English name, note, leaf description, brewing note, both
  photographs, the "we do not sell online" order note, call/Zalo buttons,
  and both prices each on their own row.
- SC-11 [SITE-003 AC-2]: Opening `/teas/:id` for a non-matching id shows the
  "We do not have that blend" message naming the three board blends and a
  link back to `/teas`, with none of the blend fields rendered.

### Gallery (SITE-004)

- SC-12 [SITE-004 AC-1]: With more than 4 photographs, opening `/gallery`
  shows the first 4 full-width with captions, a count reading the total,
  and "Show more photographs" visible.
- SC-13 [SITE-004 AC-2]: Clicking "Show more photographs" appends the next
  page of photographs.
- SC-14 [SITE-004 AC-3]: With 4 or fewer photographs, opening `/gallery`
  shows all of them and the button does not appear.

### About (SITE-005)

- SC-15 [SITE-005 AC-1]: With at least one story chapter with non-empty
  body, opening `/about` shows every non-empty chapter with its heading and
  body; chapters with empty body are not shown.
- SC-16 [SITE-005 AC-2]: With at least one team record with a non-empty
  name, the team section and heading appear, listing each named person's
  name and role.
- SC-17 [SITE-005 AC-3]: With no team record having a non-empty name, the
  team section including its heading does not appear anywhere on the page.
- SC-18 [SITE-005 AC-4]: With at least one testimonial with a non-empty
  quote, the testimonials section and heading appear, listing each quote
  and who said it.
- SC-19 [SITE-005 AC-5]: With no testimonial having a non-empty quote, the
  testimonials section including its heading does not appear anywhere on
  the page.

### Visit (SITE-006)

- SC-20 [SITE-006 AC-1]: Opening `/visit` shows the address equal to
  `contact.address` and hours equal to `contact.hours`, exactly.
- SC-21 [SITE-006 AC-2]: Opening `/visit` shows a map embed reflecting the
  shop's name and address.
- SC-22 [SITE-006 AC-3]: Tapping the phone row opens the device dialer with
  `contact.phone`'s digits.
- SC-23 [SITE-006 AC-4]: Tapping the Zalo row opens a new tab to
  `zalo.me/<contact.zalo digits>`.

### Shared chrome and contact buttons (SITE-007)

- SC-24 [SITE-007 AC-1]: With both `contact.phone` and `contact.zalo` set,
  every page showing `CallButtons` shows both a call button labelled with
  the phone number and a Zalo button, in that order.
- SC-25 [SITE-007 AC-2]: Below 1024px width, with at least one of
  phone/zalo set, `ContactDock` appears fixed in the lower-right corner on
  every page.
- SC-26 [SITE-007 AC-3]: Below 1024px width, with neither phone nor zalo
  set, `ContactDock` does not render.
- SC-27 [SITE-007 AC-4]: Opening an undefined URL shows the not-found page
  with a link back to `/teas`.
- SC-28 [SITE-007 AC-5]: Every page's footer shows the shop name, address,
  hours, phone, Zalo, and the "we do not sell online" line exactly as given
  in `content.json`.
- SC-29 [SITE-007 (header/nav)]: Every page's header shows the shop
  logo/name linking to `/`, the four nav links (The teas, Photographs, The
  shop, Visit), and at ≥1024px the phone number as a call button; below
  1024px a menu toggle opens a full-screen nav panel with the same links
  and call button.

## Dependencies

- `src/data/*.json` and `src/data/index.ts` (`useCollection`/`useRecord`) —
  already in the scaffold; this story reads them, does not create them.
- `design/design-system.md` tokens and `src/theme.css` — frozen; this story
  consumes them, never edits them.
- No dependency on the "Contact form sends enquiry to owner" story — that
  story adds the interactive form into the slot this story leaves on
  `/visit`; the two can build in parallel since this story does not render
  a `<form>`.
- No backend/database dependency — shape is `static`.
