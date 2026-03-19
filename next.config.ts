import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  ...(assetPrefix && { assetPrefix }),
};

export default nextConfig;
