import { PageHero } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { getActiveServices, getSettings, getSocialLinks } from "@/lib/data";
import { JsonLd, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Contact",
  description: "Have an idea from the future? Contact Mayonity to start a project.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [services, settings, socials] = await Promise.all([
    getActiveServices(),
    getSettings(),
    getSocialLinks(),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <JsonLd data={localBusinessJsonLd(settings)} />
      <PageHero
        eyebrow="Contact"
        title="Have an idea from the future? Let's build it."
        copy="Share the brief, the constraint, or the half-formed thought. We will help you turn it into a product."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-[1fr_0.8fr] md:px-8">
        <ContactForm services={services} />
        <aside className="space-y-6">
          <div className="glass rounded-[1.5rem] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Direct</p>
            <a href={`mailto:${settings.email}`} className="mt-3 block text-xl">{settings.email}</a>
            <a href={`tel:${settings.phone}`} className="mt-2 block text-xl">{settings.phone}</a>
            <p className="mt-4 text-muted">{settings.address}</p>
            <p className="mt-2 text-sm text-muted">{settings.businessHours}</p>
          </div>
          <div className="glass rounded-[1.5rem] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Social</p>
            <div className="mt-4 grid gap-2">
              {socials.map((item) => (
                <a key={item.platform} href={item.url} className="text-white hover:text-accent" target="_blank" rel="noreferrer">
                  {item.platform}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
