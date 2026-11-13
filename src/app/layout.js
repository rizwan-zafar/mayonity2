import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Ga4 } from "@/components/analytics/Ga4";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { buildOpenGraphImages } from "@/lib/seo-meta";
import { getActiveLocations, getSettings, getSocialLinks, getActiveServices } from "@/lib/data";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

const FALLBACK_TITLE = "Mayonity — Software for What Comes Next";
const FALLBACK_DESCRIPTION =
  "Mayonity is a software development company creating intelligent digital experiences, web applications, mobile products and e-commerce ecosystems.";

export async function generateMetadata() {
  const settings = await getSettings();
  const defaultTitle = settings.seoDefaultTitle?.trim() || FALLBACK_TITLE;
  const defaultDescription = settings.seoDefaultDescription?.trim() || FALLBACK_DESCRIPTION;
  const images = buildOpenGraphImages();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: {
      default: defaultTitle,
      template: "%s · Mayonity",
    },
    description: defaultDescription,
    openGraph: {
      type: "website",
      siteName: settings.siteName?.trim() || "Mayonity",
      title: defaultTitle,
      description: defaultDescription,
      url: siteUrl(),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [images[0].url],
    },
    icons: { icon: "/favicon.svg" },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
  };
}

export const viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const [settings, socials, services, locations] = await Promise.all([
    getSettings(),
    getSocialLinks(),
    getActiveServices(),
    getActiveLocations(),
  ]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Ga4 />
        <JsonLd data={organizationJsonLd(settings, socials)} />
        <JsonLd data={websiteJsonLd(settings)} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] glass rounded-full px-4 py-2"
        >
          Skip to content
        </a>
        <SiteChrome>
          <CustomCursor />
          <Header services={services} />
        </SiteChrome>
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteChrome>
          <Footer settings={settings} socials={socials} services={services} locations={locations} />
        </SiteChrome>
      </body>
    </html>
  );
}
