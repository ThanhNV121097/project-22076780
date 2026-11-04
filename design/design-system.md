# Design System — Trà Sen Hồ Tây

> Source of truth: the approved design in `code/frontend/src` (direction
> "Prices on the board"). Every value below is extracted from
> `src/theme.css`, `src/index.css`, `src/content.json`, `src/App.tsx` and
> `src/components/`. Changing a value here without changing the approved
> design is a defect.

Last updated: 2026-11-04

## 1. Foundations

This is a one-light-palette board design: no dark mode, no shadows except
two the scaffold's own floating call buttons need, no border radius except
the pill for round buttons. Rows the design has no value for are omitted.

### 1.1 Color

| Token | Value | Used for |
|---|---|---|
| `--ground` | `#F4F1E8` | Page background — unbleached paper |
| `--surface` | `#FFFFFF` | Card tile background (product tile, hover fill) |
| `--ink` | `#17180F` | Headings, body text, primary labels |
| `--ink-soft` | `#5B5F4E` | Secondary text, captions, labels |
| `--accent` | `#1F5134` | Tea-leaf green — the one clickable colour: primary buttons, link hover, active nav underline |
| `--accent-ink` | `#FFFFFF` | Text/icon on `--accent` |
| `--line` | `rgba(23,24,15,0.16)` | Section hairline, divider — deliberately faint |
| `--field-line` | `rgba(23,24,15,0.45)` | Form input border — 3:1 against `--ground`, the one border that must stay findable |

#### Contrast audit

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--ink` | `--ground` | 16.0:1 | AA |
| `--ink` | `--surface` | 18.1:1 | AA |
| `--ink-soft` | `--ground` | 5.8:1 | AA |
| `--ink-soft` | `--surface` | 6.6:1 | AA |
| `--accent-ink` (#FFFFFF) | `--accent` | 9.2:1 | AA |
| `--accent` | `--ground` (link/hover text) | 8.1:1 | AA |

### 1.2 Spacing

Base unit 4px. Every margin, padding and gap in the product uses one of these.

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

### 1.3 Typography

- Display (headings, prices, labels): `"Archivo"`, loaded from Google Fonts (weights 400/500), falls back to `system-ui, sans-serif`.
- Body: `"Inter"` (variable, weights 300–600), falls back to `sans-serif`.
- No mono face — the design has no code/mono content.

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--size-label` | `11px` | normal | 500 (inherits `--weight-display` via `.font-display` use) | Section labels, weight tags — always uppercase, `--tracking-label` |
| body (base) | `17px` | `1.6` | 400 | Running text (`body` in `index.css`) |
| `--size-h2` | `clamp(1.5rem, 2vw, 1.75rem)` (24–28px) | `1.04` | `--weight-display` (500) | h2 |
| `--size-h1` | `clamp(2rem, 3.1vw, 2.75rem)` (32–44px) | `1.04` | `--weight-display` (500) | h1 |
| `--size-price` | `clamp(1.6rem, 2.4vw, 2.125rem)` (25.6–34px) | `1` (leading-none) | `--weight-display` (500) | Every price, board to blend page — tabular, right-aligned |

Heading levels are used in order (h1 → h2 → h3) and never skipped for visual sizing. `h1, h2, h3` all pick up `--weight-display`/`--tracking-display` from `index.css`, so no separate heading-weight token is needed.

| Token | Value | Used for |
|---|---|---|
| `--weight-display` | `500` | Every heading and every price |
| `--tracking-display` | `-0.02em` | Headings and prices |
| `--tracking-label` | `0.16em` | Uppercase section labels and weight tags |

### 1.4 Radius, border, shadow, motion

The design draws no card radius and no resting shadow — every division is a
hairline. The two radius/shadow tokens below exist only for the scaffold's
floating phone-contact buttons.

| Token | Value | Used for |
|---|---|---|
| `--radius` | `0px` | Default (no rounding anywhere in the design) |
| `--radius-sm` | `0px` | Same |
| `--radius-pill` | `999px` | Round buttons only: `ContactDock` call/Zalo buttons, `MenuToggle` hit area |
| `--border-width` | `1px` (Tailwind default) | `border`, `border-t`, `border-b` hairlines |
| `--shadow-sm` | `0 1px 2px rgba(23,24,15,0.08)` | Reserved for scaffold components; not drawn on this site's own sections |
| `--shadow-md` | `0 10px 28px -16px rgba(23,24,15,0.35)` | `ContactDock`'s two floating buttons (`shadow-lg` utility maps here) |
| `--duration-fast` | `140ms` | Hover/colour transitions (link underline, button opacity) |
| `--duration-base` | `600ms` | Section `Reveal` animation on load |
| `--ease-out` | `cubic-bezier(0.22, 0.7, 0.21, 1)` | All transitions and the reveal animation |

Motion respects `prefers-reduced-motion: reduce` — `index.css` turns the `.rise` entrance animation off; state (visible/not) is unaffected.

### 1.5 Layout and breakpoints

