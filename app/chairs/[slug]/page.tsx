import { CHAIRS, MCF_CHAIRS, Chair, formatPrice } from '@/lib/chairs'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// ─── STATIC PARAMS ───────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const local = MCF_CHAIRS.map(c => ({ slug: c.id }))
  try {
    const { getChairs } = await import('@/lib/strapi')
    const res = await getChairs()
    const seen = new Set(local.map(l => l.slug))
    ;(res.data || []).forEach((c: any) => {
      const s = c.attributes?.slug || c.slug
      if (s && !seen.has(s)) { local.push({ slug: s }); seen.add(s) }
    })
  } catch {}
  return local
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const chair = CHAIRS.find(c => c.id === params.slug && c.active && c.mcfActive)
  if (!chair) return {}
  const trackLabel = chair.track === 'SL' ? 'SL-track' : chair.track === 'L' ? 'L-track' : chair.track === 'S' ? 'S-track' : ''
  const parts = [trackLabel, chair.roller].filter(Boolean).join(', ')
  const desc = `${chair.name} review — ${parts ? parts + ' massage chair, ' : ''}${formatPrice(chair)}. Who it fits, full specs, body fit guide, and honest assessment.`
  return {
    title: `${chair.name} Review — Is It Right for You?`,
    description: desc.slice(0, 160),
  }
}

// ─── CONTENT GENERATORS ──────────────────────────────────────────────────────

function getTrackLabel(chair: Chair): string {
  if (chair.vibrationOnly) return 'Vibration'
  if (!chair.track) return 'Unknown'
  const map: Record<string, string> = { SL: 'SL-Track', L: 'L-Track', S: 'S-Track', Flex: 'Flex-Track' }
  return map[chair.track] || chair.track
}

function trackSummary(chair: Chair): { heading: string; body: string } {
  if (chair.vibrationOnly) {
    return {
      heading: 'Vibration therapy, not rollers',
      body: 'The Laevo ZG uses vibration therapy rather than a roller mechanism — worth knowing upfront before comparing it to other chairs in this price range. For buyers who cannot tolerate deep pressure, are recovering from an injury, or prefer a gentler, whole-body response, this is a meaningful advantage. For buyers seeking firm deep-tissue massage, a roller chair is a better fit.',
    }
  }
  switch (chair.track) {
    case 'SL':
      return {
        heading: 'SL-track: neck to glutes in one pass',
        body: `The ${chair.name} uses an SL-track, which follows the full curve of your spine from the base of the neck through the lower back and under the glutes. This is the right track type for buyers with lower back pain that radiates into the hips — the roller path actually reaches the sacral area and upper hamstrings that S-track and many L-track chairs miss. If lower back and hip tension is your primary concern, an SL-track chair is almost always the right call.`,
      }
    case 'L':
      return {
        heading: 'L-track: lower back and glute coverage',
        body: `The ${chair.name} uses an L-track, which extends the massage path under the glutes and into the thighs. This makes it well suited for sciatica, hip tightness, and lower back pain. L-track chairs reach further down the body than S-track chairs and cover the glutes more directly — though they typically have slightly less upper-shoulder reach than a full SL-track. For most buyers with chronic lower back complaints, an L-track is a strong choice.`,
      }
    case 'S':
      return {
        heading: 'S-track: neck and upper back focus',
        body: `The ${chair.name} uses an S-track roller, which follows the natural S-curve of the spine from the neck through the upper and mid back. It is best for buyers whose primary concern is upper-body tension: neck stiffness, shoulder tightness, and mid-back ache from desk work. If your lower back pain extends into the hips or glutes, a chair with an L-track or SL-track will serve you better.`,
      }
    case 'Flex':
      return {
        heading: 'Flex-Track: the most complete coverage available',
        body: `The ${chair.name} uses Infinity's Flex-Track mechanism, which combines the reach of an SL-track with the extended lower-body path of an L-track. The roller runs from the neck through the full lower back, under the glutes, and into the thighs. For buyers who need full-body coverage without compromise — particularly those who experience pain in the upper back, lower back, and hips simultaneously — this is one of the most complete track configurations in the consumer market.`,
      }
    default:
      return {
        heading: 'Track type: not confirmed',
        body: `The track type on the ${chair.name} has not been confirmed in our research. We recommend contacting the retailer directly to verify roller coverage before purchasing — particularly if lower back, hip, or glute pain is your primary concern.`,
      }
  }
}

