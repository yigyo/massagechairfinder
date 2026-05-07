---
version: "alpha"
name: MassageChairFinder
description: Editorial precision-tech design system for massagechairfinder.com. A research-driven category authority — not a store, not a spa brand.
colors:
  background: "#F2F6FB"
  surface: "#FFFFFF"
  primary: "#0B1829"
  dark: "#0B1829"
  accent: "#0EA5E9"
  accent-interactive: "#0369A1"
  muted: "#5F7185"
  border: "#D4DDE9"
  border-strong: "#B8C8DC"
  on-dark-primary: "#FFFFFF"
  on-dark-secondary: "#8897A8"
  gold: "#D1803E"
  teal: "#2E7D6F"
  linen: "#F5F1EB"
typography:
  display:
    fontFamily: Noto Serif
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  h1:
    fontFamily: Noto Serif
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.015em
  h2:
    fontFamily: Noto Serif
    fontSize: 1.375rem
    fontWeight: 700
    lineHeight: 1.3
  h3:
    fontFamily: Noto Serif
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.4
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: IBM Plex Sans
    fontSize: 0.6875rem
    fontWeight: 500
    letterSpacing: 0.08em
rounded:
  sm: 4px
  md: 8px
  lg: 10px
  xl: 14px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: "#0369A1"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "#075985"
    textColor: "#FFFFFF"
  button-dark:
    backgroundColor: "{colors.dark}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 10px 20px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 10px 20px
  nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.dark}"
    height: 56px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 16px
  spec-pill:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: 2px 7px
  verdict-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 20px
  hero-tag:
    backgroundColor: "#0B1829"
    textColor: "{colors.accent}"
    rounded: "{rounded.sm}"
    padding: 4px 10px
  eyebrow-label:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.accent}"
  chair-finder-callout:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

MassageChairFinder is an editorial research tool in the voice of a trusted specialist — think Wirecutter's rigorous independence filtered through a precision-tech aesthetic. Buyers spend 3 to 9 months researching a $4,000 to $10,000 purchase. The design earns their trust by feeling authoritative and unhurried, not promotional.

The palette moves away from the warm linen and terra cotta of GMC (the sibling Shopify store) into cooler, more precise territory. Think the build quality of a Nouhaus or Human Touch product page — engineered confidence rather than spa retreat. The background is a cool near-white rather than warm cream. The accent is sky blue rather than gold. Nothing here should feel like it came from a furniture or wellness catalog.

The serif headings stay: they signal research, editorial judgment, and permanence — the opposite of a fast-moving SaaS product. The body font moves from Helvetica to IBM Plex Sans, which carries the same technical authority without the generic default feel.

## Colors

The palette has three functional layers.

**Foundation:** Background `#F2F6FB` is a cool near-white with a faint blue tint — distinct from warm linen but not clinical. Surface `#FFFFFF` is used for cards and elevated elements only. Dark `#0B1829` is a deeper midnight than the current navy, used for all primary headings, nav, and dark-section backgrounds.

**Accent:** `#0EA5E9` (sky blue) is the primary accent — used for interactive labels, eyebrow tags, icon marks, borders on focused elements, and link hover states. It is NOT used as a button background with white text (contrast fails WCAG AA). For interactive buttons with white text, use `accent-interactive` `#0284C7` (one stop darker). Muted `#5F7185` is cool slate for secondary text, captions, and metadata.

**Legacy component colors:** Gold `#D1803E` and teal `#2E7D6F` remain in use specifically for compare page decision cards (Chair A gets gold/navy border, Chair B gets teal border) and the verdict card tint. These are component-scoped and do not appear in the general UI. Linen `#F5F1EB` is retained for the Chair Finder callout block across all compare pages.

Side-tab borders (`border-left` or `border-right` thicker than 1px as a colored accent) are banned everywhere. The verdict card uses a full-border tint pattern instead: `background: rgba(209,128,62,0.06)` with `border: 1px solid rgba(209,128,62,0.25)`.

## Typography

Two typefaces. No exceptions.

**Noto Serif** for all headings (h1 through h4) and the site logo wordmark. It reads as editorial and research-driven rather than SaaS-promotional. Display size is 2.75rem for hero headlines; h1 is 2rem for page headings; h2 is 1.375rem for section headings.

