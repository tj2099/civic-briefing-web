import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Google has /sample indexed with stale "CitySmart — Your city council,
  // made readable" snippet from the pre-mockup React page. 301 to / so
  // anyone clicking that search result lands on the live homepage, and
  // Google replaces the /sample entry in its index with /.
  async redirects() {
    return [
      { source: "/sample", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
