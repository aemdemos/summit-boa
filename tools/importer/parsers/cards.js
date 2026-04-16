/* eslint-disable */
/* global WebImporter */

/**
 * Cards parser final.
 * Source: https://about.bankofamerica.com/en
 * Handles both tile cards (.tile__list) and content cards (.uc-content-card-container)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Pattern 1: Tile cards (.tile__item)
  const tileItems = element.querySelectorAll('.tile__item');
  if (tileItems.length > 0) {
    tileItems.forEach((tile) => {
      const row = [];
      const img = tile.querySelector('.tile__image, img');
      if (img) row.push(img);

      const textCell = [];
      const titleLink = tile.querySelector('.tile__title a');
      const title = tile.querySelector('.tile__title');
      if (titleLink) {
        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        a.href = titleLink.href;
        a.textContent = titleLink.textContent.trim();
        h3.appendChild(a);
        textCell.push(h3);
      } else if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent.trim();
        textCell.push(h3);
      }

      const desc = tile.querySelector('.tile__description');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        textCell.push(p);
      }

      if (textCell.length > 0) row.push(textCell);
      if (row.length > 0) cells.push(row);
    });
  }

  // Pattern 2: Content cards — use uc-content-card directly to avoid duplicates
  const contentCards = element.querySelectorAll(':scope uc-content-card');
  if (contentCards.length > 0 && tileItems.length === 0) {
    contentCards.forEach((card) => {
      const row = [];

      // Background image — try multiple selectors for the card image
      const img = card.querySelector('.uc-background__container img')
        || card.querySelector('uc-background img')
        || card.querySelector('.uc-card__container > uc-background img')
        || card.querySelector('.uc-card__container img:first-of-type');
      if (img) row.push(img);

      const textCell = [];
      const headingEl = card.querySelector('.uc-heading__headline');
      if (headingEl) {
        const linkEl = headingEl.querySelector('a');
        const h3 = document.createElement('h3');
        h3.textContent = (linkEl || headingEl).textContent.trim();
        textCell.push(h3);
      }

      const descEl = card.querySelector('.uc-heading__subheadline p');
      if (descEl) {
        const p = document.createElement('p');
        p.textContent = descEl.textContent.trim();
        textCell.push(p);
      }

      if (textCell.length > 0) row.push(textCell);
      if (row.length > 0) cells.push(row);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