function rollerSummary(chair: Chair): { heading: string; body: string } | null {
  if (chair.vibrationOnly || !chair.roller) return null
  switch (chair.roller) {
    case '4D':
      return {
        heading: '4D roller: depth that adjusts in real time',
        body: 'The 4D roller adds a pulsing, variable depth motion on top of the standard 3D range — the mechanism can push in and retract as it moves along the track, replicating more of the varied pressure a human massage therapist applies. Buyers who find standard massage chairs feel mechanical or repetitive tend to respond well to 4D. It also means you have more control over the experience: softer when you want relaxation, firmer when you need release.',
      }
    case '3D':
      return {
        heading: '3D roller: adjustable depth, predictable control',
        body: 'The 3D roller extends outward from the track to vary massage depth, giving you direct control over how firm or gentle the massage feels. Compared to a 2D roller, this adds real nuance — you can dial in gentle pressure for a relaxing session or increase the depth for something closer to deep-tissue work. For most buyers, 3D is the right balance between capability and simplicity.',
      }
    case '2D':
      return {
        heading: '2D roller: gentle and consistent',
        body: 'The 2D roller follows a fixed depth path along the track, delivering a lighter and more predictable massage experience. If you prefer gentleness over intensity — or you are new to massage chairs and want to ease in before deciding what kind of pressure works for you — a 2D roller is less likely to feel too intense. It is also worth noting that most returns in this category happen because the massage was too rough: a 2D roller eliminates that risk.',
      }
    case '5D':
      return {
        heading: '5D roller: the most precise mechanism available',
        body: 'The 5D roller system adds micro-adjustment controls beyond 4D, allowing the chair to vary speed, depth, and width simultaneously with fine precision. This is the most sophisticated roller technology currently available in the consumer massage chair market. For buyers who have already owned a 4D chair and want more nuance, or for those who have very specific pressure requirements, 5D offers a level of customization that earlier mechanisms cannot match.',
      }
    default:
      return null
  }
}

function bodyFitSummary(chair: Chair): string {
  const parts: string[] = []
  if (chair.heightMinIn && chair.heightMaxIn) {
    const fmt = (n: number) => `${Math.floor(n / 12)}'${n % 12}"`
    parts.push(`Confirmed height range: ${fmt(chair.heightMinIn)} to ${fmt(chair.heightMaxIn)}.`)
  } else if (chair.heightMaxIn) {
    const fmt = (n: number) => `${Math.floor(n / 12)}'${n % 12}"`
    parts.push(`Maximum confirmed user height: ${fmt(chair.heightMaxIn)}.`)
  }
  if (chair.weightCapacityLbs) {
    parts.push(`Weight capacity: ${chair.weightCapacityLbs} lbs.`)
  }
  if (chair.petiteConfirmed) {
    parts.push(`Confirmed to fit users at 5'0" — one of the few chairs in this category with a confirmed petite lower bound.`)
  }
  if (chair.tallConfirmed && chair.heightMaxIn) {
    const fmt = (n: number) => `${Math.floor(n / 12)}'${n % 12}"`
    parts.push(`Confirmed to accommodate taller users up to ${fmt(chair.heightMaxIn)}.`)
  }
  if (chair.plusSizeConfirmed) {
    parts.push(`Weight capacity confirmed at 300 lbs or above.`)
  }
  if (parts.length === 0) {
    parts.push(`Confirmed body fit specifications are not available for this chair. We recommend contacting the retailer to verify height and weight compatibility before purchasing.`)
  }
  return parts.join(' ')
}

function roomFitSummary(chair: Chair): string {
  if (chair.spaceSaving && typeof chair.wallClearanceIn === 'number') {
    return `This chair uses a space-saving mechanism, which means it reclines forward rather than backward. You only need ${chair.wallClearanceIn}" of clearance between the chair back and the wall when fully reclined — significantly less than the 12–18" required by standard recline chairs. If you are placing this chair in a smaller room, close to a wall, or in a dedicated corner, this is a real advantage.`
  }
  if (chair.spaceSaving) {
    return `This chair has a space-saving design, allowing it to recline with minimal wall clearance. Check the product page for the exact clearance measurement before placing it in a tight space.`
  }
  return `This chair uses a standard recline mechanism. Plan for at least 12–18" of clearance behind the chair and roughly 2–3 feet of open space on each side for easy entry and exit. If room size is a primary concern, look for the space-saving version of this chair, or consider a different model from our catalog.`
}

