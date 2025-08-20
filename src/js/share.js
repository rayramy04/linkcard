// share.js - シェア機能の実装
export class ShareManager {
  constructor(config, languageManager) {
    this.config = config;
    this.languageManager = languageManager;
    this.canNativeShare = this.checkNativeShareSupport();
  }

  // Web Share APIのサポートをチェック
  checkNativeShareSupport() {
    return navigator.share !== undefined;
  }

  // シェア機能を初期化
  init() {
    this.setupShareButton();
    this.setupQRCode();
  }

  // シェアボタンの設定
  setupShareButton() {
    const shareButton = document.getElementById('share-button');
    if (!shareButton) return;

    shareButton.addEventListener('click', () => {
      this.handleShare();
    });
  }

  // シェア処理
  async handleShare() {
    const shareData = {
      title: this.config.seo.title,
      text: this.getCurrentShareText(),
      url: window.location.href
    };

    // Web Share APIが利用可能な場合
    if (this.canNativeShare) {
      try {
        await navigator.share(shareData);
        // 成功時は特に何もしない（OSのUIが処理）
      } catch (err) {
        // ユーザーがキャンセルした場合は何もしない
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
          this.showFallbackOptions();
        }
      }
    } else {
      // フォールバック: シェアオプションを表示
      this.showFallbackOptions();
    }
  }

  // 現在の言語に応じたシェアテキストを取得
  getCurrentShareText() {
    const lang = this.languageManager ? this.languageManager.currentLang : 'en';
    const shareText = this.config.i18n.translations[lang]?.share?.text;
    return shareText || 'Check out my profile!';
  }

  // フォールバックオプションを表示
  showFallbackOptions() {
    // 既存のモーダルがあれば削除
    const existingModal = document.querySelector('.share-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modal = this.createShareModal();
    document.body.appendChild(modal);

    // モーダルを表示
    setTimeout(() => modal.classList.add('show'), 10);

    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeShareModal(modal);
      }
    });
  }

  // シェアモーダルを作成
  createShareModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'share-modal-content';

    // タイトル
    const title = document.createElement('h3');
    title.className = 'share-modal-title';
    title.textContent = this.languageManager?.getTranslation('ui.share') || 'Share';

    // シェアオプション
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'share-options';

    // URLコピー
    const copyButton = this.createShareOption('copy', 'Copy Link', 'mdi:content-copy');
    copyButton.addEventListener('click', () => {
      this.copyToClipboard();
      this.closeShareModal(modal);
    });
    optionsContainer.appendChild(copyButton);

    // Twitter/X
    const twitterButton = this.createShareOption('twitter', 'X (Twitter)', 'mdi:twitter');
    twitterButton.addEventListener('click', () => {
      this.shareToTwitter();
      this.closeShareModal(modal);
    });
    optionsContainer.appendChild(twitterButton);

    // Facebook
    const facebookButton = this.createShareOption('facebook', 'Facebook', 'mdi:facebook');
    facebookButton.addEventListener('click', () => {
      this.shareToFacebook();
      this.closeShareModal(modal);
    });
    optionsContainer.appendChild(facebookButton);

    // LinkedIn
    const linkedinButton = this.createShareOption('linkedin', 'LinkedIn', 'mdi:linkedin');
    linkedinButton.addEventListener('click', () => {
      this.shareToLinkedIn();
      this.closeShareModal(modal);
    });
    optionsContainer.appendChild(linkedinButton);

    // LINE（日本向け）
    const lineButton = this.createShareOption('line', 'LINE', 'mdi:line');
    lineButton.addEventListener('click', () => {
      this.shareToLine();
      this.closeShareModal(modal);
    });
    optionsContainer.appendChild(lineButton);

    // QRコード
    const qrButton = this.createShareOption('qr', 'QR Code', 'mdi:qrcode');
    qrButton.addEventListener('click', () => {
      this.showQRCode();
      this.closeShareModal(modal);
    });
    optionsContainer.appendChild(qrButton);

    // 閉じるボタン
    const closeButton = document.createElement('button');
    closeButton.className = 'share-modal-close';
    closeButton.innerHTML = '<span class="iconify" data-icon="mdi:close"></span>';
    closeButton.addEventListener('click', () => {
      this.closeShareModal(modal);
    });

    modalContent.appendChild(title);
    modalContent.appendChild(optionsContainer);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    return modal;
  }

  // シェアオプションボタンを作成
  createShareOption(platform, label, icon) {
    const button = document.createElement('button');
    button.className = `share-option share-option-${platform}`;
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'iconify';
    iconSpan.setAttribute('data-icon', icon);
    
    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;
    
    button.appendChild(iconSpan);
    button.appendChild(labelSpan);
    
    return button;
  }

  // モーダルを閉じる
  closeShareModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }

  // クリップボードにコピー
  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showToast(this.languageManager?.getTranslation('ui.copied') || 'Link copied!');
    } catch (err) {
      console.error('Failed to copy:', err);
      // フォールバック: テキストエリアを使用
      this.fallbackCopyToClipboard();
    }
  }

  // フォールバックコピー処理
  fallbackCopyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = window.location.href;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      this.showToast(this.languageManager?.getTranslation('ui.copied') || 'Link copied!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textarea);
  }

  // Twitterでシェア
  shareToTwitter() {
    const text = this.getCurrentShareText();
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  }

  // Facebookでシェア
  shareToFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  }

  // LinkedInでシェア
  shareToLinkedIn() {
    const url = window.location.href;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=550,height=420');
  }

  // LINEでシェア
  shareToLine() {
    const text = this.getCurrentShareText();
    const url = window.location.href;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + '\n' + url)}`;
    window.open(lineUrl, '_blank');
  }

  // QRコードを表示
  showQRCode() {
    // 既存のQRモーダルがあれば削除
    const existingModal = document.querySelector('.qr-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'qr-modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'qr-modal-content';

    // QRコード画像
    const qrImage = document.createElement('img');
    qrImage.src = this.getQRCodeUrl();
    qrImage.alt = 'QR Code';
    qrImage.className = 'qr-code-image';

    // 説明テキスト
    const description = document.createElement('p');
    description.className = 'qr-description';
    description.textContent = this.languageManager?.getTranslation('ui.scanQR') || 'Scan to visit';

    // 閉じるボタン
    const closeButton = document.createElement('button');
    closeButton.className = 'qr-close-button';
    closeButton.textContent = this.languageManager?.getTranslation('ui.close') || 'Close';
    closeButton.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    });

    modalContent.appendChild(qrImage);
    modalContent.appendChild(description);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      }
    });
  }

  // QRコードのURLを生成
  getQRCodeUrl() {
    const url = encodeURIComponent(window.location.href);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`;
  }

  // QRコードを設定
  setupQRCode() {
    // 必要に応じてプリロード
    if (this.config.share?.preloadQR) {
      const img = new Image();
      img.src = this.getQRCodeUrl();
    }
  }

  // トースト通知を表示
  showToast(message) {
    // 既存のトーストを削除
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // アニメーション
    setTimeout(() => toast.classList.add('show'), 10);

    // 3秒後に削除
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

export default ShareManager;