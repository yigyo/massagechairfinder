import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/terms" },
  title: "Terms and Conditions",
  description: "The terms that govern your use of Massage Chair Finder, including disclaimers, affiliate relationships, and acceptable use.",
}

export default function TermsPage() {
  return (
    <div className="section max-w-2xl">
      <h1 className="text-4xl font-serif mb-6">Terms and Conditions</h1>
      <div className="prose prose-lg max-w-none">

        <p className="text-warm-gray">Last updated: June 12, 2026</p>

        <p>
          These Terms and Conditions govern your use of Massage Chair Finder (the
          &quot;site&quot;). By visiting the site, using the chair finder tool, chatting with
          our assistant, or submitting a form, you agree to these terms. If you do not
          agree, please do not use the site.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">What this site is</h2>

        <p>
          Massage Chair Finder is a resource that helps people research and
          compare massage chairs. We publish guides, comparisons, and recommendations based
          on published specifications, fit criteria such as track type, roller dimensions,
          weight capacity, and height range, along with price positioning and brand
          reputation for warranty support.
        </p>

        <p>
          Everything on the site is provided for general informational purposes only. It is
          not professional, medical, or financial advice. Massage chairs are wellness
          products, not medical devices. If you have a health condition, are pregnant, are
          recovering from an injury or surgery, or have any concern about whether massage
          therapy is appropriate for you, please consult a qualified healthcare provider
          before purchasing or using a massage chair.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Accuracy of information</h2>

        <p>
          We work to keep specifications, features, and pricing current, but we cannot
          guarantee that every detail is complete or up to date. Product specifications come
          from manufacturers and retailers and can change without notice. Prices and
          availability shown on retailer sites are set by those retailers and are accurate
          only as of the time of your visit to their site. Always confirm the current price,
          specifications, warranty, and return policy directly with the retailer before you
          buy.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Affiliate relationships</h2>

        <p>
          Massage Chair Finder participates in affiliate programs. When you click a link to a
          retailer on this site and make a purchase, we may earn a commission at no
          additional cost to you. Commission rates vary by retailer and do not influence our
          editorial recommendations. For more detail, see our{" "}
          <Link href="/disclosure">Affiliate Disclosure</Link>.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Third-party sites and retailers</h2>

        <p>
          The site links to third-party retailers and resources. We do not operate those
          sites and are not responsible for their content, products, pricing, shipping,
          warranties, returns, or privacy practices. Any purchase you make is a transaction
          between you and that retailer, governed by their terms. Your dealings with any
          third party are solely between you and that party.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">The chair finder tool and chat assistant</h2>

        <p>
          The chair finder tool and our AI chat assistant return suggestions based on the
          information you provide and the data available to us. Their output is informational
          and is not a guarantee that a given chair will fit your body, your space, or your
          needs. Use your own judgment and verify details with the retailer before
          purchasing. Information you share through these tools is handled as described in our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Acceptable use</h2>

        <p>
          You agree to use the site only for lawful purposes. You agree not to copy, scrape,
          harvest, or republish our content for commercial use without permission; not to
          interfere with or disrupt the site or its security features; not to attempt to gain
          unauthorized access to any part of the site or its systems; and not to misuse the
          chair finder tool or chat assistant, including by submitting abusive, automated, or
          deceptive input.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Intellectual property</h2>

        <p>
          The content on this site, including text, guides, comparisons, graphics, and the
          Massage Chair Finder name and logo, is owned by Massage Chair Finder or its
          licensors and is protected by intellectual property law. You may view and share
          links to our pages for personal, non-commercial use. All other use requires our
          prior written permission. Brand names, product names, and trademarks referenced on
          the site belong to their respective owners and are used for identification only.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Submissions</h2>

        <p>
          If you send us a question, suggestion, or other content, you grant us permission to
          use it to operate and improve the site. Please do not send us confidential
          information you do not want us to use.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Disclaimer of warranties</h2>

        <p>
          The site and everything on it are provided on an &quot;as is&quot; and &quot;as
          available&quot; basis, without warranties of any kind, whether express or implied,
          including any implied warranties of merchantability, fitness for a particular
          purpose, and non-infringement. We do not warrant that the site will be
          uninterrupted, error free, or free of harmful components, or that any information
          on it is accurate, complete, or current.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Limitation of liability</h2>

        <p>
          To the fullest extent permitted by law, Massage Chair Finder and its operators will
          not be liable for any indirect, incidental, special, consequential, or punitive
          damages, or for any loss arising out of your use of the site, your reliance on any
          information on it, or any purchase you make from a third-party retailer. Your sole
          remedy if you are dissatisfied with the site is to stop using it.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Changes to these terms</h2>

        <p>
          We may update these terms from time to time as our practices change. The latest
          version always lives at this URL, and the date at the top reflects when it was last
          revised. Your continued use of the site after a change means you accept the updated
          terms.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Governing law</h2>

        <p>
          These terms are governed by the laws of the State of Arizona, without regard to its
          conflict of law rules. Any dispute relating to these terms or your use of the site
          will be handled in the state or federal courts located in Arizona.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Contact</h2>

        <p>
          If you have questions about these terms, please{" "}
          <Link href="/contact">contact us</Link> or email{" "}
          <a href="mailto:support@massagechairfinder.com">support@massagechairfinder.com</a>.
        </p>

      </div>
    </div>
  )
}
