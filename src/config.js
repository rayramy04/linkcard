// config.js - ���-�ա��
export default {
  // �,��գ���1
  profile: {
    name: "Ray",
    title: "University Student", // �L�թ��i18ng�,�k��H
    bio: "Computer Science and Data Science student from Japan, studying in Malaysia",
    avatar: "./assets/avatar.jpg",
    email: "ray@example.com"
  },

  // SNS��-���������	
  social: [
    // �z��S�
    { platform: "github", username: "rayramy04" },
    
    // �;��ǣ��
    { platform: "youtube", url: "https://youtube.com/@ray_pianocover" },
    
    // ������ǣ�
    { platform: "twitter", username: "@rayramy04" },
    
    // �����?
    { platform: "note", url: "https://note.com/ll_0013py" }
  ],

  // ������������n��	
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

  // About Me�����
  about: {
    enabled: true,
    title: "About Me", // i18ng��H
    content: "Hi! I'm a Japanese student studying in Malaysia. I'm majoring in Computer Science and Data Science, aiming to contribute to society through technology."
  },

  // SEO-�
  seo: {
    title: "Ray - Links | Computer Science Student",
    description: "Connect with Ray - Computer Science and Data Science student from Japan studying in Malaysia. Find all social media links and projects.",
    keywords: ["Computer Science", "Data Science", "Malaysia", "Japan", "Student", "Portfolio"],
    url: "https://rayramy04.github.io/linkcard",
    image: "./assets/og-image.jpg",
    twitterHandle: "@rayramy04"
  },

  // ��-�����H	
  i18n: {
    enabled: true,
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    translations: {
      ja: {
        // ��գ���1
        profile: {
          title: "'f",
          bio: "�,�������Yf-n������������������;"
        },
        // About Me�����
        about: {
          title: "��9�",
          content: "S�kao�o�����gfv�,�YfgY����������h�������;WfJ�Ư����Xf>k�.Y�Sh��WfD~Y"
        },
        // ������n����
        customLinks: {
          blog: "��",
          contact: "JOD�[",
          portfolio: "���թ�"
        },
        // UI� 
        ui: {
          languageToggle: "EN",
          copied: "�󯒳��W~W_",
          close: "�X�",
          scanQR: "QR���g����"
        }
      },
      en: {
        // ��գ���1
        profile: {
          title: "University Student",
          bio: "Computer Science and Data Science student from Japan, studying in Malaysia"
        },
        // About Me�����
        about: {
          title: "About Me",
          content: "Hi! I'm a Japanese student studying in Malaysia. I'm majoring in Computer Science and Data Science, aiming to contribute to society through technology."
        },
        // ������n����
        customLinks: {
          blog: "Blog",
          contact: "Contact",
          portfolio: "Portfolio"
        },
        // UI� 
        ui: {
          languageToggle: "�,�",
          copied: "Link copied!",
          close: "Close",
          scanQR: "Scan to visit"
        }
      }
    }
  },

  // ���-�
  theme: {
    primaryColor: "#6B46C1",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    borderRadius: "12px",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },

  // SNS����թ��nURL-���(	
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

  // ����-�Iconify(	
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