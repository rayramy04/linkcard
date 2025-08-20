// main.js - ��nJavaScriptա��
import config from '../config.js';
import LanguageManager from './i18n.js';
import ShareManager from './share.js';

class LinkPageApp {
  constructor() {
    this.config = config;
    this.languageManager = new LanguageManager(config);
    this.shareManager = new ShareManager(config, this.languageManager);
  }

  // SNS��nURL�
  generateSocialUrl(social) {
    if (social.url) {
      return social.url;
    }
    
    const baseUrl = this.config.platformUrls[social.platform];
    if (!baseUrl) {
      console.warn(`Unknown platform: ${social.platform}`);
      return '#';
    }
    
    // ����K�URL�
    let username = social.username || '';
    
    // @����JdŁk�Xf	
    if (social.platform === 'twitter' || social.platform === 'tiktok') {
      username = username.replace('@', '');
    }
    
    // u/��գï���Reddit(	
    if (social.platform === 'reddit') {
      if (!username.startsWith('u/')) {
        username = 'u/' + username;
      }
    }
    
    return baseUrl + '/' + username;
  }

  // ������
  createIconElement(iconName) {
    const span = document.createElement('span');
    span.className = 'iconify social-icon';
    span.setAttribute('data-icon', iconName);
    return span;
  }

  // ��գ�뻯��������
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

  // SNS�������
  renderSocialLinks() {
    const socialSection = document.getElementById('social-links');
    if (!socialSection) return;

    socialSection.innerHTML = '';

    // SNS��
    this.config.social.forEach(social => {
      const link = document.createElement('a');
      link.href = this.generateSocialUrl(social);
      link.className = 'link-card';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Visit ${social.platform} profile`);
      link.setAttribute('data-platform', social.platform);

      // ������
      const icon = this.createIconElement(this.config.platformIcons[social.platform]);
      link.appendChild(icon);

      // ����թ�����
      const text = document.createElement('span');
      text.className = 'link-text';
      text.textContent = this.getPlatformDisplayName(social.platform);
      link.appendChild(text);

      socialSection.appendChild(link);
    });
  }

  // �����������
  renderCustomLinks() {
    const customSection = document.getElementById('custom-links');
    if (!customSection || !this.config.custom || this.config.custom.length === 0) return;

    customSection.innerHTML = '';

    this.config.custom.forEach(custom => {
      const link = document.createElement('a');
      link.href = custom.url;
      link.className = 'link-card custom-link';
      
      // �����gjD4o�WD��g�O
      if (!custom.url.startsWith('mailto:')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      
      // �������i(
      if (custom.color) {
        link.style.setProperty('--custom-color', custom.color);
      }

      // ������
      if (custom.icon) {
        const icon = this.createIconElement(custom.icon);
        link.appendChild(icon);
      }

      // �������3�����ï	
      const text = document.createElement('span');
      text.className = 'link-text';
      
      // ����n�3���-�
      const translationKey = custom.title.toLowerCase().replace(/\s+/g, '');
      text.setAttribute('data-i18n-custom', translationKey);
      text.textContent = custom.title;
      
      link.appendChild(text);
      customSection.appendChild(link);
    });
  }

  // About Me����������
  renderAboutMe() {
    if (!this.config.about || !this.config.about.enabled) return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    aboutSection.innerHTML = `
      <h2 class="about-title" data-i18n="about.title">${this.config.about.title}</h2>
      <p class="about-content" data-i18n="about.content">${this.config.about.content}</p>
    `;
  }

  // ����թ��nh:�֗
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

  // SEO῿��-�
  setupSEO() {
    // ���뿰���
    document.title = this.config.seo.title;

    // ῿��-�~_o��
    this.setMetaTag('description', this.config.seo.description);
    this.setMetaTag('keywords', this.config.seo.keywords.join(', '));
    this.setMetaTag('author', this.config.profile.name);
    
    // Open Graph��
    this.setMetaTag('og:title', this.config.seo.title, 'property');
    this.setMetaTag('og:description', this.config.seo.description, 'property');
    this.setMetaTag('og:url', this.config.seo.url, 'property');
    this.setMetaTag('og:image', this.config.seo.image, 'property');
    this.setMetaTag('og:type', 'profile', 'property');
    
    // Twitter��ɿ�
    this.setMetaTag('twitter:card', 'summary_large_image');
    this.setMetaTag('twitter:title', this.config.seo.title);
    this.setMetaTag('twitter:description', this.config.seo.description);
    this.setMetaTag('twitter:image', this.config.seo.image);
    this.setMetaTag('twitter:creator', this.config.seo.twitterHandle);

    // canonical��
    this.setLinkTag('canonical', this.config.seo.url);

    // � ���JSON-LD	���
    this.updateStructuredData();
  }

  // ῿��-�
  setMetaTag(name, content, attribute = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  // �󯿰�-�
  setLinkTag(rel, href) {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.href = href;
  }

  // � ������
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

  // CSS	p�-����i(	
  applyTheme() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', this.config.theme.primaryColor);
    root.style.setProperty('--background-color', this.config.theme.backgroundColor);
    root.style.setProperty('--text-color', this.config.theme.textColor);
    root.style.setProperty('--border-radius', this.config.theme.borderRadius);
    root.style.setProperty('--font-family', this.config.theme.fontFamily);
  }

  // �������
  init() {
    // DOMContentLoaded���Ȓ�d
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initialize();
      });
    } else {
      this.initialize();
    }
  }

  // �
  initialize() {
    // SEO�-�
    this.setupSEO();
    
    // ��ޒi(
    this.applyTheme();
    
    // ����������
    this.renderProfile();
    this.renderSocialLinks();
    this.renderCustomLinks();
    this.renderAboutMe();
    
    //  ���
    this.languageManager.init();
    
    // ���_��
    this.shareManager.init();
    
    // Iconify���
    this.loadIconify();
  }

  // Iconify���
  loadIconify() {
    if (!document.querySelector('script[src*="iconify"]')) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/3/3.1.1/iconify.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }
}

// ������󒨯����
export default LinkPageApp;

// �������w�
const app = new LinkPageApp();
app.init();