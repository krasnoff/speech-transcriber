import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin workspace root so Turbopack resolves sources in this monorepo correctly.
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  reactCompiler: true,
};

export default nextConfig;
