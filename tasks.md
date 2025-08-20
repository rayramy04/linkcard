# 🚀 リンクまとめページ実装 タスク分担表

## 👥 チーム構成
- **Aさん**: フロントエンド・UI担当
- **Bさん**: JavaScript機能実装担当
- **Cさん**: ビルド・最適化担当

---

## 📋 Phase 1: MVP実装タスク

### 🅰️ Aさんのタスク（フロントエンド・UI担当）

#### 1. HTML構造の実装
- [ ] `index.html`の基本構造作成
- [ ] セマンティックHTMLマークアップ
- [ ] メタタグ設定（SEO対策）
- [ ] Open Graph / Twitter Card設定
- [ ] 構造化データ（JSON-LD）の埋め込み

#### 2. CSS実装
- [ ] `styles.css`の作成
- [ ] CSS変数の定義（カラーパレット等）
- [ ] レスポンシブデザイン実装
  - [ ] モバイル（320px〜767px）
  - [ ] タブレット（768px〜1023px）
  - [ ] デスクトップ（1024px〜）
- [ ] 言語切り替えボタンのスタイル

#### 3. UIコンポーネント
- [ ] プロフィールセクション（アバター、名前、bio）
- [ ] SNSリンクボタンのデザイン
- [ ] About Meセクション
- [ ] シェアボタンのUI
- [ ] アクセシビリティ対応（フォーカス、ARIA属性）

**必要ファイル:**
- `src/index.html`
- `src/styles.css`
- `src/assets/` (画像フォルダ)

---

### 🅱️ Bさんのタスク（JavaScript機能実装担当）

#### 1. 設定管理システム
- [ ] `config.js`の作成
- [ ] プロフィール情報の定義
- [ ] SNSリンク配列の定義
- [ ] i18n翻訳データの定義（日英）
- [ ] SEO設定の定義

#### 2. 言語切り替え機能
- [ ] `i18n.js`の実装（LanguageManager クラス）
- [ ] LocalStorage連携
- [ ] DOM要素の動的更新処理
- [ ] 言語切り替えボタンのイベント処理
- [ ] 初期言語の自動検出

#### 3. 動的コンテンツ生成
- [ ] `main.js`の実装
- [ ] config.jsからのデータ読み込み
- [ ] SNSリンクの動的生成
- [ ] カスタムリンクの動的生成
- [ ] About Meセクションの表示制御

**必要ファイル:**
- `src/config.js`
- `src/js/i18n.js`
- `src/js/main.js`

---

### 🅾️ Cさんのタスク（ビルド・最適化担当）

#### 1. 開発環境構築
- [ ] `package.json`の作成
- [ ] 必要なnpmパッケージのインストール
- [ ] `.gitignore`の設定
- [ ] `README.md`の作成

#### 2. ビルドプロセス設定
- [ ] PostCSS設定（`postcss.config.js`）
- [ ] HTML最適化スクリプト
- [ ] CSS最適化（Autoprefixer、CSSnano）
- [ ] JavaScript最適化（Terser）
- [ ] 画像最適化スクリプト（WebP変換）

#### 3. 自動化・デプロイ
- [ ] npm scriptsの設定
- [ ] 開発用サーバー設定（live-server）
- [ ] GitHub Pages デプロイ設定
- [ ] GitHub Actions CI/CD設定
- [ ] Lighthouse自動テスト設定

**必要ファイル:**
- `package.json`
- `postcss.config.js`
- `.github/workflows/deploy.yml`
- `scripts/` (ビルドスクリプト用フォルダ)

---

## 📅 実装順序と依存関係

### Day 1-2: 基礎実装
1. **Cさん**: 開発環境構築（最優先）
2. **Bさん**: config.js作成
3. **Aさん**: HTML基本構造

### Day 3-4: 機能実装
1. **Aさん**: CSS実装とレスポンシブ対応
2. **Bさん**: 言語切り替え機能実装
3. **Cさん**: ビルドプロセス設定

### Day 5-6: 統合・最適化
1. **全員**: 機能統合とテスト
2. **Bさん**: バグ修正
3. **Aさん**: UIの微調整
4. **Cさん**: パフォーマンス最適化

### Day 7: リリース準備
1. **Cさん**: デプロイ設定
2. **全員**: 最終テスト
3. **Cさん**: Lighthouse 100点確認

---

## 🔄 コミュニケーション方法

### ブランチ戦略
```
main
├── feature/frontend-ui (Aさん)
├── feature/js-functions (Bさん)
└── feature/build-setup (Cさん)
```

### ファイル構造
```
linkcard/
├── src/
│   ├── index.html          (Aさん)
│   ├── styles.css          (Aさん)
│   ├── config.js           (Bさん)
│   ├── js/
│   │   ├── main.js         (Bさん)
│   │   ├── i18n.js         (Bさん)
│   │   └── share.js        (Phase 2で実装)
│   └── assets/
│       └── avatar.jpg      (Aさん)
├── dist/                    (ビルド出力)
├── scripts/                 (Cさん)
│   ├── optimize-images.js
│   └── generate-sitemap.js
├── package.json            (Cさん)
├── postcss.config.js       (Cさん)
└── README.md               (Cさん)
```

### 進捗共有
- 毎日15分のスタンドアップミーティング
- Slackでの随時連絡
- PRレビューは相互に実施

---

## ⚠️ 注意事項

### 依存関係
- **Bさん**の`config.js`完成後、**Aさん**がデータ表示部分を実装
- **Cさん**の環境構築完了後、全員が開発開始
- **Aさん**のHTML/CSS完成後、**Bさん**がDOM操作実装

### 共通ルール
1. コミットメッセージは日本語OK
2. 変数名・関数名は英語
3. コメントは最小限に
4. ESLint/Prettierの設定に従う

### テスト項目
- [ ] モバイル表示確認
- [ ] 言語切り替え動作確認
- [ ] Lighthouse スコア確認
- [ ] クロスブラウザテスト

---

## 📝 完了条件

### Phase 1 MVP完了の定義
- [ ] 基本的なプロフィール表示
- [ ] SNSリンク一覧表示
- [ ] 日英言語切り替え機能
- [ ] レスポンシブ対応
- [ ] SEO基本対策
- [ ] Lighthouse Performance 90点以上
- [ ] GitHub Pagesでの公開

---

## 🎯 Phase 2 以降の予定
- シェア機能実装（Web Share API）
- QRコード生成
- アナリティクス統合
- PWA対応（オプション）