function featuresLine(chair: Chair): string[] {
  const features: string[] = []
  if (chair.zeroGravity) {
    features.push(chair.zeroGravityStages && chair.zeroGravityStages >= 2 ? `${chair.zeroGravityStages}-stage zero gravity` : 'Zero gravity recline')
  }
  if (chair.heat) features.push('Heat therapy')
  if (chair.foot) features.push('Foot rollers')
  if (chair.calf) features.push('Calf compression')
  if (chair.stretch) features.push('Stretch programs')
  if (chair.aiScanning) features.push('Body scanning')
  if (chair.liftAssist) features.push('Lift-assist')
  if (chair.pemf) features.push('PEMF therapy')
  if (chair.whiteGlove) features.push('White glove delivery')
  if (chair.madeInUSA) features.push('Made in USA')
  return features
}

function verdictSummary(chair: Chair): string {
  const verdicts: Record<string, string> = {
    'osaki-os-champ': `The OS-Champ earns its place in the catalog as one of the few entry-level chairs with an SL-track and 3D roller — specs that usually appear a price tier higher. At $1,249, the tradeoff is a lighter build and fewer feature options. For a first-time buyer who wants SL-track coverage without the mid-range price commitment, it is a reasonable starting point.`,
    'osaki-os-pro-yamato': `The Yamato's standout feature is its value-to-feature ratio: stretch programs, heat, foot rollers, and calf compression in an L-track chair under $1,500. The 2D roller and 220 lb weight limit are real constraints. For buyers in the right size range who want a feature-rich entry chair, it consistently earns its recommendation.`,
    'osaki-os-pro-admiral-ii': `The OS-Pro Admiral II is one of the most well-rounded chairs in its price range. At $3,999 you get a 3D SL-track, body scanning, zero gravity, heat, and foot rollers in a space-saving frame that clears the wall in just 2". For buyers with both upper-back and lower-back tension in the $3,000–$4,000 range, this chair is a consistent first recommendation.`,
    'osaki-os-pro-maestro-le': `The Maestro LE 2.0 is Osaki's step-up 4D SL-track offering, and the jump from the Admiral II ($3,999) to this chair is a real one in feel. If the Admiral II's 3D roller feels too light after a trial, the Maestro LE is the natural next look. The wide price range reflects frequent promotions — at the lower end it is strong value.`,
    'osaki-os-pro-4d-duomax': `The DuoMax uses a dual 4D roller mechanism — two independent roller sets running simultaneously — which is rare in this category. At $12,999 it is a premium investment, best suited for buyers who have already owned a quality massage chair and are looking for something significantly more capable. White glove delivery is included.`,
    'kahuna-lm-6800': `The Kahuna LM-6800 is one of the best-selling massage chairs in the $3,000–$4,000 range, and it earns that position. The L-track with three-stage zero gravity, stretch programs, and heat make it a feature-rich option that regularly shows up on best-of lists. Roller type is unconfirmed — if pressure intensity is a priority, verify with the retailer before purchasing.`,
    'kahuna-lm-6800s': `The LM-6800S shares the LM-6800's L-to-SL upgrade track and three-stage zero gravity, adding a few refinements. At $3,799, it sits at the same price as its sibling. The choice between them typically comes down to exact feature differences — compare both before deciding.`,
    'infinity-dynasty-4d': `The Dynasty 4D has one specific distinction worth calling out: it is the only chair in our current catalog with a confirmed minimum height of 5'0". For petite buyers who have found that most massage chairs do not properly fit their frame, this is meaningful data rather than marketing language. The 4D L-track and 300 lb capacity round out a well-specified chair.`,
    'infinity-celebrity': `The Celebrity 3D/4D, formerly sold as the Riage X3, is an L-track chair at a price point that reflects its mid-range positioning. The affiliate link is currently through emassagechair.com while we confirm program availability — the product itself is in stock and well-regarded.`,
    'infinity-evolution': `The Evo Max 4D at $10,999 (on sale from $12,999 MSRP) delivers a 4D L-track with 49" track length, stretch programs, heat, and a space-saving design with just 2" wall clearance. For buyers in the $10,000–$12,000 range focused on lower back and hip relief, it is a strong contender.`,
    'infinity-genesis-max': `The Genesis Max 4D shares the Evo Max's 4D L-track, 49" track, and stretch programs at $9,299 — a meaningful price difference for a comparable feature set. Worth comparing the two directly if you are in this range.`,
    'infinity-imperial-syner-d': `The Imperial Syner-D stands out for confirmed height accommodation up to 6'6" and the Flex-Track mechanism that covers the full spine and thighs. For tall buyers who have struggled to find a chair that fits, and for those who want both upper-back and lower-body coverage, this is one of the strongest options in the catalog. The 5-year warranty adds confidence at this investment level.`,
    'human-touch-laevo-zg': `The Laevo ZG is the only vibration chair in our current catalog, and that distinction matters. For buyers who cannot tolerate roller pressure — those with certain spinal conditions, injury recovery situations, or sensitivity to deep massage — it fills a gap no roller chair can. For everyone else seeking traditional massage chair benefits, a roller chair is the better choice.`,
    'luraco-i9-max-plus': `The Luraco i9 Max Plus is the only massage chair we know of that is manufactured in the United States. At $13,490 it is not inexpensive — but the 10-year warranty, the confirmed height range to 6'10", and the domestic manufacturing track record make it a serious option for buyers who prioritize longevity and service access over headline features.`,
    'synca-jp970': `The JP970 brings a 4D roller to the $4,999 range, which is relatively uncommon. Track type is unconfirmed in our research — verify directly with Synca before purchasing if your pain is specifically in the lower back and hips.`,
    'synca-jp1100': `The JP1100 adds zero gravity and heat to the JP970's 4D roller platform at $9,999. Same caveat applies on track type: confirm with the retailer before purchasing if lower back or hip coverage is your primary concern.`,
    'daiwa-legacy-4': `The Daiwa Legacy 4 is notable for its confirmed 6'6" height accommodation and L-track coverage with 3D roller at $9,500. For buyers who are tall, have lower back and hip pain, and want a premium L-track option, it is worth a close look.`,
    'kyota-genki-m380': `The Kyota Genki M380 earned a Wirecutter Top Pick designation in 2024, which carries weight with buyers who prefer independent editorial validation over brand marketing. Track type is unconfirmed — verify with the retailer before purchasing based on pain location.`,
    'bodyfriend-phantom-medical': `The Bodyfriend Phantom Medical Care 4D SL includes PEMF (pulsed electromagnetic field) therapy in addition to its 4D SL-track roller — a feature found in a small number of chairs at this price tier. If advanced wellness technology is a priority, this is one of the few consumer chairs with PEMF built in.`,
    'bodyfriend-phantom-ii': `The Phantom II brings Bodyfriend's 4D roller and zero gravity to the $8,499 range. Track type is unconfirmed — verify before purchasing if lower back and hip relief is your primary goal.`,
    'bodyfriend-palace-ii': `The Palace II offers a confirmed SL-track with 4D roller and zero gravity at $8,099. The SL-track confirmation is meaningful: it means neck-to-glute coverage is verified, not estimated.`,
    'bodyfriend-falcon-xd': `The Falcon XD 4D is available via Amazon at $8,499. Track type is unconfirmed — we recommend verifying coverage before purchasing based on pain location.`,
    'amamedics-hilux-4d': `The AmaMedics Hilux 4D has one distinctive feature: the rollers themselves are heated, not just the lumbar pad. This is uncommon at $4,999 and creates a noticeably different massage experience — the heat penetrates with the massage rather than sitting adjacent to it. The 4D L-track with 53" track length adds strong lower-body coverage.`,
    'amamedics-renew-3d': `The AmaMedics Renew 3D is a clearance model at $1,299 — worth considering if you want a 3D roller at the lowest possible entry price and understand you are buying end-of-run inventory. Track type is unconfirmed.`,
    'ogawa-master-drive-le': `The Ogawa Master Drive LE 4D has confirmed SL-track coverage, height range of 5'2" to 6'1", and a 320 lb weight capacity. At $9,999 it sits in a competitive range — the SL-track confirmation and Ogawa's engineering reputation make it a reliable option for buyers in that specification range.`,
    'ogawa-master-drive-ai': `The Master Drive AI 2.0 adds Alexa voice control and body scanning to the LE's confirmed SL-track platform. At $12,999, the premium is real — whether the AI and voice features justify it depends on how much you will use them versus the core massage function.`,
    'ogawa-active-xl': `The Ogawa Active XL 3D is specifically confirmed for users from 5'0" to 6'4" with a 320 lb capacity — notably wider sizing than many chairs in this range. The SL-track with 3D roller and two-stage zero gravity make it a solid choice for buyers who prioritize fit range and lower-back coverage.`,
    'inada-robo-4d': `The Inada Robo 4D uses an S-track, which is an important distinction: it covers the neck, shoulders, and upper back well, but does not reach the lower back or hips the way an L-track or SL-track does. For buyers focused on upper-body tension and neck relief, the Inada's 4D precision on that focused path is excellent. For lower back and hip pain, look elsewhere.`,
    'inada-dreamwave': `The Inada DreamWave is a well-regarded Japanese chair from one of the oldest brands in the category. Track and roller specs are unconfirmed in our current data — the brand's reputation and AI scanning feature make it worth researching further before ruling it out.`,
    'jpmedics-kumo-4d': `The JPMedics Kumo 4D is made in Japan and holds a strong reputation in the $8,000–$9,000 range among buyers who have done serious research. The 4D L-track covers the lower back and hips, and the Japanese manufacturing track record speaks to build quality and long-term reliability.`,
    'jpmedics-kaze-duo': `The JPMedics KaZe Duo uses a dual 4D roller mechanism at $12,999. Track type is unconfirmed — verify before purchasing. The dual-roller configuration is for buyers who want maximum coverage density.`,
    'panasonic-mak1': `The Panasonic MAK1 is an S-track chair at $14,499 — the most expensive S-track in the catalog. This is worth saying clearly: if your primary pain is in the lower back or hips, the track configuration will not reach those areas regardless of the price. For buyers focused on neck, shoulder, and upper-back relief who want the most refined S-track experience available, the MAK1's 4D rollers, infrared heat, and Panasonic's engineering depth make it exceptional in that specific context.`,
    'titan-3d-prestige': `The Titan 3D Prestige brings a confirmed SL-track and 3D roller at $4,999 with foot rollers and zero gravity. Titan is a well-established value brand — you are trading some premium finish for solid core specifications at a lower price than equivalent spec chairs from Osaki or Infinity.`,
  }
  return verdicts[chair.id] || `The ${chair.name} offers ${chair.track ? getTrackLabel(chair) : 'massage'} coverage${chair.roller ? ` via a ${chair.roller} roller` : ''} at ${formatPrice(chair)}. For buyers matching the specification profile, it is worth a close look as part of your research.`
}

