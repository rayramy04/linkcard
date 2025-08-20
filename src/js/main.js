// main.js - á¤ónJavaScriptÕ¡¤ë
import config from '../config.js';
import LanguageManager from './i18n.js';
import ShareManager from './share.js';

class LinkPageApp {
  constructor() {
    this.config = config;
    this.languageManager = new LanguageManager(config);
    this.shareManager = new ShareManager(config, this.languageManager);
  }

  // SNSêó¯nURL’
  generateSocialUrl(social) {
    if (social.url) {
      return social.url;
    }
    
    const baseUrl = this.config.platformUrls[social.platform];
    if (!baseUrl) {
      console.warn(`Unknown platform: ${social.platform}`);
      return '#';
    }
    
    // æü¶üK‰URL’
    let username = social.username || '';
    
    // @Şü¯’JdÅkÜXf	
    if (social.platform === 'twitter' || social.platform === 'tiktok') {
      username = username.replace('@', '');
    }
    
    // u/×ìÕ£Ã¯¹’æReddit(	
    if (social.platform === 'reddit') {
      if (!username.startsWith('u/')) {
        username = 'u/' + username;
      }
    }
    
    return baseUrl + '/' + username;
  }

  // ¢¤³ó¹Ñó’
  createIconElement(iconName) {
    const span = document.createElement('span');
    span.className = 'iconify social-icon';
    span.setAttribute('data-icon', iconName);
    return span;
  }

  // ×íÕ£üë»¯·çó’ìóÀêó°
  renderProfile() {
    const profileSection = document.getElementById('profile');
    if (!profileSection) return;

    const avatarHtml = this.config.profile.avatar ? 
      `<img src="${this.config.profile.avatar}" alt="${this.config.profile.name}" class="profile-avatar">` : '';

    profileSection.innerHTML = `
      ${avatarHtml}
      <h1 class="profile-name">${this.config.profile.name}</h1>
      <p class="profile-title" data-i18n="profile.title">${this.config.profile.title}</p>
      <p class="profile-bio" data-i18n="profile.bio">${this.config.profile.bio}</p>
    `;
  }

