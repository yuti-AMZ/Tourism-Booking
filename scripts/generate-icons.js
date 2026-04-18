// Run with: node scripts/generate-icons.js
// Generates placeholder PWA icons in public/icons/
// Replace with real icons for production

const fs = require("fs");
const path = require("path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const dir = path.join(__dirname, "../public/icons");

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Create a minimal valid 1x1 green PNG as placeholder
// Real PNG header + IHDR + IDAT + IEND for a solid green pixel
const greenPNG = Buffer.from(
  "89504e470d0a1a0a0000000d49484452000000010000000108020000009001" +
  "2e00000000c4944415478016360f8cfc00000000200016e0215400000000049454e44ae426082",
  "hex"
);

sizes.forEach((size) => {
  const file = path.join(dir, `icon-${size}x${size}.png`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, greenPNG);
    console.log(`Created placeholder: icon-${size}x${size}.png`);
  }
});

console.log("\n✅ Placeholder icons created in public/icons/");
console.log("⚠️  Replace with real icons before deploying to production.");
console.log("   Use https://realfavicongenerator.net or https://maskable.app");
