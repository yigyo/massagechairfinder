import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/privacy-policy" },
  title: 'Privacy Policy',
  description: 'How Massage Chair Finder collects, uses, and protects your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="section max-w-2xl">
      <h1 className="text-4xl font-serif mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">

        <p>
          This policy explains what information Massage Chair Finder collects when you visit
          the site, what we do with it, and the choices you have.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Information we collect</h2>

        <p>
          When you browse Massage Chair Finder, we collect standard web analytics data
          through Google Analytics: pages viewed, time on site, approximate location,
          device type, and how you arrived at the site. We use this to understand which
          articles are useful and which chairs people are researching.
        </p>

        <p>
          When you submit your email through a form on the site (the chair finder tool,
          the buyer&apos;s guide download, or a newsletter signup), we store that email
          address along with whatever profile information you provided in that form.
          We use it to send the content you requested and ongoing email about massage
          chairs. You can unsubscribe from any email at any time using the link in the
          message.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">AI chat assistant</h2>

        <p>
          This website offers an AI-powered chat assistant named Emily that can answer
          questions about massage chairs, brands, and features. Emily is powered by
          Anthropic&apos;s Claude language model.
        </p>

        <p>
          When you send a message through the chat widget, we collect:
        </p>

        <ul>
          <li>The text of your messages and Emily&apos;s responses</li>
          <li>A randomly generated session identifier that links the turns of a single conversation together</li>
          <li>The approximate time of each message</li>
          <li>Your IP address (used only for rate limiting to prevent abuse)</li>
        </ul>

        <p>
          We do <strong>not</strong> collect your name, email address, phone number, or
          any other identifying information through the chat itself unless you choose
          to share it in the conversation.
        </p>

        <p>
          Chat transcripts are stored for up to 30 days so we can review conversations,
          identify questions Emily handled poorly, and improve her responses. After 30
          days, transcripts are deleted automatically. Only the operator of Massage
          Chair Finder can review chat transcripts. We do not sell, share, or otherwise
          disclose chat content to third parties. Your messages are processed by
          Anthropic&apos;s Claude API to generate Emily&apos;s responses; Anthropic&apos;s
          data handling is governed by their own{' '}
          <a href="https://www.anthropic.com/legal" target="_blank" rel="noopener noreferrer">
            privacy policy and commercial terms
          </a>.
        </p>

        <p>
          Please do not include sensitive personal information in your chat (full credit
          card numbers, account passwords, government ID numbers, detailed medical
          history). If you accidentally share something sensitive, you can request its
          deletion by contacting us at the address below.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Cookies and tracking</h2>

        <p>
          Massage Chair Finder uses cookies to remember your preferences, support form
          submissions, and measure site traffic. We also use Google Analytics, which
          sets its own cookies. You can opt out of Google Analytics tracking with the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics opt-out browser add-on
          </a>.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Affiliate links</h2>

        <p>
          When you click a link to a retailer on this site and make a purchase, we may
          earn a commission. Affiliate links do not influence our recommendations. See
          our <Link href="/disclosure">Affiliate Disclosure</Link> for more detail.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Your choices</h2>

        <p>
          You can stop your chat with Emily at any time by closing the widget. You can
          unsubscribe from any email at any time using the link in the message. If
          you&apos;d prefer not to have your chat history retained, or want a copy of
          the personal information we hold about you, please <Link href="/contact">contact us</Link>.
        </p>

        <h2 className="text-2xl font-serif mt-10 mb-4">Changes to this policy</h2>

        <p>
          We may update this policy from time to time as our practices change. The
          latest version always lives at this URL.
        </p>

      </div>
    </div>
  )
}
