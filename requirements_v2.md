# 📋 リンクまとめページ 詳細要件定義書（改訂版 v2）

## 1. プロジェクト概要

### 目的
- 個人のSNSリンクを一元管理するシンプルで高速なリンクまとめページ
- GitHub Pagesでホスティング可能な静的サイト
- エンジニアリングスキルを示すポートフォリオ作品
- **SEO最適化により検索エンジンでの発見性を高める**

### 基本方針
- **パフォーマンス優先**: Lighthouse スコア 100点を目標
- **SEO最適化**: 検索エンジンでの上位表示を狙う
- **完全レスポンシブ**: モバイル〜デスクトップまで最適表示
- **シェア機能**: プロフィールを簡単に共有可能
- **アクセシビリティ**: WCAG 2.1 Level AA準拠

## 2. 技術スタック

### 必須技術
- **HTML5**: セマンティックマークアップ（SEO対策）
- **CSS3**: モダンCSS（Grid, Flexbox, CSS Variables）
- **JavaScript**: ES6+ (ビルドツール用)
- **Node.js**: ビルドプロセス用

### 外部リソース
- **アイコン**: [Iconify](https://iconify.design/) (CDN)
- **シェア機能**: [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) + フォールバック用の自前実装
- **フォント**: システムフォント（高速化優先）

### ビルドツール
- **HTML最適化**: html-minifier
- **CSS最適化**: PostCSS (Autoprefixer, CSSnano)
- **JS最適化**: Terser
- **画像最適化**: Sharp (WebP変換)

## 3. UI/UX要件（改訂）

### 3.1 言語切り替えボタン（新規追加）
**実装方式：**
- ページ右上に言語切り替えボタンを配置
- 「日本語/EN」のシンプルなトグルボタン
- LocalStorageで言語設定を保存
- ページリロード不要のスムーズな切り替え

```css
/* 言語切り替えボタンのスタイル */
.language-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  z-index: 100;
}

.language-toggle:hover {
  background: var(--primary);
  color: white;
}
```

### 3.2 ダークモード対応について
**→ 実装しない理由：**
- シンプルさを優先
- ページ滞在時間が短い（リンク集のため）
- パフォーマンスへの影響を最小化
- 代わりに**読みやすい中間色のデザイン**を採用

### 3.3 レスポンシブ設計
```css
/* ブレークポイント */
- Mobile: 320px〜767px
- Tablet: 768px〜1023px  
- Desktop: 1024px〜

/* コンテナ幅 */
- Mobile: 90% (最大400px)
- Tablet: 80% (最大600px)
- Desktop: 固定600px
```

### 3.4 アクセシビリティ要件（新規追加）
```javascript
accessibility: {
  skipToContent: true,        // スキップリンク
  altTexts: true,             // 画像の代替テキスト
  ariaLabels: true,           // ARIAラベル
  keyboardNavigation: true,   // キーボード操作対応
  reducedMotion: true,        // アニメーション削減
  colorContrast: "AAA",       // WCAG AAA準拠のコントラスト比
  focusIndicators: true       // フォーカス表示
}
```

### 3.5 マイクロインタラクション
```css
/* リンクホバー時の軽微なアニメーション */
.link-button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.link-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* フォーカス時のスタイル */
.link-button:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}
```

### 3.6 シェア機能の実装

#### **位置とデザイン**
- プロフィール画像の右上に小さなシェアボタン
- または名前の横にシェアアイコン

#### **実装方法**

**⭐️ メイン実装: Web Share API（最推奨）**
```javascript
// モバイルで最高のUX、外部ライブラリ不要
const shareButton = document.getElementById('share');
shareButton.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Ray - Links',
        text: 'Check out my social links!',
        url: window.location.href
      });
    } catch(err) {
      // ユーザーがキャンセルした場合
      console.log('シェアがキャンセルされました');
    }
  } else {
    // PC用フォールバック（下記参照）
    showFallbackOptions();
  }
});
```

**Web Share APIのメリット:**
- ✅ ユーザーが普段使っているアプリ（LINE、Twitter、Instagram等）が自動で表示
- ✅ OS標準のシェアシートでユーザーが慣れた操作
- ✅ 実装が数行で完了、メンテナンス不要
- ✅ 外部ライブラリ不要で高速・軽量

**対応環境:**
- モバイル: iOS Safari、Android Chrome（ほぼ100%対応）
- デスクトップ: Safari、Edge（対応）、Chrome、Firefox（未対応）

**PC用フォールバック実装:**
```javascript
// PC環境（Chrome/Firefox）用のシンプルなフォールバック
function showFallbackOptions() {
  // URLコピー機能のみ提供（最もシンプル）
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      showToast('リンクをコピーしました！');
    });
  
  // または必要最小限のSNSボタンを表示（オプション）
  // const fallbackModal = document.getElementById('fallback-share');
  // fallbackModal.classList.add('show');
}
```

**補足: QRコード（オプション）**
```javascript
// 必要な場合のみ実装
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;
```

## 4. SEO最適化要件（詳細）

### 4.1 メタタグ設定
```html
<!-- 基本メタタグ -->
<meta name="description" content="Connect with Ray - Computer Science student from Japan. Find all my social media links and projects in one place.">
<meta name="keywords" content="Ray, Computer Science, Data Science, Malaysia, Japan, Portfolio, Social Links">
<meta name="author" content="Ray">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://yourusername.github.io/link-page/">

<!-- セキュリティヘッダー -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="no-referrer-when-downgrade">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Ray - Social Links">
<meta property="og:description" content="Computer Science and Data Science student. Connect with me on social media.">
<meta property="og:image" content="https://yourusername.github.io/link-page/og-image.jpg">
<meta property="og:url" content="https://yourusername.github.io/link-page/">
<meta property="og:type" content="profile">
<meta property="profile:first_name" content="Ray">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Ray - Social Links">
<meta name="twitter:description" content="Computer Science and Data Science student. Find all my links here.">
<meta name="twitter:image" content="https://yourusername.github.io/link-page/twitter-card.jpg">
<meta name="twitter:creator" content="@ray_example">
```

### 4.2 構造化データ (JSON-LD)
```javascript
// config.jsに追加
seo: {
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ray",
    "url": "https://yourusername.github.io/link-page/",
    "image": "avatar.jpg",
    "jobTitle": "Computer Science Student",
    "description": "University student studying Computer Science and Data Science",
    "sameAs": [
      "https://twitter.com/ray_example",
      "https://instagram.com/ray_example",
      "https://github.com/ray-example"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University Name"
    }
  }
}
```

### 4.3 パフォーマンスSEO
- **Core Web Vitals最適化**
  - LCP (Largest Contentful Paint) < 2.5秒
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

### 4.4 追加SEO施策
```javascript
// config.js SEO設定
seo: {
  // サイトマップ自動生成
  generateSitemap: true,
  
  // robots.txt設定
  robots: {
    allow: ['/'],
    disallow: [],
    sitemap: 'https://yourusername.github.io/link-page/sitemap.xml'
  },
  
  // 多言語対応（オプション）
  alternateLanguages: [
    { lang: 'en', url: '/en/' },
    { lang: 'ja', url: '/ja/' }
  ]
}
```

## 5. パフォーマンス最適化（新規追加）

### 5.1 Critical CSS のインライン化
```html
<!-- HTMLヘッダーに追加 -->
<style>
  /* Critical CSS - Above the fold content */
  :root { --primary: #6B46C1; }
  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
  .container { width: 90%; max-width: 400px; margin: 0 auto; }
  .profile { text-align: center; padding: 2rem 0; }
  /* 残りは非同期読み込み */
</style>
<link rel="preload" href="styles.css" as="style">
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

### 5.2 画像最適化戦略
```javascript
// config.jsに追加
images: {
  formats: ['webp', 'jpg'],  // 複数フォーマット対応
  sizes: {
    mobile: '150x150',
    desktop: '200x200'
  },
  lazyLoad: false,           // アバターは即座に表示
  optimization: {
    quality: 85,             // 画質設定
    progressive: true        // プログレッシブJPEG
  }
}
```

### 5.3 リソースヒント
```html
<!-- DNS プリフェッチ -->
<link rel="dns-prefetch" href="https://api.iconify.design">
<link rel="dns-prefetch" href="https://api.qrserver.com">

<!-- プリコネクト -->
<link rel="preconnect" href="https://api.iconify.design" crossorigin>

<!-- プリロード -->
<link rel="preload" href="/avatar.webp" as="image" type="image/webp">
```

## 6. 更新されたconfig.js構造

### 6.1 サポートSNSプラットフォーム一覧

**テンプレート対応SNS（アイコン自動設定）:**
- **開発・技術系**: GitHub, Qiita, Zenn
- **動画・メディア系**: YouTube, TikTok, Twitch
- **ソーシャルメディア**: X(Twitter), Instagram, Facebook, LinkedIn
- **コミュニティ・フォーラム**: Discord, Reddit
- **メッセージング・コミュニケーション**: LINE公式アカウント
- **ブログ・記事投稿**: note

**カスタムリンク用途:**
- ホームページ/ポートフォリオ
- メール（お問い合わせ）
- その他の独自URL

## 7. config.js設定例

```javascript
// config.js
export default {
  // 基本プロフィール
  profile: {
    name: "Ray",
    title: "University Student",
    bio: "Computer Science and Data Science student from Japan, studying in Malaysia",
    avatar: "./avatar.jpg",
    email: "ray@example.com"
  },

  // SNSリンク（テンプレート対応）
  social: [
    // 開発・技術系
    { platform: "github", username: "ray-example" },
    { platform: "qiita", username: "ray_example" },
    { platform: "zenn", username: "ray_example" },
    
    // 動画・メディア系
    { platform: "youtube", url: "https://youtube.com/@ray" },
    { platform: "tiktok", username: "@ray_example" },
    { platform: "twitch", username: "ray_example" },
    
    // ソーシャルメディア
    { platform: "twitter", username: "@ray_example" },  // X(Twitter)
    { platform: "instagram", username: "ray_example" },
    { platform: "facebook", username: "ray.example" },
    { platform: "linkedin", url: "https://linkedin.com/in/ray-example" },
    
    // コミュニティ・フォーラム
    { platform: "discord", url: "https://discord.gg/example" },
    { platform: "reddit", username: "u/ray_example" },
    
    // メッセージング・コミュニケーション
    { platform: "line", url: "https://line.me/ti/p/example" },  // LINE公式アカウント
    
    // ブログ・記事投稿
    { platform: "note", url: "https://note.com/ray_example" }
  ],

  // カスタムリンク（上記以外のURL）
  custom: [
    {
      title: "ホームページ",
      url: "https://example.com",
      icon: "mdi:web",
      color: "#6B46C1"
    },
    {
      title: "メール",
      url: "mailto:ray@example.com",
      icon: "mdi:email",
      color: "#059669"
    }
  ],

  // About Me
  about: {
    enabled: true,
    title: "About Me",
    content: "..."
  },

  // SEO設定
  seo: {
    title: "Ray - Links | Computer Science Student",
    description: "Connect with Ray - Computer Science and Data Science student from Japan studying in Malaysia. Find all social media links and projects.",
    keywords: ["Computer Science", "Data Science", "Malaysia", "Japan", "Student", "Portfolio"],
    url: "https://yourusername.github.io/link-page/",
    image: "./og-image.jpg", // 1200x630px推奨
    twitterHandle: "@ray_example",
    generateSitemap: true,
    structuredData: true // 自動生成
  },

  // シェア設定
  share: {
    enabled: true,
    text: "Check out my profile and connect with me!",
    position: "header", // "header" or "floating"
    channels: ["native", "twitter", "facebook", "linkedin", "qr", "copy"]
  },

  // アクセシビリティ設定（新規）
  accessibility: {
    skipToContent: true,
    altTexts: true,
    ariaLabels: true,
    keyboardNavigation: true,
    reducedMotion: true,
    colorContrast: "AAA",
    focusIndicators: true
  },

  // 画像最適化設定（新規）
  images: {
    formats: ['webp', 'jpg'],
    sizes: {
      mobile: '150x150',
      desktop: '200x200'
    },
    lazyLoad: false,
    optimization: {
      quality: 85,
      progressive: true
    }
  },

  // 国際化設定（シンプルな切り替えボタン方式）
  // 翻訳データはすべてconfig.js内で管理
  i18n: {
    enabled: true, // 言語切り替えボタンで有効化
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    // 翻訳テキスト - すべての言語データをここで一元管理
    translations: {
      ja: {
        // プロフィール情報（名前は共通なので翻訳不要）
        profile: {
          title: "大学生",
          bio: "日本出身、マレーシア留学中のコンピュータサイエンス・データサイエンス専攻"
        },
        // About Meセクション
        about: {
          title: "自己紹介",
          content: "こんにちは！私はマレーシアで学ぶ日本人留学生です。コンピュータサイエンスとデータサイエンスを専攻しており、テクノロジーを通じて社会に貢献することを目指しています。"
        },
        // カスタムリンクのタイトル
        customLinks: {
          homepage: "ホームページ",
          email: "メール",
          portfolio: "ポートフォリオ",
          blog: "ブログ"
        },
        // UI要素
        share: {
          button: "共有",
          text: "私のプロフィールをチェック！"
        },
        ui: {
          languageToggle: "EN",
          copied: "リンクをコピーしました！",
          close: "閉じる",
          scanQR: "QRコードでアクセス"
        }
      },
      en: {
        // Profile information
        profile: {
          title: "University Student",
          bio: "Computer Science and Data Science student from Japan, studying in Malaysia"
        },
        // About Me section
        about: {
          title: "About Me",
          content: "Hi! I'm a Japanese student studying in Malaysia. I'm majoring in Computer Science and Data Science, aiming to contribute to society through technology."
        },
        // Custom link titles
        customLinks: {
          homepage: "Homepage",
          email: "Email",
          portfolio: "Portfolio",
          blog: "Blog"
        },
        // UI elements
        share: {
          button: "Share",
          text: "Check out my profile and connect with me!"
        },
        ui: {
          languageToggle: "日本語",
          copied: "Link copied!",
          close: "Close",
          scanQR: "Scan to visit"
        }
      }
    }
  },

  // アナリティクス
  analytics: {
    // プライバシー重視の選択肢
    plausible: "yourdomain.com",     // Plausible Analytics
    simpleAnalytics: true,            // Simple Analytics
    google: null                      // Google Analytics（オプション）
  },

  // PWA設定（オプション）
  pwa: {
    enabled: false, // 将来的な拡張用
    manifest: {
      name: "Ray's Links",
      short_name: "Ray Links",
      theme_color: "#6B46C1",
      background_color: "#ffffff"
    }
  }
};
```

## 7. レスポンシブ対応詳細

### 7.1 モバイルファースト設計
```css
/* ベース（モバイル） */
.container {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 0;
}

/* タブレット */
@media (min-width: 768px) {
  .container {
    width: 80%;
    max-width: 600px;
    padding: 40px 0;
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  .container {
    width: 600px;
    padding: 60px 0;
  }
}

/* アニメーション削減対応 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.2 タッチデバイス最適化
- タップターゲット: 最小44x44px
- リンク間隔: 最小8px
- ホバーエフェクトの代替: タップ時のフィードバック

## 8. 言語切り替え機能の実装（新規追加）

```javascript
// i18n.js
export class LanguageManager {
  constructor(config) {
    this.config = config;
    this.currentLang = this.getStoredLanguage() || config.i18n.defaultLocale;
    this.init();
  }

  getStoredLanguage() {
    return localStorage.getItem('preferredLanguage');
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    this.updatePageContent();
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'ja' ? 'en' : 'ja';
    this.setLanguage(newLang);
  }

  updatePageContent() {
    const t = this.config.i18n.translations[this.currentLang];
    
    // プロフィール更新
    document.querySelector('.profile-title').textContent = t.profile.title;
    document.querySelector('.profile-bio').textContent = t.profile.bio;
    
    // About Me更新
    if (document.querySelector('.about-title')) {
      document.querySelector('.about-title').textContent = t.about.title;
      document.querySelector('.about-content').textContent = t.about.content;
    }
    
    // シェアボタン更新
    document.querySelector('.share-button').textContent = t.share.button;
    
    // 言語切り替えボタン更新
    document.querySelector('.language-toggle').textContent = t.ui.languageToggle;
    
    // HTML lang属性更新
    document.documentElement.lang = this.currentLang;
  }

  init() {
    // 初期言語設定
    this.updatePageContent();
    
    // 言語切り替えボタンのイベントリスナー
    document.querySelector('.language-toggle').addEventListener('click', () => {
      this.toggleLanguage();
    });
  }
}
```

## 9. シェア機能の詳細実装

```javascript
// share.js
export class ShareManager {
  constructor(config, languageManager) {
    this.config = config;
    this.languageManager = languageManager;
    this.init();
  }

  init() {
    // Web Share API対応チェック
    this.canNativeShare = navigator.share !== undefined;
    
    // QRコード生成（軽量API使用）
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;
  }

  async share(channel) {
    const url = window.location.href;
    const lang = this.languageManager.currentLang;
    const text = this.config.i18n.translations[lang].share.text;
    const title = this.config.seo.title;

    switch(channel) {
      case 'native':
        if (this.canNativeShare) {
          await navigator.share({ title, text, url });
        }
        break;
      
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
        break;
      
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      
      case 'copy':
        await navigator.clipboard.writeText(url);
        this.showToast('Link copied!');
        break;
      
      case 'qr':
        this.showQRModal();
        break;
    }
  }

  showQRModal() {
    // QRコードモーダル表示
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
      <div class="qr-content">
        <img src="${this.qrCodeUrl}" alt="QR Code">
        <p>Scan to visit my profile</p>
        <button onclick="this.parentElement.parentElement.remove()">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  showToast(message) {
    // トースト通知表示
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
```

## 10. ビルドプロセス（新規追加）

### 10.1 package.json scripts
```json
{
  "scripts": {
    "dev": "live-server --port=8080",
    "build": "npm run clean && npm run build:all && npm run test:lighthouse",
    "clean": "rm -rf dist",
    "build:all": "npm run build:html && npm run build:css && npm run build:js && npm run build:images",
    "build:html": "html-minifier src/index.html --collapse-whitespace --remove-comments --minify-css --minify-js -o dist/index.html",
    "build:css": "postcss src/styles.css -o dist/styles.css",
    "build:js": "terser src/main.js -c -m -o dist/main.js",
    "build:images": "node scripts/optimize-images.js",
    "generate:sitemap": "node scripts/generate-sitemap.js",
    "generate:robots": "node scripts/generate-robots.js",
    "test:lighthouse": "lighthouse http://localhost:8080 --output html --output-path ./lighthouse-report.html",
    "test:accessibility": "pa11y http://localhost:8080",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 10.2 PostCSS設定
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    })
  ]
}
```

## 11. パフォーマンス目標（更新）

- **Lighthouse Score**: 全項目100点
  - Performance: 100
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100
- **Core Web Vitals**: すべて「良好」判定
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **ファイルサイズ目標**
  - HTML: < 10KB (gzip)
  - CSS: < 5KB (gzip)
  - JS: < 3KB (gzip)
  - 初回表示: < 50KB総計

## 12. 開発優先順位

### Phase 1: MVP（1週間）
1. 基本HTML構造とセマンティックマークアップ
2. レスポンシブCSS実装
3. config.jsによる設定管理
4. 基本的なSEO対策（メタタグ）
5. **言語切り替えボタン実装（日英対応）**

### Phase 2: 機能拡張（1週間）
1. シェア機能実装（URLコピー + SNS共有）
2. アクセシビリティ対応
3. パフォーマンス最適化（Critical CSS、画像最適化）
4. 構造化データ実装

### Phase 3: 改善（3日）
1. QRコード機能
2. アナリティクス統合
3. ビルドプロセス自動化
4. Lighthouse 100点達成

### Phase 4: オプション（将来）
1. PWA化
2. ~~多言語対応（i18n）~~ → Phase 1で実装済み
3. A/Bテスト機能
4. ~~ダークモード~~ （実装しない）

## 13. テスト要件（新規追加）

### 13.1 パフォーマンステスト
- Lighthouse CI による自動テスト
- WebPageTest での計測
- 実機での表示速度確認

### 13.2 ブラウザ互換性
- Chrome/Edge (最新2バージョン)
- Firefox (最新2バージョン)
- Safari (最新2バージョン)
- モバイルブラウザ (iOS Safari, Chrome)

### 13.3 アクセシビリティテスト
- Pa11y による自動テスト
- スクリーンリーダーでの動作確認
- キーボードナビゲーションテスト

---

この要件定義により、**SEO最適化**、**アクセシビリティ対応**、**パフォーマンス最適化**を備えた、プロフェッショナルなリンクまとめページが実現できます。段階的な実装により、確実に高品質な成果物を作成できます。