| Name | Min width | Used for |
|---|---|---|
| default (mobile) | `0` | Single column, `ContactDock` shown, hamburger nav |
| `sm` | `640px` (Tailwind default) | 3-column tea/gallery grids (`sm:grid-cols-3`), 2-col Tea page image grid |
| `lg` | `1024px` (Tailwind default) | Two-column `[340px_1fr]` page layout, full nav row, `ContactDock` hidden |

| Token | Value | Used for |
|---|---|---|
| `--page` | `1320px` | Max content width (`max-w-page`) |
| `--gutter` | `clamp(20px, 4.4vw, 64px)` | Side padding on every page section |
| `--header-h` | `64px` | Sticky header height, mobile menu top offset |
| `--dock-space` | `calc(88px + env(safe-area-inset-bottom, 0px))` | Bottom padding reserved on `<body>` below 1024px while `ContactDock` is mounted |

Z-index scale (only these values are used):

| Layer | Value |
|---|---|
| Base | `0` |
| Sticky header | `z-50` |
| Mobile menu panel | `z-[60]` |
| `ContactDock` | `z-50` |

## 2. Components

### 2.1 Label

**Purpose** — the small-caps line that leads every section on every page: a street, a weight, a count. Always informational, never decorative.

**Anatomy** — single line of text.

**Sizes** — one size: `--size-label` (11px), uppercase, `--tracking-label` (0.16em), `--ink-soft`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | — | `--size-label`, `--tracking-label`, `--ink-soft` |

**Accessibility** — plain text node (`<p>`); no ARIA needed.

### 2.2 Price

**Purpose** — every price on the site: the board, the pots list, a blend's own page. One size everywhere a price is set, so the eye always finds the number the same way.

**Anatomy** — single numeral string, formatted by `formatPrice` (locale currency).

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default (`soft=false`) | `text-ink`, `--size-price`, `--weight-display` | The first/primary weight on a row (e.g. 100g) |
| Soft (`soft=true`) | `text-ink-soft`, same size | The second weight on the same row (e.g. 250g), so one row reads as primary + secondary without a second size |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | tabular, right-aligned | `--size-price`, `--tracking-display`, `tabular-nums` |

**Accessibility** — plain text; `data-testid` for test hooks, not ARIA.

### 2.3 CallButtons

**Purpose** — the two actions a visitor is asked to take: ring the shop, or open a Zalo chat. Placed inline wherever a page offers contact (hero, Tea, Teas, Visit, About).

**Anatomy** — `[phone icon] [phone number]` filled button, `[Zalo mark] [message label]` outline button. Either half omits itself if its content field (`contact.phone` / `contact.zalo`) is empty.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Call (filled) | `bg-accent`, `text-accent-ink` | Always first |
| Zalo (outline) | `border border-ink`, hover `bg-surface` | Always second |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | — | as above |
| Hover | opacity 90% (call) / `bg-surface` (Zalo) | `--duration-fast` |

**Accessibility** — each is an `<a>` with `aria-label` from `contact.dock.call` / `contact.dock.zalo`; `tel:` and `zalo.me/` links; Zalo opens in a new tab (`target="_blank" rel="noreferrer"`).

### 2.4 ContactDock

**Purpose** — the call and Zalo actions kept always within reach on a phone: two fixed round buttons in the lower-right corner, shown only below `lg` (1024px) and only while the header's full-width `CallButtons` is off-screen.

**Anatomy** — two 56×56px (`h-14 w-14`) circles stacked horizontally: Zalo (surface fill, ring) then call (accent fill).

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Zalo button | `bg-surface`, `ring-1 ring-line`, `shadow-md` | Shown when `contact.zalo` is set |
| Call button | `bg-accent`, `text-accent-ink`, `shadow-md` | Shown when `contact.phone` is set |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | — | `--radius-pill`, `--shadow-md` |
| Hidden | not rendered | Neither number set, or viewport ≥ 1024px |

**Accessibility** — each button has `aria-label`; `<body>` gets `--dock-space` bottom padding below 1024px so the dock never covers the page's own last element.

### 2.5 ContactForm

**Purpose** — the message form on the Visit page: name, phone-or-email, message. What is sent reaches the owner directly; never decorative.

**Anatomy** — labelled `name` input, labelled `reply_to` input, optional extra fields, labelled `message` textarea, hidden honeypot field, submit button.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Idle | fields shown, button enabled | `border-field`, `bg-ground` |
| Sending | button disabled, label "Sending…" | `disabled:opacity-60` |
| Sent | form replaced by one confirmation line | `text-lg` |
| Failed | role="alert" error line shown above button | `text-ink` |
| Offline (`canSend` false) | note shown under button: "not connected yet" | `text-ink-soft` |

**Accessibility** — every input has a `<label htmlFor>`; failure message uses `role="alert"`; honeypot field is visually hidden and `aria-hidden`, `tabIndex={-1}`.

### 2.6 TeaTile

**Purpose** — one blend as a column of the board: cut-out tin, name, both weights priced on their own hairline row. Used on Home and Teas.

