// ─── LOCAL ARTICLE CONTENT ─────────────────────────────────────────────
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

  // ── SECTION 1 ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'track-types',
    title: 'S-Track vs L-Track vs SL-Track: The Most Important Decision You Will Make',
    excerpt: 'The track type determines where the massage goes — and whether it reaches the parts of your body that actually hurt. Most buyers do not know this until after they buy the wrong chair.',
    order: 1,
    publishedAt: '2026-04-27',
    body: `<p>Coming soon.</p>`,
  },

  // ── SECTION 2 ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'roller-dimensions',
    title: 'Roller Dimensions Explained: Width, Stroke, and Why Your Height Matters',
    excerpt: 'Roller width and stroke length are the two specs that determine how well a chair covers your back. Here is what they mean and how to read them.',
    order: 2,
    publishedAt: '2026-04-27',
    body: `<p>Coming soon.</p>`,
  },

  // ── SECTION 3 ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'zero-gravity',
    title: 'Zero Gravity: What It Actually Does and When It Is Worth It',
    excerpt: 'Zero gravity is one of the most marketed features in massage chairs. Here is what the position actually does to your spine, and when it matters enough to be a deciding factor.',
    order: 3,
    publishedAt: '2026-04-27',
    body: `<p>Coming soon.</p>`,
  },

  // ── SECTION 4 ───────────────────────────────────────────────────────────────────────────
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

<p>Track type, roller intensity, and features can all be decided after you have confirmed the chair fits your body. A chair with every feature you want that does not fit correctly is still the wrong chair.</p>`,
  },

  // ── SECTION 5 ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'room-fit',
    title: 'Room Fit: How Much Space a Massage Chair Actually Needs',
    excerpt: 'Space-saving chairs still need space. Here is how to measure your room correctly, what wall clearance actually means, and how to pick a chair that fits before it is delivered.',
    order: 5,
    publishedAt: '2026-04-28',
    body: `<p>Most massage chairs arrive larger than buyers expect. In its upright position, a typical full-size chair runs between 50 and 56 inches long and 28 to 32 inches wide. Those dimensions are manageable for most dedicated rooms. What surprises buyers is the reclined measurement: when a full-size massage chair reaches its zero-gravity position, it extends to between 65 and 76 inches in length. That is over six feet of occupied floor, and it does not include the clearance you need around the chair to get in and out comfortably.</p>

<p>This section is a practical measuring guide. It covers the two numbers that determine whether a chair fits in your space, what wall clearance means and how space-saving technology changes it, and how to verify fit before you commit.</p>

<h2>The two footprint numbers that actually matter</h2>

<p>Every massage chair has two meaningful footprints: the space it occupies when you are sitting upright, and the space it occupies when fully reclined.</p>

<p>Manufacturers typically publish one set of dimensions. That number almost always describes the upright position. It is the smaller, more favorable number, and it will not tell you whether the chair will work in your room once you begin using it.</p>

<p>In the upright position, most full-size massage chairs run between 50 and 56 inches long and 28 to 32 inches wide. These are workable dimensions for a dedicated room. The problem is that when a chair reclines to zero gravity, it extends forward from the base. A chair that is 52 inches long when upright may reach 72 inches when reclined. If the foot of the chair was already close to a wall or a piece of furniture when you sat down, it will hit something when you try to recline.</p>

<p>Before you buy, find the reclined footprint in the product specifications. Not all manufacturers publish it prominently, but it is the number that determines whether the chair will actually work in your space. If you cannot find it listed, contact the retailer and ask for the fully reclined length before ordering.</p>

<h2>Wall clearance: what "space-saving" actually means</h2>

<p>Traditional massage chairs require 12 to 18 inches of clearance between the back of the chair and the wall. As the chair reclines, the backrest swings backward before the leg rest extends forward. If the chair is too close to the wall, the backrest cannot complete that rearward arc and the reclining mechanism stalls.</p>

<p>Space-saving chairs, also called zero-wall or wall-hugger chairs, solve this differently. Instead of swinging backward as they recline, these chairs slide the seat forward on a track. The backrest stays close to the wall while the leg rest extends in front of the user. The mechanical result is that the chair needs only a few inches of clearance from the wall rather than a foot and a half.</p>