**IBM Plex Sans** for all body text, UI labels, nav links, button text, spec pills, and metadata. It has a technical pedigree (designed for IBM's developer tools) that matches the precision-tech register without being overused. Never use Helvetica, Arial, Inter, or system-ui as a primary body font.

Body line length is capped at 70ch. Hierarchy is achieved through scale contrast — never through identical sizes with only weight variation.

Eyebrow labels (used above card headings, section titles, and the verdict card) are: 0.6875rem, weight 500, uppercase, letter-spacing 0.08em, in the relevant accent color.

## Layout

Max content width is 1152px (72rem). Article and compare page prose is capped at 768px (48rem) for readability.

Spacing is varied intentionally to create rhythm. The hero section uses generous top/bottom padding (80px+). Cards use 16px internal padding. Section gaps alternate between 24px and 40px to avoid monotony.

Cards are used where they genuinely help — chair result cards, compare decision cards, the verdict card. They are not used as a default wrapper for everything. Nested cards are never used. The hero and navigation sections have no card wrappers.

## Elevation and Depth

The site uses a two-tier elevation model: flat surfaces (background + border only) and white surface cards (white bg + 1px border at `#D4DDE9`). No box shadows on cards — border alone provides the separation. The one exception is the dark hero section, which creates depth through background color contrast rather than shadows.

## Shapes

Corner radius follows a strict scale: 4px for pills and small tags, 8px for buttons, 10px for cards, 14px for the logo mark. No mixing within component families. No rounded-only-on-one-side combinations.

## Components

**Navigation:** White background, 56px height, dark text, accent-blue logo mark (dark square, sky-blue search icon). Logo wordmark is Noto Serif stacked in two lines: "Massage Chair" / "Finder" in accent blue. Nav links are IBM Plex Sans 13px in muted slate. Primary CTA is a dark-filled button ("Find My Chair").

**Chair cards:** White card with 1px `#D4DDE9` border, 10px radius. Eyebrow label (category, e.g. "Best overall") in accent blue with a small blue dot. Chair name in Noto Serif h3. Sub-copy in body-sm muted. Spec pills in background tint with muted text. Price in dark h3. CTA button: dark fill, full width.

**Verdict card (compare pages):** Soft gold tint — `background: rgba(209,128,62,0.06)`, `border: 1px solid rgba(209,128,62,0.25)`, 10px radius. "QUICK VERDICT" eyebrow in gold (`#D1803E`), 0.6875rem uppercase. Body text in charcoal at 1rem. No h2 heading. No side-tab border.

**Compare table:** On dark (`#0B1829`) background section. Column headers in `rgba(255,255,255,0.5)`. Cell text in `rgba(255,255,255,0.75)`. Check marks in accent blue. Absent feature shown as em dash in `rgba(255,255,255,0.25)`. No full-width card wrapper — the dark background IS the container.

**Chair Finder callout (compare pages):** Background `#F5F1EB` (warm linen — retained for continuity across all compare pages), border `#E8DFD3`. Never dark or navy background. "CHAIR FINDER" eyebrow in warm gray. h2 in Noto Serif navy. CTA button in gold (`#D1803E`) fill.

**Spec pills:** Background tint `#F2F6FB`, border `#D4DDE9`, 4px radius, 2px top/bottom by 7px left/right padding. Muted text. Used on chair cards and product pages to show feature tags quickly.

## Dos and Donts

Do use tinted neutrals — never pure `#000000` or `#FFFFFF` as backgrounds, always with a subtle blue or warm tint.

Do use the eyebrow label pattern (small uppercase, accent color, 0.08em tracking) before card headings and section titles instead of relying on heading size alone.

Do pair the dark hero section with white or accent-blue text only — never warm gold or terra cotta in the dark section.

Do keep spec features in compact pills on cards rather than prose sentences.

Do not use side-tab borders (thick `border-left` or `border-right` accents). Always replace with full-border tints, background color contrast, or top borders.

Do not use gradient text, glassmorphism, or animated gradients.

Do not nest cards inside cards.

Do not use Inter, Roboto, Arial, Helvetica, or system-ui as named primary fonts.

Do not animate layout properties (width, height, padding, margin). Use transform and opacity.

Do not let body line length exceed 70ch in article or compare page prose.
