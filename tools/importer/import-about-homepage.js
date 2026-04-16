/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import cardsParser from './parsers/cards.js';
import columnsParser from './parsers/columns.js';
import tabsParser from './parsers/tabs.js';

// TRANSFORMER IMPORTS
import bofaCleanupTransformer from './transformers/bofa-cleanup.js';
import bofaSectionsTransformer from './transformers/bofa-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'cards': cardsParser,
  'columns': columnsParser,
  'tabs': tabsParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'about-homepage',
  description: 'Bank of America About homepage with hero, content cards, tiles, tabbed content, and local impact section',
  urls: [
    'https://about.bankofamerica.com/en'
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['.uc-masthead']
    },
    {
      name: 'cards',
      instances: ['.tile__list', '.uc-content-card-container']
    },
    {
      name: 'columns',
      instances: ['.highlight-block--has-parsys']
    },
    {
      name: 'tabs',
      instances: ['.uc-tab']
    }
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero Masthead',
      selector: '.aem-wrap--masthead-v2',
      style: null,
      blocks: ['hero'],
      defaultContent: []
    },
    {
      id: 'section-2-tiles',
      name: 'Impact Tiles',
      selector: '.aem-wrap--tile',
      style: null,
      blocks: ['cards'],
      defaultContent: ['h2#csp-class-0834bf59-718e-49e8-8fd1-1683a68f5525']
    },
    {
      id: 'section-3-content-cards',
      name: 'Feature Stories',
      selector: '.aem-wrap--content-card-container',
      style: null,
      blocks: ['cards'],
      defaultContent: ['h2#csp-class-df693185-fee8-4ce6-8a1c-b38280da1573']
    },
    {
      id: 'section-4-highlight',
      name: 'Local Impact Highlight',
      selector: '.aem-wrap--highlight-block',
      style: null,
      blocks: ['columns'],
      defaultContent: []
    },
    {
      id: 'section-5-tabs',
      name: 'Tabbed Content',
      selector: '.aem-wrap--tab',
      style: null,
      blocks: ['tabs'],
      defaultContent: ['h2#csp-class-10488969-0304-4de6-a585-59257eef515f']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  bofaCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [bofaSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
