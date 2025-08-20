const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const FORMATS = ['webp', 'jpg'];
const SIZES = {
  mobile: 150,
  desktop: 200
};

async function optimizeImages() {
  const srcDir = path.join(__dirname, '../src/assets');
  const distDir = path.join(__dirname, '../dist/assets');

  try {
    // Create dist/assets directory if it doesn't exist
    await fs.mkdir(distDir, { recursive: true });

    // Get all image files from src/assets
    const files = await fs.readdir(srcDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to optimize`);

    for (const file of imageFiles) {
      const inputPath = path.join(srcDir, file);
      const baseName = path.parse(file).name;

      // Process each size
      for (const [sizeName, width] of Object.entries(SIZES)) {
        // Generate WebP version
        const webpOutput = path.join(distDir, `${baseName}-${sizeName}.webp`);
        await sharp(inputPath)
          .resize(width, width, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 85 })
          .toFile(webpOutput);
        console.log(`✓ Created ${baseName}-${sizeName}.webp`);

        // Generate optimized JPEG version
        const jpgOutput = path.join(distDir, `${baseName}-${sizeName}.jpg`);
        await sharp(inputPath)
          .resize(width, width, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ 
            quality: 85,
            progressive: true
          })
          .toFile(jpgOutput);
        console.log(`✓ Created ${baseName}-${sizeName}.jpg`);
      }

      // Also copy original for fallback
      const originalOutput = path.join(distDir, file);
      await sharp(inputPath)
        .jpeg({ 
          quality: 90,
          progressive: true
        })
        .toFile(originalOutput);
      console.log(`✓ Optimized original: ${file}`);
    }

    console.log('✅ Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  optimizeImages();
}

module.exports = optimizeImages;