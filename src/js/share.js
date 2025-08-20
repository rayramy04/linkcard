/**
 * Handles share functionality with Web Share API fallback to clipboard
 */
export default class ShareManager {
  constructor(config) {
    this.config = config;
    this.shareButton = null;
    this.toastTimer = null;
  }

  init() {
    this.setupElements();
    this.attachEventListeners();
  }

  setupElements() {
    this.shareButton = document.querySelector('button#shareButton');
  }

  attachEventListeners() {
    if (this.shareButton) {
      this.shareButton.addEventListener('click', () => {
        this.handleShare();
      });
    }
  }

  /**
   * Main share handler - tries Web Share API first, falls back to clipboard
   */
  async handleShare() {
    const shareData = {
      title: `${this.config.profile.name} - ${this.config.profile.title}`,
      text: `Check out ${this.config.profile.name}'s profile!`,
      url: window.location.href
    };

    // Use native share if available (mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        await this.copyToClipboard(shareData.url, 'Shared and link copied!');
      } catch (error) {
        if (error.name === 'AbortError') {
          await this.copyToClipboard(shareData.url, 'Link copied to clipboard!');
        } else {
          console.log('Share failed:', error);
          await this.copyToClipboard(shareData.url, 'Link copied to clipboard!');
        }
      }
    } else {
      await this.copyToClipboard(shareData.url, 'Link copied to clipboard!');
    }
  }

  /**
   * Copies URL to clipboard with modern API
   */
  async copyToClipboard(url, message = 'Link copied to clipboard!') {
    try {
      await navigator.clipboard.writeText(url);
      this.showToast(message);
    } catch (error) {
      console.error('Failed to copy:', error);
      this.fallbackCopy(url, message);
    }
  }

  /**
   * Legacy fallback for older browsers without clipboard API
   */
  fallbackCopy(url, message = 'Link copied to clipboard!') {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      this.showToast(message);
    } catch (error) {
      console.error('Fallback copy failed:', error);
      this.showToast('Failed to copy link');
    }

    document.body.removeChild(textArea);
  }

  /**
   * Shows temporary toast notification for user feedback
   */
  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.removeAttribute('hidden');
      
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
      
      // Auto-hide after 3 seconds
      this.toastTimer = setTimeout(() => {
        toast.setAttribute('hidden', '');
      }, 3000);
    }
  }

}