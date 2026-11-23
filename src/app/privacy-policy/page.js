import { PageHero } from "@/components/ui/Section";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Mayonity — how we handle inquiries, cookies and personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" copy="How Mayonity collects, uses and protects information." />
      <article className="prose-mayonity mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <p>Last updated: March 12, 2026</p>
        <h2>Who we are</h2>
        <p>
          Mayonity ({settings.email}) is a software development studio. This policy describes how we handle information submitted through this website.
        </p>
        <h2>What we collect</h2>
        <p>
          Contact forms collect your name, email, phone, company, service interest, budget and message. Newsletter signup collects your email. Admin authentication uses a secure session cookie. We also collect basic usage data about how people use the site, such as pages visited, clicks, scrolling and device type, using Microsoft Clarity.
        </p>
        <h2>How we use it</h2>
        <p>
          Inquiries are stored so we can respond and manage projects. We do not sell personal data. We may use anonymized usage data to improve the site.
        </p>
        <h2>Cookies</h2>
        <p>
          Essential cookies keep administrators signed in. We also use Microsoft Clarity to see how visitors use our site, so we can fix confusing pages. Clarity sets cookies and records anonymous sessions, including mouse movement and clicks. Form fields and text you type are masked and are not recorded. We do not run advertising trackers. You can block cookies in your browser settings. You can read how Microsoft handles this data at https://privacy.microsoft.com/privacystatement
        </p>
        <h2>Retention</h2>
        <p>
          Contact messages and newsletter subscriptions are kept until you ask us to delete them, or until they are no longer needed for the original purpose.
        </p>
        <h2>Your rights</h2>
        <p>
          You may request access, correction or deletion of your information by writing to {settings.email}.
        </p>
      </article>
    </>
  );
}