  // SNSêó¯’ìóÀêó°
  renderSocialLinks() {
    const socialSection = document.getElementById('social-links');
    if (!socialSection) return;

    socialSection.innerHTML = '';

    // SNSêó¯’
    this.config.social.forEach(social => {
      const link = document.createElement('a');
      link.href = this.generateSocialUrl(social);
      link.className = 'link-card';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Visit ${social.platform} profile`);
      link.setAttribute('data-platform', social.platform);

      // ¢¤³ó’ı 
      const icon = this.createIconElement(this.config.platformIcons[social.platform]);
      link.appendChild(icon);

      // ×éÃÈÕ©üà’ı 
      const text = document.createElement('span');
      text.className = 'link-text';
      text.textContent = this.getPlatformDisplayName(social.platform);
      link.appendChild(text);

      socialSection.appendChild(link);
    });
  }

  // «¹¿àêó¯’ìóÀêó°
  renderCustomLinks() {
    const customSection = document.getElementById('custom-links');
    if (!customSection || !this.config.custom || this.config.custom.length === 0) return;

    customSection.innerHTML = '';

    this.config.custom.forEach(custom => {
      const link = document.createElement('a');
      link.href = custom.url;
      link.className = 'link-card custom-link';
      
      // áüëêó¯gjD4o°WD¿Ög‹O
      if (!custom.url.startsWith('mailto:')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      
      // «¹¿à«éü’i(
      if (custom.color) {
        link.style.setProperty('--custom-color', custom.color);
      }

      // ¢¤³ó’ı 
      if (custom.icon) {
        const icon = this.createIconElement(custom.icon);
        link.appendChild(icon);
      }

      // ¿¤Èë’ı û3­ü’Á§Ã¯	
      const text = document.createElement('span');
      text.className = 'link-text';
      
      // ¿¤Èënû3­ü’-š
      const translationKey = custom.title.toLowerCase().replace(/\s+/g, '');
      text.setAttribute('data-i18n-custom', translationKey);
      text.textContent = custom.title;
      
      link.appendChild(text);
      customSection.appendChild(link);
    });
  }

  // About Me»¯·çó’ìóÀêó°
  renderAboutMe() {
    if (!this.config.about || !this.config.about.enabled) return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    aboutSection.innerHTML = `
      <h2 class="about-title" data-i18n="about.title">${this.config.about.title}</h2>
      <p class="about-content" data-i18n="about.content">${this.config.about.content}</p>
    `;
  }

  // ×éÃÈÕ©üành:’Ö—
  getPlatformDisplayName(platform) {
    const displayNames = {
      github: 'GitHub',
      twitter: 'X (Twitter)',
      instagram: 'Instagram',
      facebook: 'Facebook',
      youtube: 'YouTube',
      tiktok: 'TikTok',
      twitch: 'Twitch',
      discord: 'Discord',
      reddit: 'Reddit',
      linkedin: 'LinkedIn',
      qiita: 'Qiita',
      zenn: 'Zenn',
      note: 'note',
      line: 'LINE'
    };
    
    return displayNames[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
  }

  // SEOá¿¿°’-š
  setupSEO() {
    // ¿¤Èë¿°’ô°
    document.title = this.config.seo.title;

    // á¿¿°’-š~_oô°
    this.setMetaTag('description', this.config.seo.description);
    this.setMetaTag('keywords', this.config.seo.keywords.join(', '));
    this.setMetaTag('author', this.config.profile.name);
    
    // Open Graph¿°
    this.setMetaTag('og:title', this.config.seo.title, 'property');
    this.setMetaTag('og:description', this.config.seo.description, 'property');
    this.setMetaTag('og:url', this.config.seo.url, 'property');
    this.setMetaTag('og:image', this.config.seo.image, 'property');
    this.setMetaTag('og:type', 'profile', 'property');
    
    // Twitter«üÉ¿°
    this.setMetaTag('twitter:card', 'summary_large_image');
    this.setMetaTag('twitter:title', this.config.seo.title);
    this.setMetaTag('twitter:description', this.config.seo.description);
    this.setMetaTag('twitter:image', this.config.seo.image);
    this.setMetaTag('twitter:creator', this.config.seo.twitterHandle);

    // canonicalêó¯
    this.setLinkTag('canonical', this.config.seo.url);

    // Ë Çü¿JSON-LD	’ô°
    this.updateStructuredData();
  }

  // á¿¿°’-š
  setMetaTag(name, content, attribute = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  // êó¯¿°’-š
  setLinkTag(rel, href) {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = href;
  }

  // Ë Çü¿’ô°
  updateStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": this.config.profile.name,
      "url": this.config.seo.url,
      "image": this.config.profile.avatar,
      "jobTitle": this.config.profile.title,
      "description": this.config.profile.bio,
      "email": this.config.profile.email,
      "sameAs": this.config.social.map(social => this.generateSocialUrl(social))
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.textContent = JSON.stringify(structuredData, null, 2);
    }
  }

  // CSS	p’-šÆüŞi(	
  applyTheme() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', this.config.theme.primaryColor);
    root.style.setProperty('--background-color', this.config.theme.backgroundColor);
    root.style.setProperty('--text-color', this.config.theme.textColor);
    root.style.setProperty('--border-radius', this.config.theme.borderRadius);
    root.style.setProperty('--font-family', this.config.theme.fontFamily);
  }

  // ¢×ê±ü·çó’
  init() {
    // DOMContentLoaded¤ÙóÈ’…d
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initialize();
      });
    } else {
      this.initialize();
    }
  }

  // æ
  initialize() {
    // SEO’-š
    this.setupSEO();
    
    // ÆüŞ’i(
    this.applyTheme();
    
    // »¯·çó’ìóÀêó°
    this.renderProfile();
    this.renderSocialLinks();
    this.renderCustomLinks();
    this.renderAboutMe();
    
    //  ¡’
    this.languageManager.init();
    
    // ·§¢_ı’
    this.shareManager.init();
    
    // Iconify’­¼
    this.loadIconify();
  }

  // Iconify’­¼
  loadIconify() {
    if (!document.querySelector('script[src*="iconify"]')) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/3/3.1.1/iconify.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }
}

// ¢×ê±ü·çó’¨¯¹İüÈ
export default LinkPageApp;

// ¢×ê±ü·çó’wÕ
const app = new LinkPageApp();
app.init();