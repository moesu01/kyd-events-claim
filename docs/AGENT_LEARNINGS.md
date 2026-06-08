# KYD Mobile Event Page — Agent Learnings

Read before any block plan. **All plans complete.**

## Project

- **Goal:** Pixel-perfect 375px mobile event ticket page
- **Stack:** Vite + React + TypeScript + Chakra UI v3 (no Tailwind)
- **Font:** Inter (`index.html`); **Data:** mock only — `src/data/mock-event.ts`
- **Polish:** [make-interfaces-feel-better](~/.cursor/skills/make-interfaces-feel-better/SKILL.md) + [transitions-dev](~/.agents/skills/transitions-dev/SKILL.md) — never `transition: all`
- **Animated primitives:** `@base-ui/react` + `motion` + transitions-dev CSS (`src/styles/transitions-dev.css`)

## Build Status

| Plan | Scope | Status |
|---|---|---|
| 0 | Theme, types, mock data, cart context | Done |
| 1–2 | Header, carousel, poster | Done |
| 3 | Title block, meta rows | Done |
| 4–5 | Tabs, ticket list/cards/qty | Done |
| 6 | Purchase + sticky CTA | Done |
| 7–8 | Event Info + Line-up accordions | Done |
| 9 | Footer | Done |
| 10 | `EventPage` assembly + interface polish | Done |
| 11 | Base UI + transitions-dev + Motion layer | Done |
| 12 | Animation fixes — accordion, lineup timing, dropdown reopen, tab content swap | Done |

## Page Layout (`EventPage.tsx`)

`Box` shell: `bg="bg.page"`, `maxW="mobile"`, `mx="auto"`, `minH="100vh"`, font smoothing via `css` prop.

`<Box as="main">` → `VStack` (`gap={0}`, `pt="8px"`, `pb="100px"`):

1. `AppHeader` (`ticketCount` from `useTicketCart().totalTickets`)
2. `EventPoster`
3. `EventTitleBlock` (`pt="18px"` wrapper)
4. `EventMetaRows`
5. `TicketsSection` (`pt="12px"`)
6. `EventInfoAccordion` + `LineUpAccordion` (`mt="10px"`)
7. `SiteFooter` (`pt="20px"`)

`StickyPurchaseBar` after `main` (fixed). `pb="100px"` clears sticky CTA.

## Chakra v3 Patterns

- **Provider:** `<ChakraProvider value={system}>` in `src/theme/index.ts`
- **Tokens:** `bg.page`, `bg.surface`, `border.subtle`, `text.*`, `cta.*`
- **Elements:** `chakra('button')` / `chakra('a')` — not `Flex as="button"`
- **Dividers:** `Separator`; tab bar divider via `borderLeftWidth` on Resale tab button
- **Icons:** `@phosphor-icons/react` 14–18px; `aria-hidden` when decorative

**Accordions:** `KydAccordionSection` (Base UI Accordion) with `previewMode` for sections that show content when collapsed. Event Info uses in-place height reveal (single text block + `.t-resize` height clip) — not a view swap. Line-up uses Motion `staggerChildren` on rows with a fast container crossfade — not `kyd-accordion-panel` height.

**Tabs:** Base UI `Tabs.Root`; sliding `.kyd-tabs-pill` for indicator; tab **content** swaps via `AnimatedPresencePanel` keyed by `activeTab`; `_active scale(0.96)`.

**Tickets:** `QuantitySelector` = Base UI Select + `.t-dropdown` (persistent portal after first open); inset shadow cards; `useTicketCart()`.

**Purchase:** `getPurchaseLabel(n)` with `tabular-nums`; sticky bar via `IntersectionObserver`.

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `bg.page` | `#0a1219` | Background |
| `bg.surface` | `rgba(255,255,255,0.05)` | Cards, active tab |
| `border.subtle` | `rgba(255,255,255,0.2)` | Dividers |
| `text.primary` / `secondary` | `#fff` / `rgba(255,255,255,0.6)` | Copy |
| `cta.bg` / `cta.fg` | `#fff` / `#0a1219` | Primary button |
| `pageX` / `mobile` / `pill` | `12px` / `375px` / `9999px` | Layout |

**Figma one-offs:** badge `#666`/`#F7FAFC`, poster radius `8px`.

## Interface Polish (applied)

| Principle | Where |
|---|---|
| Font smoothing | `EventPage` shell `css` prop |
| Tabular nums | Prices, qty selector, purchase label, header badge |
| Scale on press (`0.96`) | `PurchaseButton`, tab buttons, waitlist button |
| Text-wrap balance | `EventTitleBlock` headings |
| Image outlines | `EventPoster` `rgba(255,255,255,0.1)` ring |
| Transition specificity | Accordion caret, pressable buttons — `transform` only |
| Shadows over borders | Ticket cards inset shadow; sticky bar top shadow |

## Figma & Assets

`get_design_context` one node at a time at 375px. Full page: `3263:3428`.

