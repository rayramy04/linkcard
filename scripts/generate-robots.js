const fs = require('fs').promises;
const path = require('path');

async function generateRobots() {
  const baseUrl = 'https://rayramy04.github.io/linkcard';
  
  const robots = `# Robots.txt for LinkCard
User-agent: *
Allow: /
Disallow: /scripts/
Disallow: /node_modules/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay (optional, in seconds)
# Crawl-delay: 1`;

  const outputPath = path.join(__dirname, '../dist/robots.txt');
  
  try {
    // Ensure dist directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Write robots.txt
    await fs.writeFile(outputPath, robots, 'utf8');
    console.log('✅ robots.txt generated successfully at dist/robots.txt');
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateRobots();
}

module.exports = generateRobots;