import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/seo"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  alternates: { canonical: "https://www.massagechairfinder.com/contact" },
  openGraph: pageOpenGraph("https://www.massagechairfinder.com/contact"),
  title: "Contact Us",
  description: "Ask a question about a specific massage chair, suggest a correction, or tell us about a brand you think we should cover.",
}

export default function ContactPage() {
  return <ContactForm />
}
