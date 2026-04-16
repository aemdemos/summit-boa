/* eslint-disable */
/* global WebImporter */

/**
 * Tabs block parser.
 * Source: https://about.bankofamerica.com/en
 * Selector: .uc-tab
 */
export default function parse(element, { document }) {
  const cells = [];

  // Get tab buttons for labels
  const tabButtons = element.querySelectorAll('.uc-tab__scrolllist button.t-track-body-copy-link');
  // Get tab panels
  const tabPanels = element.querySelectorAll('.uc-tab__tab');

  tabButtons.forEach((btn, index) => {
    const label = btn.textContent.trim();
    if (!label) return;

    // Tab label row
    cells.push([label]);

    // Tab content: extract icon grid items from corresponding panel
    const panel = tabPanels[index];
    if (!panel) return;

    const gridItems = panel.querySelectorAll('.uc-icon-grid-item');
    gridItems.forEach((item) => {
      const contentCell = [];

      const heading = item.querySelector('.uc-heading__headline');
      if (heading) {
        const h3 = document.createElement('h3');
        h3.textContent = heading.textContent.trim();

        // Wrap in link if the grid item is a link
        if (item.tagName === 'A' && item.href) {
          const a = document.createElement('a');
          a.href = item.href;
          a.textContent = heading.textContent.trim();
          const h3Link = document.createElement('h3');
          h3Link.appendChild(a);
          contentCell.push(h3Link);
        } else {
          contentCell.push(h3);
        }
      }

      const desc = item.querySelector('.uc-heading__subheadline p');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        contentCell.push(p);
      }

      if (contentCell.length > 0) {
        cells.push(contentCell);
      }
    });
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs', cells });
  element.replaceWith(block);
}
