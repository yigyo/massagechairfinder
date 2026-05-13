import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const NEWS_DIR = path.join(process.cwd(), "drafts/news")

export interface NewsArticle {
  slug:            string
  title:           string
  date:            string
  lastModified:    string
  metaDescription: string
  bodyHtml:        string
  category:        string
}

function extractSlug(rawSlug: string, filename: string): string {
  if (rawSlug && rawSlug.startsWith("/news/")) {
    return rawSlug.slice("/news/".length)
  }
  return filename.replace(/\.md$/, "")
}

let cached: NewsArticle[] | null = null

export function getPublishedNews(): NewsArticle[] {
  if (cached) return cached
  if (!fs.existsSync(NEWS_DIR)) {
    cached = []
    return cached
  }
  const files = fs
    .readdirSync(NEWS_DIR)
    .filter(f => f.endsWith(".md"))
  const articles: NewsArticle[] = []
  for (const filename of files) {
    const fullPath = path.join(NEWS_DIR, filename)
    const raw = fs.readFileSync(fullPath, "utf-8")
    const parsed = matter(raw)
    const data = parsed.data as Record<string, unknown>
    if (data.published !== true) continue
    articles.push({
      slug:            extractSlug(typeof data.slug === "string" ? data.slug : "", filename),
      title:           typeof data.title === "string" ? data.title : filename,
      date:            typeof data.date === "string" ? data.date : "",
      lastModified:    typeof data.lastModified === "string" ? data.lastModified : (typeof data.date === "string" ? data.date : ""),
      metaDescription: typeof data.meta_description === "string" ? data.meta_description : "",
      bodyHtml:        marked.parse(parsed.content, { async: false }) as string,
      category:        typeof data.category === "string" ? data.category : "news",
    })
  }
  articles.sort((a, b) => b.date.localeCompare(a.date))
  cached = articles
  return cached
}

export function getNewsArticle(slug: string): NewsArticle | null {
  return getPublishedNews().find(a => a.slug === slug) || null
}

export function formatNewsDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso + "T00:00:00Z")
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", {
    year:     "numeric",
    month:    "long",
    day:      "numeric",
    timeZone: "UTC",
  })
}
