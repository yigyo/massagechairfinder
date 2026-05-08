import BuyersGuideForm from "@/components/BuyersGuideForm"

// Warm linen callout box injected at the midpoint of Learning Center articles.
// Renders as a server component; BuyersGuideForm handles client interactivity.

export default function BuyersGuideCallout() {
  return (
    <aside
      className="my-10 rounded-xl px-6 py-7 not-prose"
      style={{ background: "#F5F1EB", border: "1px solid #E8DFD3" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "#934713" }}
      >
        Free Download
      </p>
      <h3
        className="font-serif text-xl mb-1"
        style={{ color: "#1C2331" }}
      >
        Get the Complete Buyer&apos;s Guide
      </h3>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">
        The six decisions that separate a chair you will use every day from one
        you will regret. One PDF, straight to your inbox.
      </p>
      <BuyersGuideForm source="article-callout" />
    </aside>
  )
}
