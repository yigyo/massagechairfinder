// lib/autolink.ts
// Automatic internal linking for article and brand page content.
// Wraps the first mention of each known entity (brand, chair model) in the
// appropriate internal link. Runs server-side at render time.
//
// Rules:
//   - Longer strings matched first (prevents "Osaki" matching inside "Osaki OS-Pro Admiral II")
//   - First occurrence only per entity (no link spam)
//   - Skips text inside existing <a> tags
//   - Does not self-link (pass currentSlug to exclude the current page's entity)
//   - Word-boundary aware (won't partial-match inside a longer word)
//   - When a chair name is linked, all substrings of that name (e.g. the brand
//     prefix "Inada" inside "Inada Robo 4D") are marked as already-linked so
//     they cannot receive a separate brand-page link on the same page. Product
//     names always link to the product page; brand-only links are reserved for
//     standalone brand mentions that do not accompany a model name.

import { CHAIRS } from './chairs'
import { LOCAL_BRANDS } from './local-brands'

interface LinkEntry {
  text: string
  href: string
}

function buildLinkMap(excludeSlug?: string): LinkEntry[] {
  const entries: LinkEntry[] = []

  // Chair model names — sort longest first to prevent partial matches
  CHAIRS
    .filter(c => c.active && c.mcfActive !== false && c.id !== excludeSlug)
    .sort((a, b) => b.name.length - a.name.length)
    .forEach(c => entries.push({ text: c.name, href: `/chairs/${c.id}` }))

  // Brand names — after chairs so chair names take precedence
  LOCAL_BRANDS
    .filter(b => b.slug !== excludeSlug)
    .forEach(b => entries.push({ text: b.name, href: `/brands/${b.slug}` }))

  return entries
}

export function autolink(html: string, currentSlug?: string): string {
  const linkMap = buildLinkMap(currentSlug)
  const linked = new Set<string>()

  // Split HTML into: (1) existing <a>...</a> blocks, (2) other tags, (3) text nodes
  // Only process text nodes — leave everything else untouched.
  return html.replace(
    /(<a\b[^>]*>[\s\S]*?<\/a>)|(<[^>]+>)|([^<]+)/g,
    (match, anchor, tag, text) => {
      // Existing anchor or HTML tag — pass through unchanged
      if (anchor || tag || !text) return match

      let result = text

      for (const { text: linkText, href } of linkMap) {
        if (linked.has(linkText)) continue

        const idx = result.indexOf(linkText)
        if (idx === -1) continue

        // Word-boundary check: character before and after must be non-alphanumeric
        const charBefore = result[idx - 1]
        const charAfter = result[idx + linkText.length]
        const okBefore = !charBefore || /[^a-zA-Z0-9]/.test(charBefore)
        const okAfter = !charAfter || /[^a-zA-Z0-9]/.test(charAfter)
        if (!okBefore || !okAfter) continue

        result =
          result.slice(0, idx) +
          `<a href="${href}">${linkText}</a>` +
          result.slice(idx + linkText.length)
        linked.add(linkText)

        // Mark every substring of the just-linked text as already-linked so
        // that brand-name prefixes (e.g. "Inada" inside "Inada Robo 4D") cannot
        // receive a separate link on this page. Enforces the rule: product
        // names link to the product page only; the brand name is not linked
        // separately on the same mention.
        for (const other of linkMap) {
          if (other.text !== linkText && linkText.includes(other.text)) {
            linked.add(other.text)
          }
        }
      }

      return result
    }
  )
}
