import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old routes from before the mockup redesign. middleware.ts rewrites / to
  // /mockup_overhaul.html, but /sample and /about still hit their original
  // React pages (now stale). 301 them to / so Google reindexes against the
  // live homepage instead of the months-old sample design.
  async redirects() {
    return [
      { source: "/sample", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
