// ─── LOCAL ARTICLE CONTENT ─────────────────────────────────────────────────
//
// Single source of truth for buying guide articles.
// These are served when Strapi is unavailable (or not configured).
//
// TO ADD A NEW ARTICLE:
//   1. Add an entry to LOCAL_ARTICLES below.
//   2. Deploy — the article is live immediately.
//
// Fields mirror the Strapi Article schema so the learn pages need no changes.
//   slug:        URL path  →  /learn/[slug]
//   title:       <h1> and <title> tag
//   excerpt:     shown under the h1; also used as meta description
//   body:        full HTML rendered via dangerouslySetInnerHTML
//   order:       display order on /learn (lower = first)
//   publishedAt: ISO date string
// ─────────────────────────────────────────────────────────────────────────────

export interface LocalArticle {
  slug: string
  title: string
  excerpt: string
  body: string
  order: number
  publishedAt: string
}

export const LOCAL_ARTICLES: LocalArticle[] = [

  // ── SECTION 1 ─────────────────────────────────────────────────────────────
  {
    slug: 'track-types',
    title: 'S-Track vs L-Track vs SL-Track: The Most Important Decision You Will Make',
    excerpt: 'The track type determines where the massage goes — and whether it reaches the parts of your body that actually hurt. Most buyers do not know this until after they buy the wrong chair.',
    order: 1,
    publishedAt: '2026-04-27',
    body: `<p>Coming soon.</p>`,
  },

  // ── SECTION 2 ─────────────────────────────────────────────────────────────
  {
    slug: 'roller-dimensions',
    title: 'Roller Dimensions Explained: Width, Stroke, and Why Your Height Matters',
    excerpt: 'Roller width and stroke length are the two specs that determine how well a chair covers your back. Here is what they mean and how to read them.',
    order: 2,
    publishedAt: '2026-04-27',
    body: `<p>Coming soon.</p>`,
  },

  // ── SECTION 3 ─────────────────────────────────────────────────────────────
  {
    slug: 'zero-gravity',
    title: 'Zero Gravity: What It Actually Does and When It Is Worth It',
    excerpt: 'Zero gravity is one of the most marketed features in massage chairs. Here is what the position actually does to your spine, and when it matters enough to be a deciding factor.',
    order: 3,
    publishedAt: '2026-04-27',
    body: `<p>Coming soon.</p>`,
  },

  // ── SECTION 4 ─────────────────────────────────────────────────────────────
  {
    slug: 'body-fit',
    title: 'How to Size a Massage Chair for Your Body',
    excerpt: 'Most massage chairs are built for a specific range of bodies. Here is how to find out whether a chair will actually fit you, before you spend $4,000 and find out it will not.',
    order: 4,
    publishedAt: '2026-04-27',
    body: `<p>Most massage chair descriptions list a height range somewhere in the specs. Most buyers glance at it, confirm they are vaguely within the numbers, and move on. This is a mistake.</p>

<p>The height spec is not a suggestion. It describes the physical range the chair's roller track was engineered to travel. A buyer who is two inches outside that range does not get a slightly off massage. They get a roller that misses their neck, or one that presses into their lower back at the wrong angle. A chair that fits is transformative. A chair that does not fit gets used twice and then becomes an expensive end table.</p>

<p>This section covers the four dimensions that actually determine fit: height, weight capacity, shoulder width, and body proportions. Most of them are simple once you understand what the spec is actually measuring.</p>

<h2>Height: the most critical dimension, and the most misread one</h2>

<p>When a massage chair lists a height range (say, 5'2" to 6'1"), that range describes the span across which the chair's roller track produces an accurate massage. The rollers travel a fixed path. The body scanning feature (on chairs that have it) adjusts their starting position, but it cannot extend the track itself. If your spine is longer or shorter than what the track was designed for, the massage shifts out of position.</p>

<p>For most buyers in the 5'2" to 6'1" range, the majority of chairs on the market will fit. The catalog reflects this. Most chairs are designed for this range because it covers the bulk of buyers.</p>

<p>Where height becomes a real filter is at both ends of the spectrum.</p>

<h3>Petite buyers: under 5'1"</h3>

<p>This is the most underserved segment in the massage chair market, and the honest answer is that options are limited. Most chairs list a minimum user height of 5'2" or higher. A buyer at 4'11" in a chair designed for 5'2" is sitting with their neck above the top of the roller track. The neck and shoulder massage simply does not reach them.</p>

<p>Among the chairs we have researched, only one is confirmed to fit buyers as short as 5'0": the <strong>Infinity Dynasty 4D</strong>. Infinity specifically engineered this chair with a shorter minimum height, and it is the only chair in our catalog we can recommend for buyers under 5'1" without reservation.</p>

<p>If you are shopping in this height range and the Dynasty 4D is outside your budget or preference, the honest guidance is: before purchasing any other chair, contact the retailer and ask them to confirm the minimum user height for your specific body. Do not rely on the spec sheet alone. Some chairs have more adjustment range than their published specs suggest, and some have less.</p>

<h3>Tall buyers: above 6'2"</h3>

<p>At the other end, tall buyers face a different problem. Most chairs cap their confirmed range around 6'1" or 6'2". A buyer at 6'4" in a chair designed for 6'1" may find that the footrest does not extend far enough, that the headrest hits the back of their head instead of cradling the base of their skull, or that the roller track ends before it reaches their lumbar region.</p>

<p>Several chairs in our catalog are confirmed to accommodate taller buyers:</p>

<ul>
  <li>The <strong>Infinity Imperial Syner-D</strong> (Flex-Track) is confirmed to 6'6".</li>
  <li>The <strong>Daiwa Legacy 4</strong> is confirmed to 6'6".</li>
  <li>The <strong>Luraco i9 Max Plus</strong> is confirmed to 6'10", the tallest confirmed range in the catalog.</li>
</ul>

<p>If you are 6'3" or taller, use these as your starting point and work outward. Do not assume a chair that lists 6'0" as its maximum will accommodate you adequately.</p>

<h2>Weight capacity: what the number actually means</h2>

<p>Most massage chairs list a maximum weight capacity of 265 to 300 pounds. This comes up often enough that buyers sometimes treat it as a massage quality indicator, as if a higher capacity means a better chair. It does not. Weight capacity is a structural engineering specification. It describes the load the chair's frame, motors, and mechanical components were tested to handle safely.</p>

<p>The 300 lb threshold appears frequently because it is a common industry engineering target. Below that threshold, a buyer who exceeds the limit risks accelerated wear on the drive motors and frame joints. The chair may still function but will degrade faster than expected.</p>

<p>For buyers at or near 300 lbs, the distinction between "approximately 300 lbs" and "confirmed 300 lbs" matters. We mark chairs in our catalog as plus-size confirmed only when the manufacturer has explicitly documented 300 lb capacity in their specifications. Several chairs in the catalog that carry this confirmation:</p>

<ul>
  <li><strong>Infinity Dynasty 4D</strong>: confirmed 300 lbs</li>
  <li><strong>Infinity Imperial Syner-D</strong>: confirmed 300 lbs</li>
  <li><strong>Luraco i9 Max Plus</strong>: confirmed 300 lbs</li>
  <li><strong>Kahuna LM-6800S</strong>: confirmed 300 lbs</li>
  <li><strong>Ogawa Master Drive LE and AI 2.0</strong>: confirmed 320 lbs</li>
  <li><strong>Ogawa Active XL 3D</strong>: confirmed 320 lbs (designed specifically for larger frames)</li>
</ul>

<p>One chair in the catalog sits notably lower: the Panasonic MAK1 has a confirmed weight limit of 264 lbs, despite its premium price point. If weight capacity is a constraint, the MAK1 is worth noting as an exception at the high end of the market.</p>

<h2>Shoulder width: the spec almost no one checks</h2>

<p>Shoulder width is the most overlooked fit dimension, and it is the one most likely to create discomfort on first use.</p>

<p>Most massage chairs have a seat width of 18 to 21 inches. The shoulder airbags are positioned to apply compression inward from the sides of the seat back. For a buyer with a narrower frame, wide-set airbags may squeeze at angles that feel wrong. For a broader-shouldered buyer, tight shoulder compartments may not make full contact, reducing compression effectiveness.</p>

<p>The <strong>Ogawa Active XL 3D</strong> is specifically engineered for broader frames, with a seat four inches wider than Ogawa's standard models and its shoulder width is 23 inches, compared to the typical 18 to 19 inches. If you are broad through the shoulders or have a larger build generally, the Active XL was designed with your proportions in mind.</p>

<p>For most buyers, shoulder width does not require active research. But if you have had the experience of feeling compressed or constrained in a chair during a store demo, shoulder width is likely the cause, and it is worth checking the spec before purchasing.</p>

<h2>Body proportions: when the numbers do not tell the whole story</h2>

<p>Height and weight are the specs manufacturers publish, but bodies do not follow a single proportion at any given height. Two people who are 5'9" and 190 lbs may have completely different leg-to-torso ratios, shoulder widths, and hip dimensions. The massage chair industry has not yet solved for this variability, which is why in-home trials matter.</p>

<p>The most common proportion-related fit issue is leg length. Most massage chairs include an automatic or manual footrest extension to adjust for leg length. Buyers with longer legs relative to their height benefit from chairs with a wider extension range. Buyers with shorter legs may find that even at minimum extension, the footrest angle puts pressure on the wrong part of the calf.</p>

<p>A few practical notes on proportions:</p>

<p>If you have lower back pain that radiates into your hips and glutes, body fit interacts with track type in a specific way. An SL-track chair (which extends the roller path under the glutes) needs to be long enough to actually reach your gluteus muscles. A buyer who is 5'3" with a compact torso may find that an SL-track chair reaches their glutes fine. A buyer who is 5'11" with a long torso may find the same chair's roller track ends at their lower lumbar. If glute massage is part of what you need, confirm the track length in inches before purchasing.</p>

<p>If you have a medical condition that affects your spine (scoliosis, significant kyphosis, prior spinal surgery), body fit in the conventional sense does not fully apply to you. Roller pressure at unexpected angles can aggravate rather than relieve these conditions. Consult with a physical therapist or physician before using a massage chair, and prioritize chairs with gentler 2D or 3D roller mechanisms over 4D chairs with high-intensity pressure.</p>

<h2>How to use body fit to narrow your shortlist</h2>

<p>Body fit is a filter, not a recommendation. Here is how to apply it:</p>

<p>Start with height. If you are between 5'2" and 6'1", most chairs will fit and you can set this spec aside. If you are outside that range, either shorter or taller, height becomes your primary filter before any other consideration. Price, track type, and features are all secondary to the question of whether the chair can physically reach your spine correctly.</p>

<p>Apply weight capacity next, but only if it is a real constraint for you. If you are comfortably below 265 lbs, this spec is not a limiting factor. If you are at or above 265 lbs, look specifically for chairs with confirmed ratings at 300 lbs or higher and confirm directly with the retailer before purchasing.</p>

<p>Consider shoulder width if you have had fit issues before, or if you are broadly built. The Ogawa Active XL is the only chair in our catalog specifically engineered for this. Most other chairs assume a standard frame.</p>

<p>Track type, roller intensity, and features can all be decided after you have confirmed the chair fits your body. A chair with every feature you want that does not fit correctly is still the wrong chair.</p>
                 `,
  },

  // ── SECTION 5 ─────────────────────────────────────────────────────────────
  {
    slug: 'room-fit',
    title: 'Room Fit: How Much Space a Massage Chair Actually Needs',
    excerpt: 'Space-saving chairs still need space. Here is how to measure your room correctly, what wall clearance actually means, and how to pick a chair that fits before it is delivered.',
    order: 5,
    publishedAt: '2026-04-28',
    body: `<p>Most massage chairs arrive larger than buyers expect. In its upright position, a typical full-size chair runs between 50 and 56 inches long and 28 to 32 inches wide. Those dimensions are manageable for most dedicated rooms. What surprises buyers is the reclined measurement: when a full-size massage chair reaches its zero-gravity position, it extends to between 65 and 76 inches in length. That is over six feet of occupied floor, and it does not include the clearance you need around the chair to get in and out comfortably.</p>

<p>This section is a practical measuring guide