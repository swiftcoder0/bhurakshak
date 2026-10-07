import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const cesiumSource = path.join(projectRoot, "node_modules", "cesium", "Build", "Cesium");
const cesiumDest = path.join(projectRoot, "public", "cesium");

const foldersToCopy = ["Assets", "ThirdParty", "Widgets", "Workers"];

if (!fs.existsSync(cesiumSource)) {
  console.error("Cesium build directory not found at:", cesiumSource);
  process.exit(1);
}

fs.mkdirSync(cesiumDest, { recursive: true });

for (const folder of foldersToCopy) {
  const src = path.join(cesiumSource, folder);
  const dest = path.join(cesiumDest, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true, force: true });
    console.log(`Copied ${folder} to public/cesium/${folder}`);
  }
}

console.log("Cesium static assets copied successfully.");
