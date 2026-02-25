import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.88.16"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ebag.bg",
      },
    ],
  },
};

export default nextConfig;
