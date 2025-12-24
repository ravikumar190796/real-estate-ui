import type { NextConfig } from "next";

// GitHub Pages configuration
// Set NEXT_PUBLIC_BASE_PATH to your GitHub repo name (e.g., "/Realestate")
// Leave empty or "/" if deploying to username.github.io root
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetPrefix = basePath || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
  // Exclude admin routes from static build
  // Admin routes will be handled separately or excluded via build script
  trailingSlash: true,
};

export default nextConfig;
