import path from "path";
import { fileURLToPath } from "url";
import "./src/env.js";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias["~"] = path.resolve(__dirname, "src");
    return webpackConfig;
  },
};

export default config;