/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Bank of America site cleanup.
 * BofA cleanup transformer (selectors from captured DOM)
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    // Remove cookie/consent banners, modals, overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '.modal__overlay',
      '.modal__overlay--megamenu',
    ]);
  }

  if (hookName === 'afterTransform') {
    // Remove non-authorable content: header, footer, nav, utility nav
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.aem-wrap--nav',
      'footer',
      '.footer-sub-nav',
      '.footer-main-nav',
      'nav',
      '.utility-nav',
      '.utility-nav--mobile',
      '.back-to-top',
      '.search-box',
      '#search-panel',
      '.navigation__search',
      'iframe',
      'link',
      'noscript',
      '.sr-only',
      '.accessibility-hidden',
      '.screen-reader-text',
    ]);

    // Remove tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-analytics');
    });
  }
}
