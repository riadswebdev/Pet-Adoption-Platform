import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "archanababu.epizy.com",
      },
    ],
  },
  transpilePackages: [
    "@heroui/react",
    "@heroui/theme",
    "react-aria-components",
  ],
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  turbopack: {
    root: path.resolve("./"),
  },
};

export default nextConfig;
