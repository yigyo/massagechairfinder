// nav-scanner.ts — server-only utility
// Scans app/best/ and app/compare/ at build time to produce nav + sitemap data.
// Never import this from a 'use client' file — it uses Node fs.

import fs   from 'fs'
import path from 'path'
import { BEST_LABELS, COMPARE_LABELS } from './nav-data'

export type NavPage = { label: string; slug: string }

// ── Label generation ────────────────────────────────────────────────────────

function slugToAutoLabel(slug: string): string {
  // under-2000  →  "Under $2,000"
  const under = slug.match(/^under-(\d+)$/)
  if (under) return `Under $${parseInt(under[1]).toLocaleString()}`

  // 3000-to-5000  →  "$3,000–5,000"
  const range = slug.match(/^(\d+)-to-(\d+)$/)
  if (range)
    return `$${parseInt(range[1]).toLocaleString()}\u2013${parseInt(range[2]).toLocaleString()}`

  // compare slugs: split on -vs- and title-case each side
  if (slug.includes('-vs-')) {
    const tc = (s: string) =>
      s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const [a, b] = slug.split('-vs-')
    return `${tc(a)} vs ${tc(b)}`
  }

  // default: title-case each word
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ── Redirect detection ──────────────────────────────────────────────────────

function isRedirect(pagePath: string): boolean {
  try {
    return fs.readFileSync(pagePath, 'utf-8').slice(0, 400).includes('redirect(')
  } catch {
    return false
  }
}

// ── Public scanners ─────────────────────────────────────────────────────────

export function getBestNavPages(): NavPage[] {
  const dir = path.join(process.cwd(), 'app', 'best')
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('['))
      .map(e => ({
        slug:  e.name,
        label: BEST_LABELS[e.name] ?? slugToAutoLabel(e.name),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  } catch {
    return []
  }
}

export function getCompareNavPages(): NavPage[] {
  const dir = path.join(process.cwd(), 'app', 'compare')
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(e => {
        if (!e.isDirectory() || e.name.startsWith('[')) return false
        return !isRedirect(path.join(dir, e.name, 'page.tsx'))
      })
      .map(e => ({
        slug:  e.name,
        label: COMPARE_LABELS[e.name] ?? slugToAutoLabel(e.name),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  } catch {
    return []
  }
}
