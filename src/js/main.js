import config from '../config.js';
import ShareManager from './share.js';

/**
 * Main application class for the link page
 * Handles rendering of profile, links, and about sections
 */
class LinkPageApp {
  constructor() {
    this.config = config;
  }

  /**
   * Renders user profile section with avatar, name, title, and bio
   */
  renderProfile() {
    const profileEl = document.getElementById('profile');
    if (!profileEl) return;

    const avatarHtml = this.config.profile.avatar 
      ? `<img src="${this.config.profile.avatar}" alt="${this.config.profile.name}">` 
      : '';

    const bioHtml = Array.isArray(this.config.profile.bio)
      ? this.config.profile.bio.map(line => `<p>${line}</p>`).join('')
      : `<p>${this.config.profile.bio}</p>`;

    profileEl.innerHTML = `
      ${avatarHtml}
      <h1>${this.config.profile.name}</h1>
      <p class="title">${this.config.profile.title}</p>
      ${bioHtml}
    `;
  }

  /**
   * Renders social media links with custom icons and brand colors
   */
  renderLinks() {
    const linksEl = document.getElementById('links');
    if (!linksEl) return;

    linksEl.innerHTML = '';
    
    this.config.links.forEach(link => {
      const linkEl = document.createElement('a');
      linkEl.href = link.url;
      linkEl.className = 'link-card';
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
      
      // Apply brand color to icon if specified
      const iconStyle = link.color ? `style="color: ${link.color};"` : '';
      
      linkEl.innerHTML = `
        <div class="icon" ${iconStyle}>
          <span class="iconify" data-icon="${link.icon}"></span>
        </div>
        <div class="content">
          <div class="title">${link.name}</div>
          ${link.description ? `<div class="description">${link.description}</div>` : ''}
        </div>
      `;
      
      linksEl.appendChild(linkEl);
    });
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  /**
   * Renders about section with paragraphs and separator support
   */
  renderAbout() {
    const aboutEl = document.getElementById('about');
    if (!aboutEl || !this.config.about) return;
    
    const paragraphsHtml = this.config.about.paragraphs.map(p => {
      // Convert separator to HR element
      if (p === "━━━") {
        return `<hr>`;
      }
      return `<p>${p}</p>`;
    }).join('');
    
    aboutEl.innerHTML = `
      <h2>${this.config.about.title}</h2>
      ${paragraphsHtml}
    `;
  }

  /**
   * Main initialization - renders all sections and loads dependencies
   */
  initialize() {
    this.renderProfile();
    this.renderLinks();
    this.renderAbout();
    this.loadIconify();
    // Delay ShareManager init to ensure DOM is ready
    setTimeout(() => this.initShareManager(), 100);
  }

  initShareManager() {
    const shareManager = new ShareManager(this.config);
    shareManager.init();
  }

  /**
   * Dynamically loads Iconify library for icon rendering
   */
  loadIconify() {
    if (!document.querySelector('script[src*="iconify"]')) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/3/3.1.1/iconify.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }
}

// Initialize app when ready
const app = new LinkPageApp();
app.init();