# LinkCard

Instagram風のデザインを採用した、シンプルで高速なパーソナルリンクページ。

## ✨ 特徴

- 🎨 **Instagram風グラデーション** - ピンクとオレンジのグラデーションにポリゴンメッシュパターン
- ⚡ **超高速** - 静的HTMLで軽量、フレームワーク不使用
- 📱 **レスポンシブ対応** - モバイル・デスクトップ両対応
- 🔗 **Web Share API** - ワンクリックでシェア
- 🎯 **SNSブランドカラー** - 各サービスのアイコンに適切な色を自動適用
- 📥 **ダウンロード対応** - PDF等のファイルダウンロードカードに対応
- 🚀 **簡単デプロイ** - GitHub Actions で自動デプロイ
- 🎭 **最適化済みCSS** - CSS変数使用で効率的なコード

## 🚀 クイックスタート

### 必要環境
- Node.js 14以上（開発時のみ）
- GitHub アカウント（GitHub Pages利用時）

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/rayramy04/linkcard.git
cd linkcard

# 依存関係をインストール（開発用）
npm install

# 開発サーバー起動
npm run dev
# ブラウザで http://localhost:8080 を開く
```

## 📝 カスタマイズ

### 基本設定

`src/config.js`を編集してプロフィールとリンクを設定：

```javascript
export default {
  profile: {
    name: "あなたの名前",
    title: "肩書き・職業",
    bio: "簡単な自己紹介文",
    avatar: "./assets/avatar.jpg"  // プロフィール画像
  },
  
  links: [
    {
      name: "X (Twitter)",
      url: "https://x.com/username",
      icon: "mdi:twitter",        // Iconifyアイコン
      color: "#1DA1F2",           // ブランドカラー
      description: "最新情報を発信" // 説明（オプション）
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
      type: "download"            // ダウンロードカードとして表示
    },
    // 他のリンクを追加...
  ],
  
  about: {
    title: "About Me",
    paragraphs: [
      "詳しい自己紹介文をここに記載...",
      "━━━",  // 区切り線として表示
      "English introduction text here..."
    ]
  }
}
```

### アイコンの探し方

[Iconify](https://icon-sets.iconify.design/)で検索して、好きなアイコンのコードをコピー。

### スタイルのカスタマイズ

`src/custom.css`でデザインを調整：
- Instagram公式カラー（`--ig-*`変数）
- グラデーション定義（`--gradient-*`変数）
- ポリゴンメッシュパターン（body::before, body::after）
- カードのスタイル
- ホバーエフェクト

## 📁 プロジェクト構成

```
linkcard/
├── src/                 # ソースファイル
│   ├── assets/          # 画像・ファイル
│   │   ├── avatar.jpg   # プロフィール画像
│   │   ├── favicon.ico  # ファビコン
│   │   └── resume-en.pdf # レジュメ（PDF）
│   ├── js/
│   │   ├── main.js      # メインロジック
│   │   └── share.js     # シェア機能
│   ├── config.js        # 設定ファイル
│   ├── custom.css       # カスタムスタイル
│   └── index.html       # メインHTML
├── docs/                # GitHub Pages用（自動生成）
├── dist/                # ビルド出力（ローカル確認用）
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions自動デプロイ
├── package.json         # npm設定
├── LICENSE             # MITライセンス
└── README.md           # このファイル
```

## 🚢 デプロイ（GitHub Pages）

### 自動デプロイ（GitHub Actions）

mainブランチにプッシュすると、GitHub Actionsが自動的にビルドしてデプロイします：

1. GitHubでリポジトリを作成
2. コードをプッシュ
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/linkcard.git
git push -u origin main
```
3. GitHub設定:
   - Settings → Pages
   - Source: GitHub Actions を選択
4. 数分後、`https://yourusername.github.io/linkcard`でアクセス可能

### 手動デプロイ（オプション）

```bash
# ローカルでビルド & デプロイ（gh-pagesブランチに手動プッシュ）
npm run deploy
```

## 🛠 開発コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番用ビルド（distフォルダに出力） |
| `npm run deploy` | GitHub Pagesへデプロイ |

## 🔧 技術スタック

- **Vanilla JavaScript** - フレームワーク不使用で高速
- **Simple.css** - 美しいデフォルトスタイル
- **Iconify** - 豊富なアイコンライブラリ
- **GitHub Pages** - 無料ホスティング

## 📄 ライセンス

MIT License - 詳細は[LICENSE](./LICENSE)ファイルを参照

---

# LinkCard (English)

A simple and fast personal link page with Instagram-inspired design.

## ✨ Features

- 🎨 **Instagram-style Gradient** - Pink and orange gradient with polygon mesh pattern
- ⚡ **Lightning Fast** - Static HTML, lightweight, no frameworks
- 📱 **Responsive Design** - Works on mobile and desktop
- 🔗 **Web Share API** - One-click sharing
- 🎯 **SNS Brand Colors** - Automatic icon coloring for each service
- 📥 **Download Support** - Support for downloadable file cards (PDFs, etc.)
- 🚀 **Easy Deploy** - Automatic deployment with GitHub Actions
- 🎭 **Optimized CSS** - Efficient code using CSS variables

## 🚀 Quick Start

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

## 📝 Customization

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

## 📁 Project Structure

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

## 🚢 Deploy (GitHub Pages)

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

## 🛠 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (output to dist folder) |
| `npm run deploy` | Deploy to GitHub Pages |

## 🔧 Tech Stack

- **Vanilla JavaScript** - Fast without frameworks
- **Simple.css** - Beautiful default styles
- **Iconify** - Rich icon library
- **GitHub Pages** - Free hosting

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details