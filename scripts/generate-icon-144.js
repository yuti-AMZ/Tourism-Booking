// This script generates a 144x144 PNG icon from an existing image using sharp.
// Usage: Run with `node scripts/generate-icons.js` after installing sharp (npm install sharp)

const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, '../public/images/ethio landscape.jpg'); // Source image
const dest = path.join(__dirname, '../public/icons/icon-144x144.png'); // Output icon

sharp(src)
  .resize(144, 144)
  .png()
  .toFile(dest)
  .then(() => {
    console.log('icon-144x144.png generated successfully!');
  })
  .catch(err => {
    console.error('Error generating icon:', err);
  });
