import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Property listings upload several full-resolution phone photos at once;
      // the 1MB default is nowhere near enough.
      bodySizeLimit: "30mb",
    },
  },
};

export default nextConfig;
