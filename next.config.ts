import type { NextConfig } from "next";

// GitHub Pages serves this repo from /bitebook, locally it's the root.
const basePath = process.env.GITHUB_ACTIONS ? "/bitebook" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // exposed to the client so raw <img src="/..."> can be prefixed too
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default nextConfig;
