# LinkCard

Instagram風のデザインを採用した、シンプルで高速なパーソナルリンクページ。

## ✨ 特徴

- 🎨 **Instagram風グラデーション** - 紫とオレンジの美しいグラデーションデザイン
- ⚡ **超高速** - 静的HTMLで軽量、フレームワーク不使用
- 📱 **レスポンシブ対応** - モバイル・デスクトップ両対応
- 🔗 **Web Share API** - ワンクリックでシェア
- 🎯 **SNSブランドカラー** - 各サービスのアイコンに適切な色を自動適用
- 🚀 **簡単デプロイ** - GitHub Pagesで無料ホスティング

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
- グラデーションカラー（`--instagram`変数）
- 背景色（body の background）
- カードのスタイル
- ホバーエフェクト

## 📁 プロジェクト構成

```
linkcard/
├── src/
│   ├── assets/          # 画像ファイル
│   │   ├── avatar.jpg   # プロフィール画像
│   │   └── favicon.ico  # ファビコン
│   ├── js/
│   │   ├── main.js      # メインロジック
│   │   └── share.js     # シェア機能
│   ├── config.js        # 設定ファイル
│   ├── custom.css       # カスタムスタイル
│   └── index.html       # メインHTML
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