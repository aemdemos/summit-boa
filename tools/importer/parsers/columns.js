/* eslint-disable */
/* global WebImporter */

/**
 * Columns block parser.
 * Source: https://about.bankofamerica.com/en
 * Selector: .highlight-block--has-parsys
 */
export default function parse(element, { document }) {
  const cells = [];

  // Column 1: Image
  const img = element.querySelector('.highlight-block__image img, .image__img');

  // Column 2: Text content with heading, description, and CTA
  const textContent = [];

  const location = element.querySelector('#highlight-geo .uc-heading__headline, .highlight-block__parsys h3');
  if (location) {
    const h3 = document.createElement('h3');
    h3.textContent = location.textContent.trim();
    textContent.push(h3);
  }

  const heading = element.querySelector('#highlight-headline .uc-heading__headline, .highlight-block__header h2');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    textContent.push(h2);
  }

  const desc = element.querySelector('.highlight-block__header .uc-heading__subheadline p:not(:empty)');
  if (desc && desc.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = desc.textContent.trim();
    textContent.push(p);
  }

  const cta = element.querySelector('.highlight-block__button a, uc-button a');
  if (cta) {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    const p = document.createElement('p');
    p.appendChild(a);
    textContent.push(p);
  }

  if (img && textContent.length > 0) {
    cells.push([img, textContent]);
  } else if (textContent.length > 0) {
    cells.push(textContent);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
