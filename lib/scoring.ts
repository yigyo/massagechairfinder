import type { Chair } from './chairs'

/**
 * Composite priority score, used for default sort on All Chairs, ordering within
 * Best For pages, and as a tiebreaker in the Chair Finder.
 *
 * ── AFFILIATE PRIORITY ────────────────────────────────────────────────────────
 * When you confirm an active affiliate relationship with a brand, set
 *   goodwinStatus: 'affiliate'
 * on that chair in chairs.ts. That single change adds +40 points, floating the
 * chair to the top of every ranked surface on the site automatically.
 *
 * Current state (audited 2026-09-03): 29 chairs genuinely earn and carry
 * 'affiliate'; 106 carry 'none'. Before that audit, 124 of 135 chairs held
 * 'affiliate' while only 29 earned, so the +40 discriminated nothing and 9
 * chairs that DO pay commission were being outranked by chairs that pay zero.
 *
 * INVARIANT, do not break it again: goodwinStatus 'affiliate' means the chair
 * earns TODAY, which means a tagged amazonUrl or a retailer in APPROVED_DIRECT.
 * A retailer that merely HAS a program we have not applied to belongs in
 * affiliateTier 'A' (+10), never in goodwinStatus. Keep the two separate.
 *
 * Tiers:
 *   goodwinStatus 'affiliate' → +40  active confirmed deal
 *   affiliateTier 'A'         → +10  program exists (worth pursuing)
 *   affiliateTier 'C'         → +3   minor / unconfirmed program
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function chairScore(c: Chair): number {
  let score = 0

  // ── Affiliate relationship (primary lever, you control this) ────────────
  if (c.goodwinStatus === 'affiliate') score += 40
  if (c.affiliateTier === 'A')         score += 10
  else if (c.affiliateTier === 'C')    score += 3

  // ── Social proof ──────────────────────────────────────────────────────────
  // reviewRating 0–5 → up to +15 pts
  if (c.reviewRating) score += c.reviewRating * 3
  // reviewCount: log-scaled so 1000 reviews beats 10, but not by 100x
  if (c.reviewCount)  score += Math.min(Math.log10(c.reviewCount + 1) * 5, 10)

  // ── Track type (SL reaches most buyer pain points) ────────────────────────
  if      (c.track === 'SL')   score += 8
  else if (c.track === 'L')    score += 5
  else if (c.track === 'Flex') score += 3
  else if (c.track === 'S')    score += 2

  // ── Price sweet spot ($3k–$6k is where most buyers land) ─────────────────
  if      (c.priceMin >= 3000 && c.priceMin < 6000) score += 5
  else if (c.priceMin >= 6000 && c.priceMin < 9000) score += 3

  return score
}
