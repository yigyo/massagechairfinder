---
version: "1.1"
name: MassageChairFinder
updated: "2026-05-09"
description: Design system reference for massagechairfinder.com. Reflects the live production site. Read this before building any new component, page, or layout element.
---

# MCF Design System

## What this file is for

This is the single source of truth for the MCF visual design system. It documents colors, typography, components, banned patterns, and key decisions made during build. Any AI tool or developer working on this codebase should read this file before producing UI.

MCF is an independent editorial research site, not a retailer, not a spa brand. The design should read like a serious consumer publication: clean, credible, and category-authoritative. The closest reference is Wirecutter, but one notch warmer in tone. Never flashy. Always specific. Trust is earned through clarity, not style.

---

## Logo

The site uses a single horizontal lockup image: `/MCF-horizontal-logo-1200x300.webp`

- Transparent WebP, 1200x300px native
- Rendered in the nav at `h-11` (44px) tall, `w-auto`
- Do NOT recreate the logo in HTML/SVG. Always use the image file.
- Wordmark structure: "MASSAGE CHAIR" in IBM Plex Sans Medium, all-caps, tracked, above "Finder" in Noto Serif Bold, Teal (#2E7D6F)
- The previous icon-only file (`/GMC-logo-icon-1024x1024.png`) is retired from the nav but kept in `/public` for reference

---

## Colors

### Primary palette (use these everywhere)

| Token | Hex | Role |
|---|---|---|
| `navy` | `#1C2331` | Headings, nav text, dark backgrounds |
| `gold` | `#D1803E` | Primary accent: CTAs, active links, card borders |
| `teal` | `#2E7D6F` | Secondary accent: "Finder" wordmark, wellness callouts |
| `charcoal` | `#3D3D3A` | Body text |
| `warm-gray` | `#6B6B65` | Secondary text, captions, metadata |
| `linen` | `#F5F1EB` | Page background, card backgrounds |
| `sand` | `#E8DFD3` | Dividers, subtle backgrounds, table row alternation |
| `terra` | `#C04832` | Warnings, out-of-stock badges, alert callouts |
| `bronze` | `#934713` | Inline links, fine detail accents |

### Color rules

- `gold` is the primary action color. CTAs, focused borders, and active nav states all use gold.
- `teal` is secondary. Use for the logo wordmark, secondary badges, wellness-adjacent content.
- `terra` is for warnings and alerts only. Do not use it as a decorative accent.
- Never use pure black (`#000000`) or pure white (`#FFFFFF`) as backgrounds. Always use navy or linen.
- The brand-v2 experiment colors (`#0EA5E9`, `#0369A1`, `#0B1829`, `#F2F6FB`) are NOT in use on the live site. Do not introduce them.

---

## Typography

Two typefaces. No exceptions.

### Noto Serif
Used for: all headings (h1-h4), pull quotes, the logo wordmark "Finder" text.
Loaded via: `var(--font-noto-serif)` / `font-serif` Tailwind class.

| Level | Size | Weight | Line Height |
|---|---|---|---|
| Display / Hero H1 | 2.25rem (36px) | Bold 700 | 1.2 |
| H1 (page title) | 2rem (32px) | Bold 700 | 1.25 |
| H2 (section heading) | 1.5rem (24px) | Bold 700 | 1.3 |
| H3 (card title) | 1.125rem (18px) | Bold 700 | 1.4 |
| Pull quote | 1.125rem (18px) | Regular 400 | 1.6 |

### IBM Plex Sans
Used for: body text, nav links, button labels, spec pills, captions, eyebrow labels, all-caps category descriptors.
Loaded via: `var(--font-ibm-plex-sans)` / `font-sans` Tailwind class.

| Level | Size | Weight | Notes |
|---|---|---|---|
| Body | 1rem (16px) | Regular 400 | Line height 1.7, max 70ch width |
| Body small | 0.875rem (14px) | Regular 400 | Line height 1.6 |
| Nav links | 0.875rem (14px) | Regular 400 | `text-charcoal hover:text-gold` |
| Button label | 0.875rem (14px) | SemiBold 600 | |
| Eyebrow label | 0.6875rem (11px) | Medium 500 | All-caps, letter-spacing 0.08em |
| Caption / metadata | 0.75rem (12px) | Regular 400 | `text-warm-gray` |

### Typography rules
- Hierarchy comes from scale contrast. Do not achieve hierarchy through weight variation alone at identical sizes.
- Eyebrow labels (small all-caps category descriptors above card headings) use IBM Plex Sans Medium, not Noto Serif.
- Article and compare page prose is capped at prose-lg / 70ch max-width.
- Never use Inter, Roboto, Arial, Helvetica, or system-ui as named primary fonts.
- Apply `text-wrap: balance` to h1 and h2 elements so the headline distributes evenly across lines and avoids orphan words on the last line.
- Apply `text-wrap: pretty` to body prose for cleaner paragraph terminations.
- Apply `font-variant-numeric: tabular-nums` to any numeric data: spec tables, prices, compare grids, ratings. Aligns digits in vertical columns and prevents the awkward jitter of proportional figures stacked side by side.

---

## Spacing

| Token | Value | Use |
|---|---|---|
| `xs` | 4px | Fine gaps, icon padding |
| `sm` | 8px | Tight internal padding |
| `md` | 16px | Standard card padding |
| `lg` | 24px | Section gaps (tight) |
| `xl` | 40px | Section gaps (generous) |
| `2xl` | 64px | Hero section padding |

Max content width: `max-w-5xl` (1024px) for most pages. Article prose: `max-w-2xl` (672px).

### Viewport and layout primitives

- Full-viewport sections use `min-h-[100dvh]`, never `h-screen`. The `dvh` (dynamic viewport height) unit accounts for mobile browser chrome and prevents layout jumping when iOS Safari shows or hides its toolbar mid-scroll. The bug is silent in desktop testing and brutal on mobile.
- For multi-column structures, use CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`), never flex with percentage math (`w-[calc(33%-1rem)]`). Grid is more reliable across viewports, easier to reason about, and degrades gracefully when content overflows.
- For card rows where content length varies (chair cards, brand cards, article cards), use `flex flex-col` on each card with `mt-auto` on the CTA. This pins buttons to the bottom of each card so they form a clean horizontal line regardless of description length above them. Without this, CTAs end up at random vertical heights and the row reads as broken.
- Side-by-side elements (compare columns, pricing tables, feature card groups) must align shared elements at the same Y position. Titles, prices, feature lists, and CTAs across columns should sit on shared baselines. Use fixed-height title blocks or consistent top spacing to enforce this. Misaligned baselines across parallel cards is one of the loudest "this site looks unfinished" tells.

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `sm` | 4px | Pills, small tags, spec badges |
| `md` | 8px | Buttons |
| `lg` | 10px | Cards |
| `xl` | 14px | Large modal/panel containers |

No mixing within component families. No one-sided rounding (e.g., `rounded-r-xl`) on cards or callouts.

---

## Components

### Navigation
- Background: white, `border-b border-sand`, sticky, `z-50`
- Height: `h-16` (64px) on desktop
- Logo: `<Image src="/MCF-horizontal-logo-1200x300.webp" height={44} width={176} className="h-11 w-auto" priority />`
- Nav links: IBM Plex Sans 14px, `text-charcoal hover:text-gold transition-colors`
- Primary CTA: `btn-primary whitespace-nowrap` class, gold fill, white text, `rounded-md`
- Search: inline SVG icon triggers overlay

### btn-primary (global CSS class)
```css
.btn-primary {
  background-color: #D1803E;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition-property: color, background-color, border-color, transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover { background-color: #b8692e; }
.btn-primary:active { transform: scale(0.98); }
```

### Interactive states

Apply these consistently across all interactive components. They make the interface feel responsive and finished.

- **Tactile click feedback:** add `active:scale-[0.98]` to btn-primary and any large clickable card or tile. Simulates a physical press. Free quality improvement.
- **Hover transitions:** 150 to 200ms duration with `cubic-bezier(0.16, 1, 0.3, 1)` easing. Faster feels janky, slower feels sluggish.
- **Active navigation:** the current-page nav link must be visually distinguished from inactive ones. Use `text-gold` or an underline rule, not just hover-state styling.
- **Skeleton loaders:** when content loads asynchronously (quiz results, catalog filters, search results), use placeholder boxes that match the final layout shape. Never use generic circular spinners. The shape match prevents layout shift when content arrives.
- **Empty states:** every list, grid, or panel that can be empty needs a designed empty state. Compose a brief explanation and a next-step CTA. Never leave a blank area.
- **Form errors:** display inline below the input in terra (`#C04832`). Never use `window.alert()` or modal popups for validation errors.

### Callout card (Quick Take, Summary)
The standardized card treatment for all editorial callout/verdict/summary elements:
```jsx
<div
  className="mb-12 max-w-2xl rounded-lg px-6 py-5"
  style={{ background: "rgba(209,128,62,0.06)", border: "1px solid rgba(209,128,62,0.25)" }}
>
  <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#D1803E" }}>
    Quick Take
  </p>
  <p className="text-charcoal leading-relaxed">{verdict}</p>
</div>
```
- Gold tint background plus hairline full border
- Eyebrow label in gold, 11px, all-caps, tracked
- NO `border-l-4`. NO `rounded-r-xl`. NO side-tab of any kind.

### Warning callout
For S-track cautions, stock alerts, advisory notes:
```jsx
<div
  className="mb-8 rounded-lg p-5"
  style={{ background: "rgba(192,72,50,0.06)", border: "1px solid rgba(192,72,50,0.25)" }}
>
  <p className="text-charcoal text-sm leading-relaxed">{warningText}</p>
</div>
```
- Terra tint background plus hairline terra border
- No eyebrow label, body text only

### Chair Finder callout (compare pages)
```jsx
<div className="rounded-lg p-6 mt-10" style={{ background: "#F5F1EB" }}>
  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#2E7D6F" }}>Chair Finder</p>
  <h2 className="text-xl font-serif text-navy mb-2">Not sure which is right for you?</h2>
  <p className="text-charcoal mb-4">...</p>
  <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
</div>
```
- Always warm linen background (`#F5F1EB`). Never navy, teal, or dark background.
- Eyebrow label in teal (`#2E7D6F`). The Chair Finder is teal-associated sitewide (logo wordmark, homepage CTA section, this callout).

### Expert note callout
For clinical or health-related asides, expert tips, or "what your physical therapist would tell you" moments inside articles and best-of pages. Same shape as Quick Take, teal tint:
```jsx
<div
  className="mb-8 max-w-2xl rounded-lg px-6 py-5"
  style={{ background: "rgba(46,125,111,0.06)", border: "1px solid rgba(46,125,111,0.25)" }}
>
  <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#2E7D6F" }}>
    Expert Note
  </p>
  <p className="text-charcoal leading-relaxed">{content}</p>
</div>
```
- Teal tint background plus hairline full border
- Eyebrow label in teal, 11px, all-caps, tracked
- Use sparingly. One per article maximum, two for very long pieces. If every paragraph gets one, the signal dies.
- Builds the callout vocabulary: gold = Quick Take (verdict / summary), terra = Warning (caution / stock / advisory), teal = Expert Note (clinical / health / expert aside).

### Page eyebrow
A small all-caps teal label sitting directly above the page H1 on interior pages, signaling page type:
```jsx
<p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#2E7D6F" }}>
  Buying Guide
</p>
<h1 className="text-4xl font-serif mb-4">{title}</h1>
```
- Used on `/learn/[slug]` (eyebrow text: "Learning Center"), `/brands/[slug]` (eyebrow text: "Brand"), and may be extended to `/best/[slug]` and `/compare/[slug]` in v2
- Sits between any back-link and the H1
- Teal color matches the editorial categorization role (you are HERE in section X)
- Homepage hero does NOT use a page eyebrow. The hero is the brand statement.

### Progress bar (Chair Finder)
```jsx
<div style={{
  height: "100%",
  background: "#D1803E",
  borderRadius: 3,
  width: "100%",
  transform: `scaleX(${progressPct / 100})`,
  transformOrigin: "left",
  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)"
}} />
```
Uses `transform: scaleX()`, not `transition: width`. GPU-accelerated, no layout thrash.

---

## Motion

Motion on MCF should feel invisible. Subtle, calm, present only where it improves comprehension. The site is editorial trust, not SaaS dazzle. Reach for motion to draw the eye to a state change, never to perform.

### Scroll-entry pattern

Major content blocks (article sections, card grids, callouts, hero secondary content) should fade in on scroll:

```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Trigger via `IntersectionObserver`. Never use `window.addEventListener('scroll')`. Apply to major blocks only, not every element. Buttons, nav, and inline text should not animate.

### Staggered cascade

For grids and lists where items appear together (catalog grids, FAQ accordions, brand logos, related-article cards), stagger entry:

```jsx
<div style={{ animationDelay: `calc(${index} * 80ms)` }} className="scroll-reveal">
```

80ms is the right cadence for most lists. Faster feels uncoordinated, slower drags.

### Hardware acceleration rule

Animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, or `margin`. Layout properties trigger reflow on every frame and cause noticeable jank on mobile.

### Restraint

No magnetic hover. No parallax. No scroll-jacking. No GSAP. No ThreeJS. These patterns belong on dazzle-first agency and SaaS sites. MCF is a research site for buyers spending real money. Trust comes from clarity, not spectacle.

---

## Banned Patterns

All fixed in production as of 2026-05-09. Do not reintroduce.

| Pattern | Example | Why banned | Fix |
|---|---|---|---|
| Side-tab border | `border-l-4 border-gold` | #1 AI-generated UI tell | Full-border tint card |
| One-sided rounding | `rounded-r-xl` on cards | Pairs with side-tab, looks unresolved | `rounded-lg` all sides |
| Layout animation | `transition: width` | Layout thrash on every frame | `transform: scaleX()` |
| Brand-v2 colors | `#0EA5E9`, `#0369A1` | Aborted rebrand, not live | Use gold/teal palette |
| SVG logo in nav | Inline magnifying glass SVG | Looked like a search button | Use horizontal lockup WebP |
| Em dashes | em dash character or `&mdash;` | AI copy tell | Comma, period, or restructure |
| "quiz" anywhere | "Take the quiz" | Banned sitewide | "Find My Chair" or "Chair Finder" |
| `borderLeft` accent | `style={{ borderLeft: "4px solid #D1803E" }}` | Same as side-tab, just inline | Full-border tint pattern |
| `h-screen` for full-viewport sections | `<section className="h-screen">` | iOS Safari layout jumps when address bar shows or hides | `min-h-[100dvh]` |
| Layout-property animation | `transition: top, left, width, height, margin` | Triggers reflow every frame, jank on mobile | `transform` and `opacity` only |
| Scroll event listener | `window.addEventListener('scroll', ...)` | Fires hundreds of times per scroll, kills performance | `IntersectionObserver` |
| Flex percentage math for columns | `w-[calc(33%-1rem)]` | Brittle across viewports, hard to debug | CSS Grid (`grid grid-cols-3 gap-6`) |

Run `npx impeccable detect --fast .` after any component work to verify zero findings.

---

## Page-level patterns

### Homepage
- Hero: full-bleed photo (`/hero.webp`), `objectPosition: "50% 50%"`
- Hero container: `min-h-[100dvh]`, never `h-screen`
- Desktop gradient: `linear-gradient(to left, rgba(28,35,49,0.88) 28%, ... transparent 84%)`
- Mobile gradient: `linear-gradient(to top, rgba(28,35,49,0.93) 0%, ... rgba(28,35,49,0.15) 100%)`
- Mobile sub-text: `color: #E8DFD3`, `textShadow: "0 1px 4px rgba(0,0,0,0.80)"`
- Hero CTAs: `btn-primary whitespace-nowrap` plus secondary ghost border button
- Teal CTA section: all child text needs explicit `text-white`, including h2, which does not inherit automatically

### Compare pages
- Canonical template: "Specs Compared" heading, `>` bullets (navy Chair A, teal Chair B), "Choose the [Name] if:" cards
- Quick Verdict card: gold tint full-border pattern, "Quick verdict" eyebrow, no h2
- Chair Finder callout: linen background always
- Spec rows: apply `font-variant-numeric: tabular-nums` so digits align cleanly
- Banned: "quiz", "side by side", "Who should buy"

### Learn (buying guide) articles
- Article summary excerpt box: gold tint full-border card (same pattern as callout card)
- Internal links: minimum 5 per article, always include `/finder`
- Prose max-width: `max-w-2xl`
- Apply `text-wrap: pretty` to body, `text-wrap: balance` to h1/h2

---

## Canva Brand Kit (May 2026)

Set up for buying guide PDF production. Reference for future Canva work:

**Logo:** MCF-horizontal-logo-1200x300.webp (transparent, 1200x300px)

**Colors loaded:** All nine from primary palette above.

**Fonts:** Noto Serif plus IBM Plex Sans (both available on Google Fonts via Canva)

**Type scale (Canva slots):**

| Slot | Font | Size | Weight |
|---|---|---|---|
| Title | Noto Serif | 31px | Bold |
| Subtitle | Noto Serif | 22px | Regular |
| Heading | Noto Serif | 20px | Bold |
| Subheading | IBM Plex Sans | 16px | Bold |
| Section header | IBM Plex Sans | 11px | Bold, all-caps |
| Body | IBM Plex Sans | 10px | Regular |
| Quote | Noto Serif | 13px | Italic |
| Caption | IBM Plex Sans | 9px | Regular, Warm Gray |

---

## Image direction (forward note)

A separate `image-direction-mcf/SKILL.md` file in `eComm/skills/` will govern AI image generation for MCF (Higgsfield and similar tools). Style brief: Wirecutter-warm editorial. Documentary-style photography in real residential spaces, warm natural light, real bodies, restrained color treatment matching the linen, navy, and gold palette. Avoid spa-aspirational glow, AI gradients, and stock-feeling imagery. Multi-image consistency rules will enforce a single brand world across hero, category, and supporting images. To be drafted in a follow-up session, calibrated against the imagegen-frontend-web skill from the taste-skill repo.

---

## Key decisions log

| Date | Decision | Reason |
|---|---|---|
| 2026-05 | All callout/verdict cards standardized to gold tint full-border | Impeccable: side-tab is #1 AI-slop tell |
| 2026-05 | Progress bar switched to `transform: scaleX()` | Impeccable: `transition: width` causes layout thrash |
| 2026-05 | Brand-v2 color experiment aborted | Blue palette felt wrong for editorial positioning, broke photo hero |
| 2026-05 | Horizontal logo lockup deployed | SVG magnifying glass looked like a search button |
| 2026-05 | "Finder" in logo set to Teal, not Gold | Teal fits navigation/compass semantic, differentiates from Goodwin |
| 2026-05 | Hero `objectPosition` changed to `50% 50%` | `50% 30%` showed too much ceiling on mobile portrait |
| 2026-05 | Split desktop/mobile hero gradients | Single gradient could not serve both orientations well |
| 2026-05 | Section rebrand: "Buying Guide" became "Learn" in nav, full section name is "Learning Center" | Cleaner nav label; section URL is `/learn`; full editorial name is "Learning Center" used in eyebrows and breadcrumbs |
| 2026-05 | Hero secondary CTA shortened to "Explore the Guide" | "Explore the Learning Center" wrapped to two lines on mobile |
| 2026-05-09 | Reviewed taste-skill repo (Leonxlnx/taste-skill on GitHub), pulled selective additions | Added: viewport primitives (`min-h-[100dvh]`, grid-over-flex-math), tactile states (`active:scale-[0.98]`, hover easing), card-row alignment (`mt-auto`), shared-baseline rule for compare columns, `text-wrap: balance/pretty`, `font-variant-numeric: tabular-nums`, scroll-entry motion pattern, staggered cascade, three new banned patterns. Skipped: font swaps (locked on Noto Serif and IBM Plex), anti-3-column rule (compare and brand catalog need 3 cols), bento/magnetic/glass patterns (wrong genre for editorial trust). Reason: taste-skill defaults at MOTION_INTENSITY 6 and DESIGN_VARIANCE 8 fit SaaS-flash sites; MCF calibrates closer to motion 2 and variance 3. Image-direction skill noted as follow-up deliverable. |
| 2026-05-10 | Teal accent rolled out more broadly across pages | Three coordinated additions: (1) new "Page eyebrow" pattern on /learn and /brands templates (small all-caps teal label above H1, signals page section), (2) new "Expert note" callout pattern in teal (joins Quick Take in gold and Warning in terra to complete the callout vocabulary), (3) Chair Finder callout eyebrows recolored from warm-gray to teal in 13 compare pages, plus a teal hairline rule above the Footer's legal section. Rationale: teal had a strong identity role in the logo but was visually absent from most interior pages. Each addition keeps teal in its established semantic (identity, wellness/expert, pairing, Chair Finder), so the system stays coherent. Page eyebrow on /best and /compare H1s deferred to v2 since those are individual page files (30+ edits). |
| 2026-05-12 | Page eyebrow text on /learn corrected from "Buying Guide" to "Learning Center" | Aligned the eyebrow with the section's actual rebranded name. Caught by Yigyo on visual review of /learn/4d-vs-3d-massage-chair-rollers. |
