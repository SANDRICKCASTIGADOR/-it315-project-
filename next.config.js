import path from "path";
import "./src/env.js";

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
