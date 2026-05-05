import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      // If you use a custom domain, you might need to add it here:
      // allowedOrigins: ["your-custom-domain.com"]
    },
  },
};

export default nextConfig;
