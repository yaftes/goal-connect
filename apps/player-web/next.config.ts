import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@goal-connect/ui", "@goal-connect/shared"],
};

export default nextConfig;
