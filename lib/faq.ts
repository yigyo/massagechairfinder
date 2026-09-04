// lib/faq.ts
// Reads an FAQ that already exists inside a body of HTML and returns its
// question/answer pairs for FAQPage structured data. Adds no visible markup and
// changes no layout; it only mirrors an on-page FAQ into JSON-LD so search and
// AI engines can parse it. Handles the three FAQ markup styles used across the
// content library and never throws.
//
// Extracted from app/learn/[slug]/page.tsx so the brand pages can reuse it.

// Strips HTML to plain text for use in structured data.
export function stripTags(input: string): string {
  return input
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractFaqs(html: string): { question: string; answer: string }[] {
  try {
    if (!html) return []
    const heading = html.match(/<h2[^>]*>\s*(?:frequently asked questions|faq)\s*<\/h2>/i)
    if (!heading) return []
    let section = html.slice((heading.index ?? 0) + heading[0].length)
    const nextH2 = section.search(/<h2[^>]*>/i)
    if (nextH2 !== -1) section = section.slice(0, nextH2)

    const pairs: { question: string; answer: string }[] = []
    let m: RegExpExecArray | null

    // Style 1: <details><summary><strong>Q</strong></summary><p>A</p></details>
    const details = /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi
    m = details.exec(section)
    while (m !== null) {
      const q = stripTags(m[1])
      const a = stripTags(m[2])
      if (q && a) pairs.push({ question: q, answer: a })
      m = details.exec(section)
    }

    // Style 2: <h3>Q</h3><p>A</p>
    if (pairs.length === 0) {
      const h3 = /<h3[^>]*>([\s\S]*?)<\/h3>\s*((?:<p[^>]*>[\s\S]*?<\/p>\s*)+)/gi
      m = h3.exec(section)
      while (m !== null) {
        const q = stripTags(m[1])
        const a = stripTags(m[2])
        if (q && a) pairs.push({ question: q, answer: a })
        m = h3.exec(section)
      }
    }

    // Style 3: <p><strong>Q</strong> A</p>
    if (pairs.length === 0) {
      const strongP = /<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/p>/gi
      m = strongP.exec(section)
      while (m !== null) {
        const q = stripTags(m[1])
        const a = stripTags(m[2])
        if (q && a && a.length > 15) pairs.push({ question: q, answer: a })
        m = strongP.exec(section)
      }
    }

    return pairs
  } catch {
    return []
  }
}
