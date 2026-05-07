/**
 * Advanced Security Service
 * Handles fraud detection, disposable email blocking, and device fingerprinting.
 */

const DISPOSABLE_DOMAINS = [
  'temp-mail.org', 'guerrillamail.com', '10minutemail.com', 'yopmail.com', 
  'fakeinbox.com', 'mailinator.com', 'burners.com', 'trashmail.com'
];

export const SecurityService = {
  /**
   * Validates if an email is from a known disposable provider.
   */
  isDisposableEmail: (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return true;
    return DISPOSABLE_DOMAINS.some(d => domain.includes(d));
  },

  /**
   * Detects if the user is likely a bot based on behavioral markers.
   */
  isBotDetection: (): boolean => {
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    const isHeadless = !('onmousemove' in window) || navigator.webdriver;
    return !!(isBot || isHeadless);
  },

  /**
   * Simple device fingerprinting (Can be replaced with FingerprintJS for production).
   */
  getDeviceFingerprint: () => {
    const data = [
      navigator.userAgent,
      navigator.language,
      new Date().getTimezoneOffset(),
      window.screen.colorDepth,
      navigator.hardwareConcurrency,
      navigator.deviceMemory
    ].join('|');
    
    // Quick hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }
};
