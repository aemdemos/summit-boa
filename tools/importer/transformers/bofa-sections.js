/* eslint-disable */
/* global WebImporter */

/**
 * BofA section breaks and metadata transformer
 * Adds section breaks and section-metadata blocks based on template sections.
 * Runs in afterTransform only.
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section) => {
      // Try to find the section element using the selector
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;

      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metadataBlock);
      }

      // Add section break (hr) before this section, but not before the first section
      if (section.id !== sections[0].id) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