Assets in `/public/assets/`: `venue-logo.png`, `poster.jpg`, `kyd-labs-logo.png` (text fallback), `artists/*.jpg` (initial fallback).

## Animated primitives (Base UI + transitions-dev + Motion)

**Skills (read both SKILL.md before animating):**

| Skill | Path | Role |
|---|---|---|
| `make-interfaces-feel-better` | `~/.cursor/skills/make-interfaces-feel-better/` | Press `scale(0.96)`, spring `bounce: 0`, split/stagger, subtle exits, `initial={false}` |
| `transitions-dev` | `~/.agents/skills/transitions-dev/` | `t-*` CSS classes + `--dropdown-*` / `--panel-*` / `--tabs-*` vars |

**Decision tree:** transitions-dev CSS first → `motion/react` only for view swaps → make-interfaces-feel-better for press/stagger rules. **Never stack Motion container enter and `.t-stagger` on the same frame** — sequence them (Motion enter completes, then `.is-shown` on stagger).

**`previewMode` semantics:** Accordion item stays in DOM when collapsed (Base UI value always includes item). Use for sections with visible preview content (Event Info 3-line text, Line-up collapsed row). Animation inside the panel is a Motion view swap, not `kyd-accordion-panel` height animation. Panel wrapper has no `t-resize` class in previewMode.

**Dropdown portal rule:** After first open (`hasOpened`), portal stays mounted permanently. Visibility is class-only (`.t-dropdown.is-open` / `.is-closing`). Never unmount portal on close — unmounting breaks reopen and skips exit animation. Only mutate `open` via `onOpenChange`; do not also call `setIsOpen(false)` in `onValueChange`.

**Pattern map:**

| Need | Base UI | transitions-dev | Motion |
|---|---|---|---|
| Accordion height (non-preview) | `Accordion.Panel` | `01-card-resize` `.t-resize` + `.kyd-accordion-panel` | — |
| Accordion preview (Event Info) | `Accordion.Panel` (`previewMode`) | `01-card-resize` `.t-resize` height clip | — |
| Accordion preview (Line-up) | `Accordion.Panel` (`previewMode`) | — | Motion row stagger + fast crossfade |
| In-container panel reveal | — | `07-panel-reveal` `.t-panel-slide` | — |
| Dropdown / qty | `Select` | `05-menu-dropdown` `.t-dropdown` | — |
| Tab pill indicator | `Tabs` | `16-tabs-sliding` `.kyd-tabs-pill` | — |
| Tab content swap | `Tabs` | — | `AnimatedPresencePanel` keyed by `activeTab` |
| Staggered rows (hero copy, etc.) | — | `18-texts-reveal` `.t-stagger` + `useStaggerReveal` | — |
| Staggered list rows (line-up) | — | — | Motion `staggerChildren` ~80ms + `lineupRowVariants` |
| View swap (accordion, tabs) | — | — | `AnimatedPresencePanel` + `motion-presets.ts` |

**Timing reference:**

| Layer | Source | Enter | Exit | Notes |
|---|---|---|---|---|
| View swap | make-interfaces + `motion-presets.ts` | 300ms spring, `y: 12`, blur 4px | 150ms, `y: -12` | `AnimatedPresencePanel`, `initial={false}` |
| Staggered rows (line-up) | make-interfaces `staggerChildren` | 250ms spring per row, 80ms stagger | 120ms container fade | Motion only — no CSS `.t-stagger` stack |
| Staggered copy (hero, etc.) | transitions-dev `18-texts-reveal` | 600ms, 40ms stagger | 200ms fade (`.is-hiding`) | Via `useStaggerReveal` when not using Motion stagger |
| Dropdown | transitions-dev `05-menu-dropdown` | 250ms scale | 150ms scale | Persistent DOM via `hasOpened` |
| Tab pill | transitions-dev `16-tabs-sliding` | 200ms | — | Indicator only, not content |

**Key files:** `src/styles/transitions-dev.css` · `src/components/ui/kyd-accordion-section.tsx` · `src/components/ui/animated-presence-panel.tsx` · `src/lib/motion-presets.ts` · `src/lib/use-tabs-pill.ts` · `src/lib/use-dropdown-classes.ts` · `src/lib/use-stagger-reveal.ts`

**Future screens template:** dropdown → Base UI Select + `.t-dropdown` + `hasOpened` portal; tabs → Base UI Tabs + `.kyd-tabs-pill` + `AnimatedPresencePanel` for content; accordion with preview → `KydAccordionSection previewMode` + `AnimatedPresencePanel`; standard accordion → `KydAccordionSection` + `kyd-accordion-panel`; staggered list → `.t-stagger` + `useStaggerReveal`.

## Key Files

`EventPage.tsx` · `theme/index.ts` · `kyd-accordion-section.tsx` · `transitions-dev.css` · `ticket-cart-context.tsx`

## Out of Scope / Acceptance

No countdown, sign-in, real resale, or checkout/API. Pixel-match Figma at 375px; interactive states work with mock data; `npm run build` passes.
