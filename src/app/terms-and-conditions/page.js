import { PageHero } from "@/components/ui/Section";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Mayonity website and inquiries.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" copy="The rules for using this website and starting work with Mayonity." />
      <article className="prose-mayonity mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <p>Last updated: March 12, 2026</p>
        <h2>Use of the site</h2>
        <p>
          This website is provided by Mayonity to present our work and receive project inquiries. Do not misuse the forms, attempt unauthorized access to the admin area, or copy protected content without permission.
        </p>
        <h2>Inquiries</h2>
        <p>
          Submitting a form is not a contract. Project terms, timelines and fees are agreed separately in writing.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Mayonity retains rights to the website design, writing and original visual system. Client project work is governed by the relevant agreement.
        </p>
        <h2>Limitation</h2>
        <p>
          Information on this site is provided in good faith. We are not liable for decisions made solely on the basis of marketing copy.
        </p>
      </article>
    </>
  );
}