<p>Among the chairs in our catalog with confirmed wall clearance measurements, the range is narrow but the distinction matters. Several models require only 2 inches from the wall: the <strong>Osaki OS-Pro Admiral II</strong>, the <strong>Infinity Dynasty 4D</strong>, the <strong>Infinity Evo Max 4D</strong>, and the <strong>Infinity Genesis Max 4D</strong>. The <strong>Kahuna LM-6800</strong> and <strong>Kahuna LM-6800S</strong> require 3 inches. These figures come from manufacturer specifications and describe the minimum clearance the reclining mechanism needs to function correctly.</p>

<p>The practical difference is significant for room planning. A traditional chair positioned 15 inches from the wall uses 15 inches of floor space the chair itself does not occupy. A space-saving chair at 2 inches from the wall reclaims that floor entirely. In a room where every foot matters, this is often the difference between a chair that fits and one that does not.</p>

<h2>How much total floor space does a massage chair need?</h2>

<p>Floor space planning requires more than matching the chair's dimensions to the room's dimensions. A massage chair is not furniture you walk past. You sit in it, stand up from it, and typically move around it. The chair's footprint is the starting point, not the complete picture.</p>

<p>For comfortable use, allow at least 18 inches of clearance on each side of the chair. This gives you room to step in from either side and to exit when the footrest is extended. A chair positioned against a side wall with less clearance than that becomes awkward to get in and out of over time, and in practice, awkward chairs get used less.</p>

<p>A practical planning rule: take the reclined length of the chair you are considering, add 18 inches to each side for lateral clearance, and confirm the front of the reclined footrest does not extend into furniture or a wall. That combined rectangle is the floor area your chair effectively requires.</p>

<p>For a typical mid-range chair with a reclined footprint of 70 inches long by 30 inches wide, this works out to roughly 8 feet by 7.5 feet of dedicated floor space. A 10 by 10 foot room accommodates a massage chair comfortably. A 9 by 9 foot room will work with careful positioning. Rooms smaller than 8 feet in either dimension are worth measuring carefully against the specific chair's published dimensions before purchasing.</p>

<h2>Zero gravity and what it does to the reclined footprint</h2>

<p>Most massage chairs priced above $3,000 include zero-gravity recline. This position tilts the chair so that your knees rise above your heart, redistributing spinal load more evenly. It is one of the most-used features buyers report after purchase, and it affects room planning in a specific way.</p>

<p>Zero-gravity recline extends the chair's footprint more than standard recline. The leg rest rises and extends forward while the backrest drops back. Two-stage zero gravity, which is standard on most mid-range and upper-range chairs, extends the leg rest further than single-stage, producing the longest reclined footprint of any position the chair is capable of reaching.</p>

<p>If you plan to use zero gravity regularly, and most buyers do, the zero-gravity reclined dimensions are the ones worth planning around. Many manufacturers publish only the standard reclined dimensions. When in doubt, ask the retailer for the zero-gravity footprint specifically. The difference between a standard recline and a full zero-gravity position can be 4 to 6 inches of additional length, which is enough to matter in a tight room.</p>

<h2>How to measure your room before you buy</h2>

<p>The most reliable way to verify fit before ordering is to tape the chair's reclined footprint on your floor. This takes less than five minutes and removes guesswork entirely.</p>

<p>Measure the space where you intend to place the chair, accounting for the wall clearance you will need behind it. Mark the chair's reclined length and width on the floor with painter's tape. Then walk around it. Stand at the foot and confirm there is nothing in the path of where the leg rest will extend. Check that each side has at least 18 inches of comfortable clearance. If the taped layout works well, the chair will fit. If it feels tight or awkward with tape on the floor, it will feel tighter with a chair in place.</p>

<p>Also measure your doorways. Most massage chairs are 28 to 32 inches wide. Most interior doorways are 32 to 36 inches wide, which accommodates delivery without difficulty. Narrower doorways, which appear in older homes and tight hallways, are worth measuring against the specific chair's width before scheduling delivery. White-glove delivery services typically assess access before attempting installation, but confirming it yourself in advance avoids any surprises on delivery day.</p>

<h2>Small rooms: what actually works</h2>

<p>The most common question in this category is whether a massage chair can work in a smaller dedicated space: a converted office, a guest room being repurposed, or a bonus room that doubles as something else.</p>