**Anatomy** — `ProductImage` (4/3) → name + English name row (hairline rule below) → 100g price row → 250g price row (`soft`).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | — | `border-ink`, `border-line` |
| Hover | image lifts 2px, heading tints accent | `--duration-fast`, `-translate-y-0.5`, `text-accent` |

**Accessibility** — whole tile wrapped in a `<Link>` with a `data-testid`; image `alt` is the tea's name.

### 2.7 ProductImage

**Purpose** — every product photograph on the site: a fixed-aspect frame on a light tile so differently sized objects (a 100g tin, a 250g tin) read at one consistent scale.

**Anatomy** — aspect-ratio box (`1/1` default, `4/3` used for tea tins) on `--product-ground` (always light), picture shown with `object-contain` and 8% inset margin.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Has photo | `<img>` filled, contain-fit | `--product-ground` |
| Empty (no photo yet) | flat block with caption, ready for the owner to drop a photo on in the Studio | `--picture-ground`, `--picture-ink` (forced to `--product-ground`/`--product-ground-ink` so it stays light) |

**Accessibility** — `alt` required; empty state uses `role="img"` with `aria-label`.

### 2.8 Picture (gallery / scene photographs)

**Purpose** — every non-product photograph: the leaf, the room, the lake, the street — shown large, one at a time on the Gallery page, never in a small boxed grid.

**Anatomy** — `<img>` at the given aspect ratio, or (missing) a flat block tinted `--picture-ground`/`--picture-ink` with the caption as its visible text, ringed with `--line` so an empty block always has a findable edge.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Loaded | image fills frame, `object-cover` | — |
| Missing / no src | caption-only block | `--picture-ground`, `--picture-ink`, `ring-1 ring-[var(--line)]` |

**Accessibility** — `alt` always required; missing state keeps `role="img"` and the same `aria-label`.

### 2.9 MapEmbed

**Purpose** — the shop's location on the Visit page, from the address in content, no API key.

**Anatomy** — a Google Maps `<iframe>` query built from `site.name` + `contact.address`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | iframe shown | `rounded` (uses the 0px default) |
| No address | not rendered | — |

**Accessibility** — `title` set to the address; `loading="lazy"`.

### 2.10 Header / nav link

**Purpose** — the sticky top bar: logo, four section links, the phone button (desktop) or hamburger (mobile).

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `border-transparent` underline | `text-sm` |
| Active (current route) | `border-ink` underline | — |
| Hover | `text-accent` | `--duration-fast` |

**Accessibility** — `<nav>` + `<Link>`; current page indicated visually by the underline (no `aria-current` in the approved markup — see Known deviations).

### 2.11 MenuToggle / MobileMenu

**Purpose** — the hamburger control and the full-screen panel it opens below 1024px.

**States** (MenuToggle)

| State | Visual change | Tokens |
|---|---|---|
| Closed | menu icon | `--radius-pill` hit area |
| Open | X icon, `aria-expanded="true"` | — |

**States** (MobileMenu)

| State | Visual change | Tokens |
|---|---|---|
| Open | full-bleed panel below header, body scroll locked, Esc closes | `--header-h`, `z-[60]`, `bg-ground` |
| Closed | not rendered | — |

**Accessibility** — `MobileMenu` is `role="dialog" aria-modal="true"`, rendered through a portal so it is never clipped by a transformed header; `MenuToggle` carries `aria-expanded` and `aria-label`.

## 3. Content and formatting

- Voice: plain, factual, short sentences in the shop's own words — no marketing superlatives ("the board, not a brochure").
- Locale: `vi-VN` (`site.locale`); prices formatted via `Intl.NumberFormat` as currency for that locale (₫, grouped by thousand).
- Hours and phone numbers are always set `tabular-nums`.
- Capitalisation: sentence case everywhere (buttons, headings, labels) — never Title Case or all caps, except the 11px section `Label` component, which is uppercase by design.
- Empty-state wording: a missing blend reads "We do not have that blend" with a link back to the board; a missing photo is a plain tinted block captioned with its own `alt` text — never a broken image icon.

## 4. Known deviations

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| `App.tsx` `Header`, nav `<Link>` | Active route is shown only by a visual underline (`border-ink`), with no `aria-current="page"` | Pre-existing in the approved mockup; low-severity, screen-reader-only gap | Flag to Dev for a one-line `aria-current` addition on a future nav touch — not a reason to hold this doc |
| `Select.tsx`, `TableFilters.tsx`, `DataTable.tsx`, `DashboardLayout.tsx`, `Grid.tsx`, `Rating.tsx`, `RequireRole.tsx` | Scaffold components for list/table/dashboard UI that this one-page brochure site (menu, gallery, contact, about) never renders | Shipped with the scaffold for product sites in general; Trà Sen Hồ Tây has no admin table or filtered list screen | Not documented as components here — nothing in the approved design draws them, so documenting their states would be invention |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2026-11-04 | Initial design system, extracted from the approved "Prices on the board" direction | PR #1 |
