import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/services/suggestions-solutions",
        destination: "/services/it-consulting",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
