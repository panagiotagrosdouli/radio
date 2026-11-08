import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.GITHUB_PAGES === "1"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
};

export default nextConfig;
