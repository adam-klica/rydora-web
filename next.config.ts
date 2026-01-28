import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oyydkivlbjkxzuspwqsk.supabase.co",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "media.rydora.me",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
  poweredByHeader: false,
};

export default nextConfig;
