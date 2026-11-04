# Trà Sen Hồ Tây — the design

The chosen direction is **Prices on the board** (design/directions.md). This file records what
was looked at while building it, and ends in the commitments the pull request is held to.

## What the site has to do

A shop at 58 Quán Thánh blends lotus, jasmine and oolong and sells them in 100g and 250g tins,
with a few tables for a pot. It does not sell online. So the site is a board, not a brochure:
the weight, the price, the hours and the phone number, then the room and the photographs for the
half of the customers who come for that. One action: call the shop.

## Sites looked at

| Site | What was taken | How it became this shop's |
|---|---|---|
| land-book.com (gallery) | A masonry wall of full-width cards, each a photograph with a hairline caption under it; nothing moves but a slow fade as cards enter. | The gallery page: one column of large landscape photographs with the caption on a hairline beneath, rising 16px as each enters. Not a card wall — one picture at a time, big. |
| onepagelove.com (gallery) | Section rhythm: a tight rule-and-label header above each block, so a long page reads as a list of named parts. | The small-caps letterspaced label above every section heading, carried on all six pages. |
| linear.app/customers | A two-column page with a narrow left rail of facts against a wide right field of content; type small and exact, no decoration. | The home page: a 340px rail of name, street, hours and the call button against the board filling the rest of the screen. |
| cal.com/pricing | A price table where the figure is the biggest thing in its row, aligned in its own column, a hairline between rows, the detail small beside it. | The tea board and the price list: tabular Archivo figures right-aligned in their own column, 100g over 250g on one hairline rule. |
| are.na (home and /pricing) | Almost no chrome: text on a flat ground, a single accent only where something is clickable, hairlines doing all the structural work. | The flat cream ground with one tea-leaf green accent reserved for the call button and links; every division is a 1px rule, no cards, no shadows. |

None of them runs a scroll-jacking library (land-book and are.na use plain CSS transitions;
cal.com has sticky columns we did not take). Nothing pinned or scrubbed here either.

## The direction

A light board. Ground `#F4F1E8` (the colour of unbleached paper), surface `#FFFFFF` only behind
a cut-out tin, ink `#17180F`, ink-soft `#5B5F4E`, one accent `#1F5134` — tea-leaf green — on the
call button and on links, accent-ink `#FFFFFF`, hairlines at `rgba(23,24,15,0.16)`. Display face
**Archivo** (grotesk, OFL): the house style's one unlock, taken for a display face with real
character — a shop sign, not a magazine — and carried through every heading and every price on
every page. Body **Inter**. h1 44px/1.05 at 1440, h2 28px, prices 34px: a shop's first screen has
to carry goods and numbers, so the headline is small and the numerals are large. Motion is a
short load rise and a 16px rise as each section arrives; hover lifts a tin 2px. Native scrolling,
nothing pinned.

## COMMITMENTS

* The home page's leaf photograph bleeds off the right edge of the viewport.
* Prices are 34px tabular Archivo figures, right-aligned in a column of their own.
* The home page is a two-column board: a 340px left rail against the board filling the rest.
* Every heading and every price is Archivo 500, and all body text is Inter.
* An 11px small-caps label leads every section on every page.
* Every division on the page is a 1px hairline, with no cards and no shadows.
* The gallery is one column of full-width landscape photographs, each captioned on a hairline.
* One light palette: a cream ground with a single tea-leaf green accent, and no second mode.
