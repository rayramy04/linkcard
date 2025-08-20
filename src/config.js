// config.js - µ¤È-šÕ¡¤ë
export default {
  // ú,×íÕ£üëÅ1
  profile: {
    name: "Ray",
    title: "University Student", // ñLÇÕ©ëÈi18ngå,kŠÿH
    bio: "Computer Science and Data Science student from Japan, studying in Malaysia",
    avatar: "./assets/avatar.jpg",
    email: "ray@example.com"
  },

  // SNSêó¯-šÆó×ìüÈşÜ	
  social: [
    // ‹zû€Sû
    { platform: "github", username: "rayramy04" },
    
    // Õ;ûáÇ£¢û
    { platform: "youtube", url: "https://youtube.com/@ray_pianocover" },
    
    // ½ü·ãëáÇ£¢
    { platform: "twitter", username: "@rayramy04" },
    
    // Öí°û‹•?
    { platform: "note", url: "https://note.com/ll_0013py" }
  ],

  // «¹¿àêó¯Æó×ìüÈnêó¯	
  custom: [
    {
      title: "Blog",
      url: "https://ray-globallife.com",
      icon: "mdi:web",
      color: "#6B46C1"
    },
    {
      title: "Contact",
      url: "https://ray-globallife.com/contact",
      icon: "mdi:email",
      color: "#059669"
    },
    {
      title: "Portfolio",
      url: "https://rayramy04.github.io/portfolio",
      icon: "mdi:briefcase",
      color: "#0891b2"
    }
  ],

  // About Me»¯·çó
  about: {
    enabled: true,
    title: "About Me", // i18ngŠÿH
    content: "Hi! I'm a Japanese student studying in Malaysia. I'm majoring in Computer Science and Data Science, aiming to contribute to society through technology."
  },

  // SEO-š
  seo: {
    title: "Ray - Links | Computer Science Student",
    description: "Connect with Ray - Computer Science and Data Science student from Japan studying in Malaysia. Find all social media links and projects.",
    keywords: ["Computer Science", "Data Science", "Malaysia", "Japan", "Student", "Portfolio"],
    url: "https://rayramy04.github.io/linkcard",
    image: "./assets/og-image.jpg",
    twitterHandle: "@rayramy04"
  },

  // ı›-šåñŠÿH	
  i18n: {
    enabled: true,
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    translations: {
      ja: {
        // ×íÕ£üëÅ1
        profile: {
          title: "'f",
          bio: "å,ú«Şìü·¢Yf-n³óÔåü¿µ¤¨ó¹ûÇü¿µ¤¨ó¹;"
        },
        // About Me»¯·çó
        about: {
          title: "êñ9Ë",
          content: "S“kaoÁoŞìü·¢gfvå,ºYfgY³óÔåü¿µ¤¨ó¹hÇü¿µ¤¨ó¹’;WfJŠÆ¯Îí¸ü’Xf>k¢.Y‹Sh’îWfD~Y"
        },
        // «¹¿àêó¯n¿¤Èë
        customLinks: {
          blog: "Öí°",
          contact: "JOD[",
          portfolio: "İüÈÕ©êª"
        },
        // UI 
        ui: {
          languageToggle: "EN",
          copied: "êó¯’³ÔüW~W_",
          close: "‰X‹",
          scanQR: "QR³üÉg¢¯»¹"
        }
      },
      en: {
        // ×íÕ£üëÅ1
        profile: {
          title: "University Student",
          bio: "Computer Science and Data Science student from Japan, studying in Malaysia"
        },
        // About Me»¯·çó
        about: {
          title: "About Me",
          content: "Hi! I'm a Japanese student studying in Malaysia. I'm majoring in Computer Science and Data Science, aiming to contribute to society through technology."
        },
        // «¹¿àêó¯n¿¤Èë
        customLinks: {
          blog: "Blog",
          contact: "Contact",
          portfolio: "Portfolio"
        },
        // UI 
        ui: {
          languageToggle: "å,",
          copied: "Link copied!",
          close: "Close",
          scanQR: "Scan to visit"
        }
      }
    }
  },

  // ÆüŞ-š
  theme: {
    primaryColor: "#6B46C1",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    borderRadius: "12px",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },

  // SNS×éÃÈÕ©üànURL-š…è(	
  platformUrls: {
    github: "https://github.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
    twitch: "https://twitch.tv",
    discord: "https://discord.gg",
    reddit: "https://reddit.com",
    linkedin: "https://linkedin.com/in",
    qiita: "https://qiita.com",
    zenn: "https://zenn.dev",
    note: "https://note.com",
    line: "https://line.me"
  },

  // ¢¤³ó-šIconify(	
  platformIcons: {
    github: "mdi:github",
    twitter: "mdi:twitter",
    instagram: "mdi:instagram",
    facebook: "mdi:facebook",
    youtube: "mdi:youtube",
    tiktok: "ic:baseline-tiktok",
    twitch: "mdi:twitch",
    discord: "ic:baseline-discord",
    reddit: "mdi:reddit",
    linkedin: "mdi:linkedin",
    qiita: "simple-icons:qiita",
    zenn: "simple-icons:zenn",
    note: "simple-icons:note",
    line: "mdi:line",
    email: "mdi:email"
  }
};