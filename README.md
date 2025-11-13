# LinkCard

English | [日本語](./README.ja.md)

A simple and fast personal link page with Instagram-inspired design.

## Features

- **Instagram-style Gradient** - Pink and orange gradient with polygon mesh pattern
- **Lightning Fast** - Static HTML, lightweight, no frameworks
- **Responsive Design** - Works on mobile and desktop
- **Web Share API** - One-click sharing
- **SNS Brand Colors** - Automatic icon coloring for each service
- **Download Support** - Support for downloadable file cards (PDFs, etc.)
- **Easy Deploy** - Automatic deployment with GitHub Actions
- **Optimized CSS** - Efficient code using CSS variables

## Quick Start

### Requirements
- Node.js 14+ (for development only)
- GitHub account (for GitHub Pages)

### Setup

```bash
# Clone the repository
git clone https://github.com/rayramy04/linkcard.git
cd linkcard

# Install dependencies (for development)
npm install

# Start development server
npm run dev
# Open http://localhost:8080 in your browser
```

## Customization

### Basic Configuration

Edit `src/config.js` to configure your profile and links:

```javascript
export default {
  profile: {
    name: "Your Name",
    title: "Your Title",
    bio: "Brief introduction",
    avatar: "./assets/avatar.jpg"  // Profile image
  },

  links: [
    {
      name: "X (Twitter)",
      url: "https://x.com/username",
      icon: "mdi:twitter",        // Iconify icon
      color: "#1DA1F2",           // Brand color
      description: "Latest updates" // Description (optional)
    },
    {
      name: "GitHub",
      url: "https://github.com/username",
      icon: "mdi:github",
      color: "#333"
    },
    {
      name: "Resume (English)",
      url: "./assets/resume-en.pdf",
      icon: "mdi:download",
      description: "Download my resume in English",
      color: "#FF6B6B",
      type: "download"            // Display as download card
    },
    // Add more links...
  ],

  about: {
    title: "About Me",
    paragraphs: [
      "Detailed introduction here...",
      "━━━",  // Displayed as separator line
      "Additional information..."
    ]
  }
}
```

### Finding Icons

Search on [Iconify](https://icon-sets.iconify.design/) and copy the icon code.

### Style Customization

Adjust design in `src/custom.css`:
- Instagram official colors (`--ig-*` variables)
- Gradient definitions (`--gradient-*` variables)
- Polygon mesh pattern (body::before, body::after)
- Card styles
- Hover effects

## Project Structure

```
linkcard/
├── src/                 # Source files
│   ├── assets/          # Images and files
│   │   ├── avatar.jpg   # Profile image
│   │   ├── favicon.ico  # Favicon
│   │   └── resume-en.pdf # Resume (PDF)
│   ├── js/
│   │   ├── main.js      # Main logic
│   │   └── share.js     # Share functionality
│   ├── config.js        # Configuration file
│   ├── custom.css       # Custom styles
│   └── index.html       # Main HTML
├── docs/                # For GitHub Pages (auto-generated)
├── dist/                # Build output (local verification)
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions auto-deploy
├── package.json         # npm configuration
├── LICENSE             # MIT License
└── README.md           # This file
```

## Sync Template Updates

This template is designed to be forked and kept in sync with upstream updates.

### How It Works

**Your customizations are protected** - When you sync updates:
- You get new template features and bug fixes
- Your config, styles, and assets are never overwritten
- Build files auto-regenerate with new template + your data

**Protected files** (won't be overwritten):
- `src/config.js` - Your profile, links, and about
- `src/custom.css` - Your brand colors and styles
- `src/assets/**` - Your images and files
- `dist/**`, `docs/**` - Generated build outputs

**Synced files** (receives template updates):
- `src/js/**` - Core JavaScript
- `src/index.html` - HTML template
- `.github/workflows/**` - GitHub Actions

### One-Time Setup

After forking, configure the merge strategy:

```bash
git config --local merge.ours.driver true

# Optional: Auto-rebuild after sync
cp .github/hooks/post-merge .git/hooks/post-merge
chmod +x .git/hooks/post-merge
```

### Syncing Template Updates

**Easy way** (recommended):
```bash
./sync-template.sh
```

**Manual way**:
```bash
git remote add template-upstream https://github.com/rayramy04/linkcard.git
git fetch template-upstream
git merge template-upstream/main

# Rebuild (if not using post-merge hook)
npm install  # if package.json changed
npm run build
git add dist/ docs/ && git commit -m "Rebuild after sync" && git push
```

## Deploy (GitHub Pages)

### Automatic Deployment (GitHub Actions)

Push to the main branch and GitHub Actions will automatically build and deploy:

1. Create a repository on GitHub
2. Push your code
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/linkcard.git
git push -u origin main
```
3. GitHub settings:
   - Settings → Pages
   - Source: Select "GitHub Actions"
4. After a few minutes, accessible at `https://yourusername.github.io/linkcard`

### Manual Deployment (Optional)

```bash
# Build locally & deploy (manually push to gh-pages branch)
npm run deploy
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (output to dist folder) |
| `npm run deploy` | Deploy to GitHub Pages |

## Tech Stack

- **Vanilla JavaScript** - Fast without frameworks
- **Simple.css** - Beautiful default styles
- **Iconify** - Rich icon library
- **GitHub Pages** - Free hosting

## License

MIT License - See [LICENSE](./LICENSE) file for details
