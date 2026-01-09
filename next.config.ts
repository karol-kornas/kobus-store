import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.sklep.pankobus.pl",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
