const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const src = path.join(__dirname, "..", "out", "en");
const dest = path.join(__dirname, "..", "out");

if (fs.existsSync(src)) {
  copyDir(src, dest);
  console.log("Post-build: copied out/en to out/ root");
} else {
  console.log("Post-build: out/en not found, skipping");
}
