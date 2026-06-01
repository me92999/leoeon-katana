import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  generateBuildId: async () => {
    const { execSync } = require("child_process");
    try {
      return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
    } catch {
      return "unknown";
    }
  },
};

export default withNextIntl(nextConfig);
