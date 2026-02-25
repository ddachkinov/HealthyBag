import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.88.16:3000"],
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
