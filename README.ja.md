# LinkCard

[English](./README.md) | 日本語

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

## 🔄 テンプレートの同期

このテンプレートはフォークして上流の更新と同期できるように設計されています。

### 仕組み

**あなたのカスタマイズは保護されます** - 更新を同期すると：
- 新しいテンプレート機能とバグ修正が適用されます
- あなたの設定、スタイル、アセットは絶対に上書きされません
- ビルドファイルは新しいテンプレート + あなたのデータで自動再生成されます

**保護されるファイル**（上書きされない）：
- `src/config.js` - あなたのプロフィール、リンク、About
- `src/custom.css` - あなたのブランドカラーとスタイル
- `src/assets/**` - あなたの画像とファイル
- `dist/**`, `docs/**` - 生成されたビルド出力

**同期されるファイル**（テンプレートの更新を受け取る）：
- `src/js/**` - コアJavaScript
- `src/index.html` - HTMLテンプレート
- `.github/workflows/**` - GitHub Actions

### 初回セットアップ

フォーク後、マージ戦略を設定：

```bash
git config --local merge.ours.driver true

# オプション：同期後に自動でリビルド
cp .github/hooks/post-merge .git/hooks/post-merge
chmod +x .git/hooks/post-merge
```

### テンプレート更新の同期

**簡単な方法**（推奨）：
```bash
./sync-template.sh
```

**手動の方法**：
```bash
git remote add template-upstream https://github.com/rayramy04/linkcard.git
git fetch template-upstream
git merge template-upstream/main

# リビルド（post-mergeフックを使っていない場合）
npm install  # package.jsonが変更された場合
npm run build
git add dist/ docs/ && git commit -m "同期後にリビルド" && git push
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
