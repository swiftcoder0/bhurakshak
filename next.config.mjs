import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure Cesium static assets (Workers, Assets, Widgets, ThirdParty) are copied to public/cesium for production
const copyCesiumAssets = () => {
  const cesiumSource = path.join(__dirname, "node_modules", "cesium", "Build", "Cesium");
  const cesiumDest = path.join(__dirname, "public", "cesium");

  if (!fs.existsSync(cesiumSource)) {
    return;
  }

  const foldersToCopy = ["Assets", "ThirdParty", "Widgets", "Workers"];
  fs.mkdirSync(cesiumDest, { recursive: true });

  for (const folder of foldersToCopy) {
    const src = path.join(cesiumSource, folder);
    const dest = path.join(cesiumDest, folder);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true, force: true });
    }
  }
};

// Copy assets during build initialization if needed
copyCesiumAssets();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack, isServer }) => {
    // Define CESIUM_BASE_URL compile-time constant so Cesium's internal buildModuleUrl
    // points to /cesium in production bundles instead of trying to resolve via import.meta.url
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("/cesium"),
      })
    );

    return config;
  },
};

export default nextConfig;
