import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  devIndicators: false,
  images: {
    formats: ["image/webp"],
    qualities: [85],
    deviceSizes: [360, 480, 640, 828, 1080, 1440, 1920, 2560],
  },
};

export default nextConfig;
