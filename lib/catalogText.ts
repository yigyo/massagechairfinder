/**
 * CATALOG TEXT BUILDERS
 * Formats the chairs array into the text blocks used in AI system prompts.
 *
 * buildMcfCatalogText()     — for massagechairfinder.com (Emily, finder + advisor)
 * buildGoodwinCatalogText() — for goodwin-chat-backend server.js (Florence, quiz)
 *
 * The output replaces the hardcoded "## COMPLETE CHAIR CATALOG" sections in both prompts.
 */

import { Chair, CHAIRS, MCF_CHAIRS, GOODWIN_CHAIRS, formatPrice } from './chairs'

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function yn(val: boolean | undefined): string {
  if (val === true)  return 'Yes'
  if (val === false) return 'No'
  return 'Unknown'
}

function ynStages(val: boolean | undefined, stages: number | undefined): string {
  if (val === true) return stages ? `Yes(${stages})` : 'Yes'
  if (val === false) return 'No'
  return 'Unknown'
}

function inchesToFeet(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inch = inches % 12
  return inch === 0 ? `${ft}'0"` : `${ft}'${inch}"`
}

function heightRange(chair: Chair): string {
  if (chair.heightMinIn && chair.heightMaxIn) {
    return `HeightRange:${inchesToFeet(chair.heightMinIn)}-${chair.heightMaxIn}"`
  }
  if (chair.heightMaxIn) return `MaxHeight:${chair.heightMaxIn}"`
  if (chair.heightMinIn) return `MinHeight:${inchesToFeet(chair.heightMinIn)}`
  return ''
}

function trackSpec(chair: Chair): string {
  if (!chair.track) return 'Track:Unknown'
  if (chair.track === 'vibration') return 'VIBRATION ONLY (not a roller chair)'
  const len = chair.trackLengthIn ? `(${chair.trackLengthIn}")` : ''
  return `${chair.track}-Track${len}`
}

function rollerSpec(chair: Chair): string {
  if (!chair.roller) return 'Roller:Unknown'
  return chair.roller
}

/** Build one catalog line for the MCF AI prompt. */
function mcfLine(i: number, chair: Chair): string {
  const parts: string[] = [
    `${i}. ${chair.name}`,
    formatPrice(chair),
    trackSpec(chair),
  ]

  if (chair.track !== 'vibration') parts.push(rollerSpec(chair))

  if (chair.zeroGravity !== undefined) parts.push(`ZG:${ynStages(chair.zeroGravity, chair.zeroGravityStages)}`)
  if (chair.spaceSaving !== undefined) {
    const ws = chair.wallClearanceIn !== undefined ? `(${chair.wallClearanceIn}")` : ''
    parts.push(`Space-saving:${chair.spaceSaving ? `Yes${ws}` : 'No'}`)
  }
  if (chair.heat !== undefined)     parts.push(`Heat:${yn(chair.heat)}`)
  if (chair.stretch !== undefined)  parts.push(`Stretch:${yn(chair.stretch)}`)
  if (chair.foot !== undefined)     parts.push(`Foot:${yn(chair.foot)}`)
  if (chair.calf !== undefined)     parts.push(`Calf:${yn(chair.calf)}`)
  if (chair.liftAssist)             parts.push('LiftAssist:Yes')
  if (chair.aiScanning)             parts.push('AI:Yes')
  if (chair.whiteGlove)             parts.push('WhiteGlove:Yes')
  if (chair.pemf)                   parts.push('PEMF:Yes')

  if (chair.weightCapacityLbs)      parts.push(`Weight:${chair.weightCapacityLbs}lbs`)

  const hr = heightRange(chair)
  if (hr) parts.push(hr)

  if (chair.aiNotes) parts.push(`Notes: ${chair.aiNotes}`)

  return parts.join(' | ')
}

/** Build one catalog line for the Goodwin AI prompt (includes affiliate tier). */
function goodwinLine(i: number, chair: Chair): string {
  const parts: string[] = [
    `${i}. ${chair.name}`,
    formatPrice(chair),
  ]

  // Tier
  const tier = chair.affiliateTier
  if (chair.goodwinStatus === 'supplier') {
    parts.push('Source:Goodwin')
  } else if (tier) {
    const commission = chair.affiliateCommission ? `(${chair.affiliateCommission})` : ''
    parts.push(`Tier ${tier}${commission}`)
  } else {
    parts.push('TierUnknown')
  }

  parts.push(trackSpec(chair))
  if (chair.track !== 'vibration') parts.push(rollerSpec(chair))

  if (chair.zeroGravity !== undefined) parts.push(`ZG:${ynStages(chair.zeroGravity, chair.zeroGravityStages)}`)
  if (chair.spaceSaving !== undefined) {
    const ws = chair.wallClearanceIn !== undefined ? `(${chair.wallClearanceIn}")` : ''
    parts.push(`Space-saving:${chair.spaceSaving ? `Yes${ws}` : 'No'}`)
  }
  if (chair.heat !== undefined)     parts.push(`Heat:${yn(chair.heat)}`)
  if (chair.stretch !== undefined)  parts.push(`Stretch:${yn(chair.stretch)}`)
  if (chair.foot !== undefined)     parts.push(`Foot:${yn(chair.foot)}`)
  if (chair.calf !== undefined)     parts.push(`Calf:${yn(chair.calf)}`)
  if (chair.liftAssist)             parts.push('LiftAssist:Yes')
  if (chair.aiScanning)             parts.push('AI:Yes')
  if (chair.whiteGlove)             parts.push('WhiteGlove:Yes')
  if (chair.pemf)                   parts.push('PEMF:Yes')

  if (chair.weightCapacityLbs)      parts.push(`Weight:${chair.weightCapacityLbs}lbs`)

  const hr = heightRange(chair)
  if (hr) parts.push(hr)

  if (chair.aiNotes) parts.push(`Notes: ${chair.aiNotes}`)

  return parts.join(' | ')
}

// ─── PUBLIC BUILDERS ───────────────────────────────────────────────────────────

/**
 * Returns the "## COMPLETE CHAIR CATALOG" section for the MCF finder/advisor prompt.
 * Includes only chairs where active === true && mcfActive !== false.
 */
export function buildMcfCatalogText(): string {
  const chairs = MCF_CHAIRS
  const lines = chairs.map((chair, i) => mcfLine(i + 1, chair))
  return [
    '## COMPLETE CHAIR CATALOG',
    '',
    'Only recommend chairs where key specs for the buyer\'s hard filters are documented.',
    '',
    ...lines,
  ].join('\n')
}

/**
 * Returns the "## COMPLETE CHAIR CATALOG" section for the Goodwin quiz prompt.
 * Includes only chairs where active === true && goodwinActive !== false.
 */
export function buildGoodwinCatalogText(): string {
  const chairs = GOODWIN_CHAIRS
  const lines = chairs.map((chair, i) => goodwinLine(i + 1, chair))
  return [
    '## COMPLETE CHAIR CATALOG',
    '',
    'Only recommend chairs where key specs for the buyer\'s hard filters are documented. "Unknown" means unavailable for filtering.',
    '',
    ...lines,
  ].join('\n')
}

/**
 * Returns only the chairs that have goodwinLookupKey and goodwinImageUrl set,
 * as an ordered array suitable for generating the Goodwin quiz lookup maps.
 * Ordering is stable: longer/more-specific keys should already be ordered correctly
 * by their position in the CHAIRS array.
 */
export function getGoodwinLookupChairs(): Chair[] {
  return GOODWIN_CHAIRS.filter(c => c.goodwinLookupKey)
}
