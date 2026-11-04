# Design System — Trà Sen Hồ Tây

> Source of truth: the approved design in `code/frontend/src` (direction
> "Prices on the board", PR #1, merged to `main`).
> Every value below is extracted from it. Changing a value here without
> changing the approved design is a defect.

Last updated: 2026-11-04

## 1. Foundations

### 1.1 Color

One light palette, no dark mode (`color-scheme: light` in `theme.css`, no
`[data-theme]` and no media branch anywhere in the repo).

| Token | Value | Used for |
|---|---|---|
| `--ground` | `#F4F1E8` | Page background (unbleached-paper cream) |
| `--surface` | `#FFFFFF` | Product tile background, form inputs, the floating dock, dropdown panels |
| `--ink` | `#17180F` | Body text, headings, prices |
| `--ink-soft` | `#5B5F4E` | Secondary text — captions, labels, facts, helper text |
| `--accent` | `#1F5134` | Tea-leaf green — the one accent, used only where something is clickable (call button fill, link text, active nav underline hover) |
| `--accent-ink` | `#FFFFFF` | Text/icon on `--accent` |
| `--line` | `rgba(23,24,15,0.16)` | Section hairline / divider — deliberately near-invisible |
| `--field` | `rgba(23,24,15,0.45)` | Form-field border — needs to be findable, unlike `--line` |

#### Contrast audit

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--ink` | `--ground` | 15.8:1 | AA / AA Large |
| `--ink` | `--surface` | 17.9:1 | AA / AA Large |
| `--ink-soft` | `--ground` | 5.8:1 | AA / AA Large |
| `--ink-soft` | `--surface` | 6.6:1 | AA / AA Large |
| `--accent-ink` | `--accent` | 9.2:1 | AA / AA Large |
| `--accent` (link text) | `--ground` | 8.1:1 | AA / AA Large |

### 1.2 Spacing

Base unit 4px. Every margin, padding and gap in the product is one of these
(`theme.css`); none of the pages use a value outside the scale.

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

Loaded via Google Fonts (`index.html`): `Archivo:wght@400;500` and
`Inter:opsz,wght@14..32,300..600`.

- Display (headings, prices, product/pot names, the logotype): `--font-display: "Archivo"`, fallback `system-ui, sans-serif`.
- Body (running text, nav, buttons, labels): `--font-body: "Inter"`, fallback `sans-serif`.

| Token | Size | Used for |
|---|---|---|
| `--size-label` | `11px`, `--tracking-label: 0.16em`, uppercase | The small-caps label that leads every section |
| base body | `17px` / line-height `1.6` (`index.css` on `body`) | Running text |
| Tailwind `text-lg` | `18px` | Product/pot name, blockquote line, a visit-page fact figure — the "display, one size down from a heading" role |
| `--size-h2` | `clamp(1.5rem, 2vw, 1.75rem)` ≈ 24–28px | h2, every section heading |
| `--size-h1` | `clamp(2rem, 3.1vw, 2.75rem)` ≈ 32–44px | h1, the page headline |
| `--size-price` | `clamp(1.6rem, 2.4vw, 2.125rem)` ≈ 25.6–34px | Every price on the board, a blend's own page and the pots list — the largest numerals on the page |

Heading levels (`h1, h2, h3` in `index.css`) share one rule: font-display,
`--weight-display: 500`, `--tracking-display: -0.02em`, line-height `1.04`.
No heading level is skipped for visual sizing — `h3` (About's story headings,
TeaTile's product name) uses `text-lg`/`--size-h2`, never a larger size than
its parent `h2`.

Prices and the small-caps labels are additionally `tabular-nums` so figures
line up down a column.

### 1.4 Radius, border, shadow, motion

The design draws **no radius and no shadow** anywhere a human reads the page —
every division is a 1px hairline, no cards. The two rounded/shadowed
exceptions are both floating controls that must read as pills on top of the
page, not as part of its board:

| Token | Value | Used for |
|---|---|---|
| `--radius` | `0px` | Default — every surface, product tile, form input |
| `--radius-pill` | `999px` | The mobile menu toggle and the two floating call/Zalo dock buttons only |
| `--border-width` | `1px` | `--line` (section hairline) and `--field` (input border) |
| `--duration-fast` | `140ms` | Hover/colour transitions (link underline, button opacity) |
| `--duration-base` | `600ms` | The one-time section entrance (`Reveal`, `.rise` keyframe) |
| `--ease-out` | `cubic-bezier(0.22, 0.7, 0.21, 1)` | All transitions and the entrance |

Motion respects `prefers-reduced-motion: reduce` — `.rise` is disabled, its
end state (the plain, visible page) is unchanged.

### 1.5 Layout and breakpoints

| Name | Min width | Used for |
|---|---|---|
| `sm` | 640px | 3-column tea/pot/photo grids |
| `lg` | 1024px | The rail/board two-column layout switches on; desktop nav replaces the mobile menu and dock |

Container: `--page: 1320px` (`max-w-page`). Side padding: `--gutter:
clamp(20px, 4.4vw, 64px)`. The recurring page shape, used on every one of the
six routes, is a `340px` rail beside the rest of the row:
`lg:grid-cols-[340px_1fr]`.

Fixed chrome: `--header-h: 64px`; `--dock-space: calc(88px +
env(safe-area-inset-bottom))` keeps the page's last line clear of the
floating dock below 1024px.

Z-index (only these two values occur):

| Layer | Value |
|---|---|
| Sticky header / contact dock | `50` |
| Mobile menu panel | `60` |

## 2. Components

### 2.1 CallButtons

**Purpose** — the two actions every commerce page offers instead of a basket:
ring the shop, or open a Zalo chat. Used on `/`, `/teas`, `/teas/:id`,
`/visit`, `/about`.

**Anatomy** — `[phone icon] [the phone number as the label]` filled button,
beside `[Zalo mark] [the Zalo label]` outline button. Either half hides if
its content value (`contact.phone` / `contact.zalo`) is empty.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Call | `bg-accent`, `text-accent-ink` | Always first |
| Zalo | `border border-ink`, `text-ink`, hover `bg-surface` | Always second |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | as above | `--accent` / `border-ink` |
| Hover | Call: `opacity-90`. Zalo: `bg-surface` | `--duration-fast` |

No focus/active/disabled row: both are plain links (`<a>`), not form
controls, and carry the browser's own default focus ring (never suppressed —
no `outline-none` occurs anywhere in the repo).

**Accessibility** — `aria-label` from `contact.dock.call` / `contact.dock.zalo`;
Zalo opens `target="_blank" rel="noreferrer"`; hit area is `px-5 py-3` (≥44px tall).

### 2.2 ContactDock

**Purpose** — the same two actions, fixed to the screen below `lg` (1024px)
so they are always within a thumb's reach while scrolling.

**Anatomy** — two round 56×56px buttons, Zalo then Call, bottom-right,
spaced so the gap between them lets taps through to the page beneath.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `rounded-full`, `shadow-lg`; Zalo on `bg-surface` + `ring-1 ring-line`, Call on `bg-accent` | `--radius-pill`, `--shadow-md`-equivalent |
| Hidden | renders nothing when neither `contact.phone` nor `contact.zalo` is set | — |

**Accessibility** — `aria-label` per button; safe-area inset respected
(`env(safe-area-inset-bottom)`); the page reserves `--dock-space` at its foot
so the dock never covers the last line of content.

### 2.3 ContactForm

**Purpose** — the one form on the site (`/visit`): name, phone-or-email,
message. Reaches the owner in Agent Team; never decoration.

**Anatomy** — `[name field] [reply_to field] [message textarea] [honeypot, hidden] [submit button]`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Idle | plain fields, `border-field` (not `--line` — a field needs a findable edge) | `--field` |
| Sending | submit button text → "Sending…", `disabled` | `disabled:opacity-60` |
| Sent | form replaced by the one-line thank-you (`contact.form.sent`) | — |
| Failed | `role="alert"` message shown above the button | `--ink` |
| Offline (`canSend` false) | helper line shown under the button | `--ink-soft` |

**Accessibility** — every field has a `<label htmlFor>` and matching `id`;
honeypot field (`name="website"`) is `aria-hidden`, off-screen,
`tabIndex={-1}`; failed state uses `role="alert"`.

### 2.4 Label

**Purpose** — the 11px small-caps line that leads every section on every
page. Carries information (a street, a weight, a count), never a decorative
word.

**Anatomy** — one line of text.

**States** — `default` only; it is static.

| State | Visual change | Tokens |
|---|---|---|
| Default | `--size-label`, `--tracking-label`, uppercase, `--ink-soft` | |

### 2.5 Price

**Purpose** — the figure this shop's board is built on: every price on
`/teas`, `/teas/:id`, `/` and the pots lists uses this and nothing else.

**Anatomy** — one right-aligned numeral string, formatted by
`formatPrice()`.

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| Default | `text-ink` | The primary weight in a pair (e.g. 100g) |
| `soft` | `text-ink-soft` | The second weight in a pair (e.g. 250g) |

**States** — `default` only; it is static, non-interactive.

| State | Visual change | Tokens |
|---|---|---|
| Default | `--size-price`, `--font-display`, `--tracking-display`, `tabular-nums`, right-aligned, `whitespace-nowrap`, `shrink-0` | |

### 2.6 TeaTile

**Purpose** — one blend as a column of the board: tin, name, both weights
priced. Used on `/` (3 of them) and `/teas` (the full list).

**Anatomy** — `[ProductImage] [name + english-name row, hairline below] [100g row] [250g row]`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | hairline (`border-ink`) under the name, `border-line` under each weight row | |
| Hover (the image + name, via the whole card as a `<Link>`) | image lifts `-translate-y-0.5`; name turns `text-accent` | `--duration-fast` |

### 2.7 ProductImage

**Purpose** — every product picture: a fixed-aspect frame on a light tile so
a photo and an empty slot read the same size in a grid.

**Anatomy** — square/portrait/landscape frame (`1/1`, `4/5` or `4/3`) on
`--product-ground`, the photo (or the empty-slot block) inset 8% with
`object-contain`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Has photo | `object-contain`, 84% of the frame | `--product-ground` |
| Empty slot | flat tile + caption (via `Picture`'s own empty state) | `--product-ground`, `--product-ground-ink`, `ring-1 ring-line` |

### 2.8 Picture

**Purpose** — every non-product photograph on the site; stands in for a photo
the owner has not supplied yet.

**Anatomy** — `<img>`, or (missing/broken) a flat block showing the caption.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Loaded | plain `<img>` | — |
| Missing / broken (`onError`) | `ring-1 ring-inset ring-line`, `bg-[--picture-ground]`, caption text in `--picture-ink` | `--picture-ground`, `--picture-ink`, `--line` |

### 2.9 Reveal

**Purpose** — the one-time section entrance used below the first screen on
every page.

**Anatomy** — wraps a section; no visible chrome of its own.

**States** — `default` only.

| State | Visual change | Tokens |
|---|---|---|
| Default | `.rise`: fade + rise 16px over `--duration-base` on `--ease-out`, once | `--duration-base`, `--ease-out` |
| Reduced motion | animation removed, end state shown immediately | — |

### 2.10 MapEmbed

**Purpose** — the address as a Google map, no API key, on `/visit`.

**Anatomy** — one `<iframe>` filling its container.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | `rounded` (site radius, i.e. square), fills width | `--radius` |
| No address | renders nothing | — |

### 2.11 MenuToggle / MobileMenu

**Purpose** — the nav below 1024px.

**Anatomy** — MenuToggle: a 40×40px round icon button (Menu ↔ X). MobileMenu:
a full-screen panel below the header, portaled to `<body>`.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Closed | Menu icon | |
| Open | X icon, panel visible, body scroll locked, Esc closes | `--radius-pill` |
| Hover | `bg-surface` | `--duration-fast` (implicit `transition-colors`) |

**Accessibility** — `aria-expanded`, `aria-label` (from `nav.menu.open` /
`nav.menu.close`); panel is `role="dialog" aria-modal="true"`; Esc closes.

### 2.12 Icon / SocialIcon

**Purpose** — one icon system (lucide-react, stroke 1.75) for every
functional glyph; one mark system (simple-icons, CC0, `currentColor`) for
every social/network reference — Zalo is always its mark, never the word
"Zalo" rendered as an icon substitute.

**States** — `default` only; decorative (`aria-hidden`) unless given a
`label`, in which case it takes `role="img"`/`aria-label`.

### 2.13 PhotoCredits

**Purpose** — the one quiet attribution line for any stock photo still in
place, read from `src/credits.json`; disappears once the owner's own photo
replaces it.

**States**

| State | Visual change | Tokens |
|---|---|---|
| Has credits | one line, `text-ink-soft`, each author linked if `page` is a URL | `--ink-soft` |
| No credits | renders nothing | — |

### 2.14 Logo / LogoMark

**Purpose** — the business's mark beside its name in the header/footer;
draws a default lotus mark when the owner has not supplied `site.logo`.

**States** — `default` only (static).

## 3. Content and formatting

- Voice: direct, factual, second person avoided — describes the shop ("We
  blend…"), never a sales pitch; every CTA states the destination, not an
  imperative ("The map and the hours", not "Visit now!").
- Prices: `formatPrice()` (`src/lib/format.ts`) — Vietnamese dong, no
  decimals.
- Hours and phone numbers: always `tabular-nums`, written exactly as the
  owner gave them (`8:00–21:00 every day`, `024 3829 1188`).
- Locale: `vi-VN` (`site.locale` in `content.json`).
- Labels and headings: sentence case throughout (`"The teas and what they
  cost"`, not title case); small-caps `Label` is visually uppercase via CSS,
  the source string itself stays sentence case.
- Empty-state wording: states what is missing and what to do instead — e.g.
  the offline form note ("This form is not connected yet — please call or
  send a Zalo message instead"), the 404 page (names what to do next, not
  just that the page is missing).

## 4. Known deviations

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| `src/components/ContactDock.tsx`, `Select.tsx` | `shadow-lg` (Tailwind's own scale, not a `--shadow-*` token) used on the floating dock buttons and the open `<Select>` panel | These are the only two genuinely floating layers in a design that otherwise draws no shadows at all; `--shadow-sm`/`--shadow-md` exist in `theme.css` for this exact case but the components reach for Tailwind's `shadow-lg` instead of the token | Low priority: swap to `shadow-[var(--shadow-md)]` next time either file is touched, for consistency rather than correctness |
| `src/components/MenuToggle.tsx`, `ContactDock.tsx` | `rounded-full` (Tailwind literal) instead of `rounded-[var(--radius-pill)]` on the dock's two buttons | Same visual result (`--radius-pill: 999px`); inconsistent spelling only | Low priority |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2026-11-04 | Initial extraction from the approved "Prices on the board" design | #1 |
