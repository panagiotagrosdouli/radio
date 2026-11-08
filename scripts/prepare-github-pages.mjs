import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist/client");
const assetPaths = ["/assets/", "/favicon.svg", "/manifest.webmanifest", "/radio-live-logo.svg", "/globe.svg", "/file.svg", "/window.svg"];

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    let html = fs.readFileSync(fullPath, "utf8");
    for (const assetPath of assetPaths) {
      html = html.replaceAll(`="${assetPath}`, `="/radio${assetPath}`);
      html = html.replaceAll(`='${assetPath}`, `='/radio${assetPath}`);
    }
    fs.writeFileSync(fullPath, html);
  }
}

visit(root);
