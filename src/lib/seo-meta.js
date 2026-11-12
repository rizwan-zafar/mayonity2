import { siteUrl } from "@/lib/utils";

export const DEFAULT_OG_IMAGE = "/og-default.png";

export function absoluteImageUrl(value) {
  if (!value) return siteUrl(DEFAULT_OG_IMAGE);
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return siteUrl(value.startsWith("/") ? value : `/${value}`);
}

export function buildOpenGraphImages(imageUrl) {
  const url = absoluteImageUrl(imageUrl);
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: "Mayonity",
    },
  ];
}

export function shareImagesMeta(imageUrl) {
  const images = buildOpenGraphImages(imageUrl);
  return {
    openGraph: { images },
    twitter: { images: [images[0].url] },
  };
}
