import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/how-we-review" },
  title: "How We Review Massage Chairs",
  description:
    "How Massage Chair Finder selects chairs for its catalog, verifies specifications, and makes fit-based recommendations.",
}

export default function HowWeReviewPage() {
  return (
    <div className="section max-w-2xl">
      <div className="mb-4">
        <Link href="/about" className="text-bronze hover:text-gold text-sm transition-colors">
          &larr; About Us
        </Link>
      </div>

      <h1 className="text-4xl font-serif mb-4">How We Review</h1>
      <p className="text-warm-gray text-sm mb-10">Last reviewed: May 2026</p>

      <div className="prose-style space-y-8">

        <section>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">Independence first</h2>
          <p className="text-charcoal leading-relaxed mb-3">
            No brand has paid to appear in our catalog or to receive a favorable recommendation. No retailer
            has paid to rank higher in our comparisons. Our revenue comes from affiliate commissions,
            which we disclose fully on our{" "}
            <Link href="/disclosure" className="text-bronze hover:text-gold transition-colors">
              disclosure page
            </Link>
            .
          </p>
          <p className="text-charcoal leading-relaxed">
            The affiliate model means we earn a commission when you click a link and make a purchase.
            Commission rates vary by retailer and chair. Our recommendations are based on which chair
            is the strongest fit for the buyer's situation, not on which chair or retailer pays the
            higher rate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">How chairs get into the catalog</h2>
          <p className="text-charcoal leading-relaxed mb-3">
            Every chair in the Massage Chair Finder catalog meets a baseline set of criteria before
            it is listed. The brand must have a documented U.S. presence with accessible support
            and warranty terms. Specification data must be verifiable from at least one primary source:
            manufacturer documentation or a retailer spec page.
          </p>
          <p className="text-charcoal leading-relaxed">
            Chairs are not added because a brand requests inclusion or offers a commission rate.
            We periodically remove chairs from the catalog if they are discontinued, if the brand
            exits the U.S. market, or if we cannot verify current pricing and availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">How we verify specifications</h2>
          <p className="text-charcoal leading-relaxed mb-3">
            Manufacturer specification sheets are not always accurate. Retailers sometimes list
            different dimensions than the manufacturer. Marketing copy often uses terms like
            "up to 6 feet 5 inches" without clarifying whether that means the chair physically
            accommodates that height or simply that a 6-foot-5 buyer can sit in it without their
            head exceeding the headrest.
          </p>
          <p className="text-charcoal leading-relaxed mb-3">
            Our process is to cross-reference specifications across the manufacturer product page,
            at least one major retailer listing, and where available, direct retailer notes from
            showroom or customer service sources. When specifications conflict between sources, we
            note the discrepancy on the chair page rather than picking the more favorable figure.
          </p>
          <p className="text-charcoal leading-relaxed">
            Height and weight capacity fields in our database are marked "confirmed" only when we
            have verified the figure from a primary source. "Not confirmed" means a figure appears
            in marketing materials but has not been independently verified for accuracy at the
            claimed value.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">How we evaluate chairs</h2>
          <p className="text-charcoal leading-relaxed mb-3">
            Every chair is evaluated on the same set of criteria. Track type and roller path
            coverage relative to the buyer's stated pain profile. Roller mechanism (2D, 3D, 4D)
            and what it means in terms of depth and feel. Zero-gravity positioning: whether it is
            present, how many stages, and what benefit it provides. Heat: where it reaches (lumbar
            only vs. calf and foot extension). Foot and calf coverage. Body scanning: whether it
            adjusts the roller start position to the individual. Weight and height accommodation
            with confirmed data. Space requirements, including wall clearance. Warranty terms by
            component type.
          </p>
          <p className="text-charcoal leading-relaxed">
            We do not rank chairs on a single numerical score. Different chairs are right for
            different buyers. The goal of every evaluation is to make clear who the chair is built
            for and what situation it handles well, not to declare one chair superior to all others.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">How "best for" picks are chosen</h2>
          <p className="text-charcoal leading-relaxed mb-3">
            Each "best for" collection page (Best for Lower Back Pain, Best for Tall Buyers, etc.)
            is built around a specific buyer situation. Picks are selected because they represent
            the strongest documented fit for that situation, not because they carry the highest
            margin or the most prominent brand.
          </p>
          <p className="text-charcoal leading-relaxed">
            Within a category, we try to include picks across the relevant price range so a buyer
            is not forced to consider only premium options. If a meaningful distinction exists
            between picks (track type, roller depth, body fit range), we explain it clearly rather
            than listing chairs without context.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">Corrections and updates</h2>
          <p className="text-charcoal leading-relaxed">
            If you find a specification error, a price discrepancy, or a chair that should be added
            or removed from the catalog, we want to know. The catalog is only useful if it is
            accurate.{" "}
            <Link href="/contact" className="text-bronze hover:text-gold transition-colors">
              Contact us
            </Link>{" "}
            with the specific page, the issue, and your source. We review all submissions and
            publish corrections promptly.
          </p>
        </section>

      </div>

      <div className="mt-12 bg-sand rounded-xl p-6">
        <p className="text-charcoal font-medium mb-1">Not sure which chair fits your situation?</p>
        <p className="text-warm-gray text-sm mb-4">
          The chair finder filters by pain profile, body type, and room size simultaneously.
        </p>
        <Link href="/finder" className="btn-primary inline-block">Find My Chair</Link>
      </div>
    </div>
  )
}
