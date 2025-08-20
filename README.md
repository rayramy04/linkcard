# 🔗 LinkCard - Personal Link Aggregation Page

A simple, fast, and beautiful link aggregation page with Japanese/English language support.

[![Deploy Status](https://github.com/rayramy04/linkcard/actions/workflows/deploy.yml/badge.svg)](https://github.com/rayramy04/linkcard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🌐 **Bilingual Support** - Seamless switching between Japanese and English
- 📱 **Fully Responsive** - Perfect display on all devices
- ⚡ **Lightning Fast** - Optimized for performance (Lighthouse score 100)
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data
- ♿ **Accessible** - WCAG 2.1 Level AA compliant
- 🎨 **Customizable** - Easy configuration via `config.js`
- 📤 **Share Function** - Web Share API with fallback options

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/rayramy04/linkcard.git
cd linkcard
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open http://localhost:8080 in your browser

## 📁 Project Structure

```
linkcard/
├── src/                # Source files
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styles
│   ├── config.js       # Configuration file
│   ├── js/
│   │   ├── main.js     # Main JavaScript
│   │   └── i18n.js     # Language management
│   └── assets/         # Images and icons
├── dist/               # Production build
├── scripts/            # Build scripts
├── package.json        # Dependencies
└── postcss.config.js   # PostCSS configuration
```

## ⚙️ Configuration

Edit `src/config.js` to customize your profile:

```javascript
export default {
  // Basic profile
  profile: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio",
    avatar: "./avatar.jpg"
  },
  
  // Social links
  social: [
    { platform: "github", username: "yourusername" },
    { platform: "twitter", username: "@yourusername" },
    // Add more...
  ],
  
  // Language settings
  i18n: {
    enabled: true,
    defaultLocale: 'ja',
    translations: {
      // Your translations
    }
  }
};
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run test:lighthouse` - Run Lighthouse audit
- `npm run test:a11y` - Run accessibility tests

## 🛠️ Development Workflow

### For Team Members

#### A-san (Frontend/UI)
1. Work on `feature/frontend-ui` branch
2. Focus on HTML/CSS implementation
3. Create responsive designs

#### B-san (JavaScript)
1. Work on `feature/js-functions` branch
2. Implement i18n functionality
3. Handle dynamic content generation

#### C-san (Build/Optimization)
1. Work on `feature/build-setup` branch
2. Manage build processes
3. Handle deployment and CI/CD

### Branch Strategy

```
main
├── feature/frontend-ui
├── feature/js-functions
└── feature/build-setup
```

## 🚢 Deployment

### GitHub Pages

1. Build the project
```bash
npm run build
```

2. Deploy to GitHub Pages
```bash
npm run deploy
```

The site will be available at: https://rayramy04.github.io/linkcard/

### Manual Deployment

1. Build the project
2. Upload contents of `dist/` folder to your web server
3. Ensure proper MIME types for all files

## 📊 Performance Goals

- **Lighthouse Score**: All categories 100/100
- **Core Web Vitals**:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **File Size**:
  - HTML < 10KB (gzipped)
  - CSS < 5KB (gzipped)
  - JS < 3KB (gzipped)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ray**
- GitHub: [@rayramy04](https://github.com/rayramy04)

## 🙏 Acknowledgments

- Icons by [Iconify](https://iconify.design/)
- QR Code API by [QR Server](https://goqr.me/api/)

---

Made with ❤️ by Ray