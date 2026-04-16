/* eslint-disable */
/* global WebImporter */

/**
 * Hero block parser.
 * Source: https://about.bankofamerica.com/en
 * Selector: .uc-masthead
 */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: Background image
  const bgImg = element.querySelector('.uc-background__container img, .uc-masthead img');
  if (bgImg) {
    cells.push([bgImg]);
  }

  // Row 2: Heading + tagline + intro text
  const contentCell = [];

  const heading = element.querySelector('h1');
  if (heading) {
    // Clean up break spans
    heading.querySelectorAll('.u-break-desktop, .u-break-mobile').forEach((br) => {
      br.replaceWith(' ');
    });
    contentCell.push(heading);
  }

  const subheadline = element.querySelector('.uc-heading__subheadline');
  if (subheadline) {
    const tagline = subheadline.querySelector('.font-connections-light, .subhead--2');
    if (tagline) {
      const p = document.createElement('p');
      p.textContent = tagline.textContent.trim();
      contentCell.push(p);
    }
  }

  // Notch intro text
  const notch = element.querySelector('.uc-notch__container .text p, .uc-notch p');
  if (notch) {
    const p = document.createElement('p');
    p.textContent = notch.textContent.trim();
    contentCell.push(p);
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
