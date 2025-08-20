const fs = require('fs').promises;
const path = require('path');

async function generateSitemap() {
  const baseUrl = 'https://rayramy04.github.io/linkcard';
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  const outputPath = path.join(__dirname, '../dist/sitemap.xml');
  
  try {
    // Ensure dist directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Write sitemap
    await fs.writeFile(outputPath, sitemap, 'utf8');
    console.log('✅ Sitemap generated successfully at dist/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;