function faqItems(chair: Chair): Array<{ q: string; a: string }> {
  const items: Array<{ q: string; a: string }> = []

  if (chair.track === 'SL' || chair.track === 'L') {
    items.push({
      q: `Does the ${chair.name} help with sciatica?`,
      a: `${chair.track === 'SL' ? 'SL-track' : 'L-track'} chairs reach the glutes and upper hamstrings, which are the areas most commonly involved in sciatic nerve compression. Many buyers report relief from sciatic flares with regular use. That said, massage chairs are not medical devices — if your symptoms are severe, consult your doctor before relying on a chair as a treatment.`,
    })
  }

  if (chair.track === 'S') {
    items.push({
      q: `Can the ${chair.name} help with lower back pain?`,
      a: `The S-track roller reaches the upper and mid back but does not extend into the lower lumbar, sacral area, or hips. If your lower back pain is in the thoracic or upper lumbar region, an S-track chair can provide some relief. For pain in the lower lumbar, sacrum, or hips, you will need an L-track or SL-track chair.`,
    })
  }

  if (chair.zeroGravity) {
    items.push({
      q: 'What does zero gravity do in a massage chair?',
      a: `Zero gravity recline positions your body so your knees are slightly above your heart, which reduces the load on your spine and allows the massage rollers to make deeper contact along the back. Most buyers find the massage feels more effective in zero gravity than in the upright position. ${chair.zeroGravityStages && chair.zeroGravityStages >= 2 ? 'This chair has ' + chair.zeroGravityStages + '-stage zero gravity, which means it can go deeper into the recline than a single-stage chair.' : ''}`,
    })
  }

  if (chair.spaceSaving) {
    items.push({
      q: 'How close to the wall can this chair sit?',
      a: typeof chair.wallClearanceIn === 'number'
        ? `This chair requires just ${chair.wallClearanceIn}" of clearance between the chair back and the wall when fully reclined. That is the space-saving mechanism working — it reclines forward rather than backward. Most rooms can accommodate this easily.`
        : 'This chair has a space-saving design that reclines forward rather than backward. Check the product spec sheet for the exact wall clearance measurement.',
    })
  }

  items.push({
    q: `Is the ${chair.name} covered by a warranty?`,
    a: `Warranty terms vary by retailer and purchase date. For the most current warranty information, check the product page at the retailer linked above. In general, reputable massage chair brands offer 1–10 year warranties depending on brand and tier, covering structural components separately from soft goods.`,
  })

  return items.slice(0, 4)
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function ChairPage({ params }: { params: { slug: string } }) {
  // Try Strapi (legacy path — kept for forward compatibility)
  let strapiChair: any = null
  try {
    const { getChairBySlug } = await import('@/lib/strapi')
    const res = await getChairBySlug(params.slug)
    strapiChair = res.data?.[0]?.attributes || res.data?.[0]
  } catch {}

  // Fall back to chairs.ts
  const chair = CHAIRS.find(c => c.id === params.slug && c.active && c.mcfActive)
  if (!chair && !strapiChair) notFound()

  // If Strapi has data and chairs.ts does not, use the legacy layout
  if (strapiChair && !chair) {
    const links: any[] = strapiChair.retailerLinks || []
    const availableLinks = links.filter((l: any) => l.isAvailable !== false)
    return (
      <div className="section max-w-5xl">
        <div className="mb-4">
          <Link href="/chairs" className="text-bronze hover:text-gold text-sm">← All chairs</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative h-80 bg-white rounded-lg overflow-hidden border border-sand">
            {strapiChair.imageUrl ? (
              <Image src={strapiChair.imageUrl} alt={strapiChair.name} fill className="object-contain p-6" />
            ) : (
              <div className="flex items-center justify-center h-full text-warm-gray">Photo coming soon</div>
            )}
          </div>
          <div>
            <p className="text-warm-gray text-sm mb-1">{strapiChair.brand}</p>
            <h1 className="text-3xl font-serif font-bold text-navy mb-3">{strapiChair.name}</h1>
            <p className="text-2xl font-semibold text-charcoal mb-6">
              {strapiChair.price ? '$' + strapiChair.price.toLocaleString() : 'Call for price'}
            </p>
            {availableLinks.length > 0 && (
              <div className="space-y-3">
                {availableLinks.map((link: any, i: number) => (
                  <a key={i}
                    href={'/go/' + params.slug + '/' + (link.retailerName?.toLowerCase().replace(/\s+/g, '-') || '')}
                    target="_blank" rel="noopener noreferrer"
                    className={i === 0 ? 'btn-primary block text-center py-3 px-6 rounded font-semibold' : 'block text-center py-3 px-6 rounded font-semibold border border-gold text-gold hover:bg-gold hover:text-white transition-colors'}>
                    Shop at {link.retailerName}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ─── Local chairs.ts rendering ──────────────────────────────────────────────
  const c = chair!
  const trackInfo = trackSummary(c)
  const rollerInfo = rollerSummary(c)
  const features = featuresLine(c)
  const verdict = verdictSummary(c)
  const faqs = faqItems(c)
  const brandSlug = c.brand.toLowerCase().replace(/\s+/g, '-')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: c.name,
    brand: { '@type': 'Brand', name: c.brand },
    description: `${c.name} massage chair${c.track ? ' — ' + getTrackLabel(c) : ''}${c.roller ? ', ' + c.roller + ' roller' : ''}. ${formatPrice(c)}.`,
    offers: {
      '@type': 'Offer',
      price: c.priceMin,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: c.affiliateUrl || 'https://massagechairfinder.com/chairs/' + params.slug,
    },
  }

  const guideLink = (c.track === 'SL' || c.track === 'L' || c.track === 'S')
    ? { href: '/learn/track-types', label: 'Guide: Track Types Explained' }
    : c.roller
    ? { href: '/learn/roller-dimensions', label: 'Guide: 3D vs 4D Rollers' }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="section max-w-5xl">

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-warm-gray flex gap-2">
          <Link href="/chairs" className="hover:text-bronze transition-colors">All chairs</Link>
          <span>/</span>
          <Link href={'/brands/' + brandSlug} className="hover:text-bronze transition-colors">{c.brand}</Link>
          <span>/</span>
          <span className="text-charcoal">{c.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          {/* Image */}
          <div className="relative h-80 bg-white rounded-xl overflow-hidden border border-sand">
            {c.goodwinImageUrl ? (
              <Image src={c.goodwinImageUrl} alt={c.name + ' massage chair'} fill className="object-contain p-6" />
            ) : (
              <div className="flex items-center justify-center h-full text-warm-gray text-sm">Photo coming soon</div>
            )}
          </div>

          {/* Summary panel */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-warm-gray text-sm font-medium mb-1 uppercase tracking-wide">{c.brand}</p>
              <h1 className="text-3xl font-serif font-bold text-navy mb-3">{c.name}</h1>
              <p className="text-2xl font-semibold text-charcoal mb-1">{formatPrice(c)}</p>
              {c.priceEstimated && <p className="text-sm text-warm-gray mb-3">Price is estimated — verify on retailer site</p>}

              {/* Key specs pills */}
              <div className="flex flex-wrap gap-2 my-4">
                {!c.vibrationOnly && c.track && (
                  <span className="bg-navy text-white text-xs font-medium px-3 py-1 rounded-full">{getTrackLabel(c)}</span>
                )}
                {c.roller && (
                  <span className="bg-teal text-white text-xs font-medium px-3 py-1 rounded-full">{c.roller} Roller</span>
                )}
                {c.zeroGravity && (
                  <span className="bg-sand text-charcoal text-xs font-medium px-3 py-1 rounded-full">Zero Gravity</span>
                )}
                {c.spaceSaving && (
                  <span className="bg-sand text-charcoal text-xs font-medium px-3 py-1 rounded-full">Space-Saving</span>
                )}
                {c.madeInUSA && (
                  <span className="bg-terra text-white text-xs font-medium px-3 py-1 rounded-full">Made in USA</span>
                )}
                {c.petiteConfirmed && (
                  <span className="bg-gold text-white text-xs font-medium px-3 py-1 rounded-full">Petite-Confirmed</span>
                )}
                {c.tallConfirmed && (
                  <span className="bg-gold text-white text-xs font-medium px-3 py-1 rounded-full">Tall-Confirmed</span>
                )}
              </div>
            </div>

            {/* CTA */}
            {c.affiliateUrl && (
              <div className="mt-4 space-y-3">
                <a
                  href={'/go/' + params.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block text-center py-3 px-6 rounded font-semibold"
                >
                  Shop This Chair
                </a>
                <p className="text-xs text-warm-gray text-center">
                  Opens at {c.affiliateRetailer || 'retailer site'}. We may earn a commission.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick take */}
        <div className="bg-linen border-l-4 border-gold px-6 py-5 rounded-r-xl mb-12">
          <p className="text-sm font-semibold text-warm-gray uppercase tracking-wide mb-2">Quick take</p>
          <p className="text-charcoal leading-relaxed">{verdict}</p>
        </div>

        {/* Track type section */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-navy mb-3">{trackInfo.heading}</h2>
          <p className="text-charcoal leading-relaxed max-w-2xl">{trackInfo.body}</p>
        </div>

        {/* Roller section */}
        {rollerInfo && (
          <div className="mb-10">
            <h2 className="text-2xl font-serif text-navy mb-3">{rollerInfo.heading}</h2>
            <p className="text-charcoal leading-relaxed max-w-2xl">{rollerInfo.body}</p>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-serif text-navy mb-4">What's included</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-charcoal">
                  <span className="text-teal font-bold">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body fit */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-navy mb-3">Will it fit your body?</h2>
          <p className="text-charcoal leading-relaxed max-w-2xl">{bodyFitSummary(c)}</p>
          {(!c.heightMinIn && !c.heightMaxIn && !c.weightCapacityLbs) && (
            <p className="text-sm text-warm-gray mt-3">
              Not sure if this chair fits? <Link href="/finder" className="text-bronze hover:text-gold">Take our chair finder quiz</Link> — it filters by your height and weight.
            </p>
          )}
        </div>

        {/* Room fit */}
        <div className="mb-10">
          <h2 className="text-2xl font-serif text-navy mb-3">Will it fit your room?</h2>
          <p className="text-charcoal leading-relaxed max-w-2xl">{roomFitSummary(c)}</p>
          <p className="text-sm text-warm-gray mt-3">
            Need help planning your space? See our <Link href="/learn/room-fit" className="text-bronze hover:text-gold">room fit guide</Link>.
          </p>
        </div>

        {/* Spec table */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-navy mb-4">Specs</h2>
          <div className="card overflow-hidden p-0 border border-sand">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Brand', c.brand],
                  ['Track Type', c.track ? getTrackLabel(c) : 'Not confirmed'],
                  ['Roller', c.vibrationOnly ? 'Vibration (no roller)' : c.roller ? c.roller : 'Not confirmed'],
                  ['Track Length', c.trackLengthIn ? c.trackLengthIn + '"' : null],
                  ['Price', formatPrice(c)],
                  ['Zero Gravity', c.zeroGravity ? (c.zeroGravityStages ? c.zeroGravityStages + '-stage' : 'Yes') : c.zeroGravity === false ? 'No' : 'Not confirmed'],
                  ['Heat Therapy', c.heat === true ? 'Yes' : c.heat === false ? 'No' : 'Not confirmed'],
                  ['Foot Rollers', c.foot === true ? 'Yes' : c.foot === false ? 'No' : 'Not confirmed'],
                  ['Calf Compression', c.calf === true ? 'Yes' : c.calf === false ? 'No' : null],
                  ['Stretch Programs', c.stretch === true ? 'Yes' : c.stretch === false ? 'No' : null],
                  ['Body Scanning', c.aiScanning === true ? 'Yes' : null],
                  ['Space-Saving', c.spaceSaving ? (typeof c.wallClearanceIn === 'number' ? 'Yes — ' + c.wallClearanceIn + '" wall clearance' : 'Yes') : 'No'],
                  ['User Height Range', (c.heightMinIn && c.heightMaxIn) ? Math.floor(c.heightMinIn/12)+"'"+c.heightMinIn%12+'" – '+Math.floor(c.heightMaxIn/12)+"'"+c.heightMaxIn%12+'"' : c.heightMaxIn ? 'Up to '+Math.floor(c.heightMaxIn/12)+"'"+c.heightMaxIn%12+'"' : null],
                  ['Weight Capacity', c.weightCapacityLbs ? c.weightCapacityLbs + ' lbs' : null],
                  ['Made in USA', c.madeInUSA === true ? 'Yes' : null],
                  ['White Glove Delivery', c.whiteGlove === true ? 'Included' : null],
                ]
                  .filter(([, v]) => v !== null && v !== undefined)
                  .map(([label, value], i) => (
                    <tr key={String(label)} className={i % 2 === 0 ? 'bg-linen' : 'bg-white'}>
                      <td className="py-3 px-5 font-medium text-charcoal w-2/5">{label}</td>
                      <td className="py-3 px-5 text-warm-gray">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-navy mb-6">Common questions</h2>
            <div className="space-y-5">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-b border-sand pb-5">
                  <p className="font-semibold text-charcoal mb-2">{q}</p>
                  <p className="text-warm-gray leading-relaxed text-sm">{a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal links */}
        <div className="bg-sand rounded-xl p-6 mb-8">
          <p className="font-semibold text-charcoal mb-4">Keep researching</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/finder" className="text-center py-2 px-5 rounded text-sm font-semibold border border-gold text-gold hover:bg-gold hover:text-white transition-colors">
              Find my chair
            </Link>
            <Link href="/learn" className="text-center py-2 px-5 rounded text-sm font-semibold border border-gold text-gold hover:bg-gold hover:text-white transition-colors">
              Buying Guide
            </Link>
            <Link href={'/brands/' + brandSlug} className="text-center py-2 px-5 rounded text-sm font-semibold border border-gold text-gold hover:bg-gold hover:text-white transition-colors">
              All {c.brand} chairs
            </Link>
          </div>
        </div>

        {/* Disclosure */}
        <p className="text-xs text-warm-gray">
          Massage Chair Finder is reader-supported. We may earn a commission if you purchase through links on this page, at no extra cost to you.{' '}
          <Link href="/disclosure" className="underline hover:text-bronze">See our disclosure policy.</Link>
        </p>

      </div>
    </>
  )
}