<p>The short answer is yes, with the right chair. A space-saving chair with 2 to 3 inches of wall clearance, positioned in a corner so that two walls bound the back and one side, leaves the remaining two sides open for entry. Corner placement gives up nothing in functionality and recovers significant floor space compared to center-of-room positioning.</p>

<p>If space-saving is a firm requirement for your room, the <a href="/best/small-spaces">best massage chairs for small spaces</a> on our site are filtered specifically for confirmed space-saving specifications. You can also use the <a href="/finder">chair finder quiz</a> to filter by room constraints alongside your other criteria, which keeps the results focused on chairs that will actually fit your situation.</p>

<p>One practical note on room sharing: the room does not have to be used exclusively for the massage chair. Many buyers set up in the corner of a home office or a media room. What matters is that the chair's reclined footprint and entry clearance are not blocked by other furniture. The chair coexists fine with other uses of the space as long as those measurements are respected.</p>

<h2>How to use room fit to narrow your choices</h2>

<p>Room fit is most useful as a filter before you evaluate any other specs. Here is how to apply it in practice.</p>

<p>Start with the space you have. Measure the room and identify where the chair would realistically sit. Note the wall it will back against, the natural entry path, and whether there is room for a side table. The placement that feels right during a walkthrough is almost always the right placement.</p>

<p>Then determine whether space-saving is a requirement. If the intended wall position has 14 or more inches of clearance behind it, most chairs will work. If you have 6 inches or less, you are looking specifically at space-saving chairs. At 2 to 3 inches of clearance, you need a confirmed zero-wall chair with a verified wall clearance spec from the manufacturer, not just a marketing description.</p>

<p>Once room fit is confirmed, move to the other sections of this guide. A chair that fits your room perfectly but does not fit <a href="/learn/body-fit">your body</a> is still the wrong chair. Room fit is a gate, not a recommendation.</p>

<h2>Frequently asked questions</h2>

<h3>Can I put a massage chair against the wall?</h3>
<p>Not with a traditional chair, and not directly against it. Traditional massage chairs need 12 to 18 inches of clearance to recline. Space-saving chairs, also called zero-wall chairs, are specifically engineered to recline with as little as 2 to 3 inches from the wall. If your room requires placement close to a wall, look only at chairs with a confirmed space-saving or zero-wall specification and verify the exact clearance measurement with the retailer before ordering.</p>

<h3>How much space does a zero-gravity chair need when reclined?</h3>
<p>Most full-size chairs with zero-gravity recline extend to between 65 and 76 inches in length when in the zero-gravity position. Two-stage zero gravity typically produces the longest reclined footprint. Take that length, add the wall clearance required behind the chair and at least 18 inches of lateral clearance on each side, and you have the total floor area to plan around.</p>

<h3>What doorway width do I need for delivery?</h3>
<p>Most massage chairs are 28 to 32 inches wide. Standard interior doorways are 32 to 36 inches wide, which accommodates most chairs without difficulty. Measure the narrowest doorway or hallway on the path from your front door to the intended room. If any passageway is under 32 inches, confirm the specific chair's width with the retailer before ordering. White-glove delivery services will typically flag access issues before the delivery date.</p>

<h3>Will a massage chair work in a small apartment?</h3>
<p>A space-saving chair can work in an apartment if the room is at least 8 by 8 feet and you plan placement carefully. Corner positioning helps by using two walls to bound the chair's back and one side, leaving the remaining sides accessible for entry. The <a href="/finder">chair finder</a> on this site allows filtering by space constraints so you can identify chairs that are realistically sized for smaller rooms.</p>

<h3>Do I need to prepare my floor before installation?</h3>
<p>Most massage chairs work on any standard flooring, including hardwood, carpet, laminate, and tile. Thicker carpet can cause slight instability in some chairs during operation. On hard floors, a chair mat is optional but reduces any tendency for the chair to shift. Most white-glove delivery services position and level the chair during setup and will advise you if they notice any flooring issues.</p>`,
  },

]

// ── HELPERS ─────────────────────────────────────────────────────────────────────────────────

/** All articles sorted by display order. */
export const PUBLISHED_ARTICLES = LOCAL_ARTICLES.sort((a, b) => a.order - b.order)

/** Look up a single article by slug. Returns undefined if not found. */
export function getLocalArticle(slug: string): LocalArticle | undefined {
  return LOCAL_ARTICLES.find(a => a.slug === slug)
}
