import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static01.nyt.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
