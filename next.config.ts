import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/mockup_overhaul.html",
      },
    ];
  },
};

export default nextConfig;
