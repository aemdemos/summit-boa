var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-about-homepage.js
  var import_about_homepage_exports = {};
  __export(import_about_homepage_exports, {
    default: () => import_about_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const cells = [];
    const bgImg = element.querySelector(".uc-background__container img, .uc-masthead img");
    if (bgImg) {
      cells.push([bgImg]);
    }
    const contentCell = [];
    const heading = element.querySelector("h1");
    if (heading) {
      heading.querySelectorAll(".u-break-desktop, .u-break-mobile").forEach((br) => {
        br.replaceWith(" ");
      });
      contentCell.push(heading);
    }
    const subheadline = element.querySelector(".uc-heading__subheadline");
    if (subheadline) {
      const tagline = subheadline.querySelector(".font-connections-light, .subhead--2");
      if (tagline) {
        const p = document.createElement("p");
        p.textContent = tagline.textContent.trim();
        contentCell.push(p);
      }
    }
    const notch = element.querySelector(".uc-notch__container .text p, .uc-notch p");
    if (notch) {
      const p = document.createElement("p");
      p.textContent = notch.textContent.trim();
      contentCell.push(p);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document }) {
    const cells = [];
    const tileItems = element.querySelectorAll(".tile__item");
    if (tileItems.length > 0) {
      tileItems.forEach((tile) => {
        const row = [];
        const img = tile.querySelector(".tile__image, img");
        if (img) row.push(img);
        const textCell = [];
        const titleLink = tile.querySelector(".tile__title a");
        const title = tile.querySelector(".tile__title");
        if (titleLink) {
          const h3 = document.createElement("h3");
          const a = document.createElement("a");
          a.href = titleLink.href;
          a.textContent = titleLink.textContent.trim();
          h3.appendChild(a);
          textCell.push(h3);
        } else if (title) {
          const h3 = document.createElement("h3");
          h3.textContent = title.textContent.trim();
          textCell.push(h3);
        }
        const desc = tile.querySelector(".tile__description");
        if (desc) {
          const p = document.createElement("p");
          p.textContent = desc.textContent.trim();
          textCell.push(p);
        }
        if (textCell.length > 0) row.push(textCell);
        if (row.length > 0) cells.push(row);
      });
    }
    const contentCards = element.querySelectorAll(":scope uc-content-card");
    if (contentCards.length > 0 && tileItems.length === 0) {
      contentCards.forEach((card) => {
        const row = [];
        const img = card.querySelector(".uc-background__container img") || card.querySelector("uc-background img") || card.querySelector(".uc-card__container > uc-background img") || card.querySelector(".uc-card__container img:first-of-type");
        if (img) row.push(img);
        const textCell = [];
        const headingEl = card.querySelector(".uc-heading__headline");
        if (headingEl) {
          const linkEl = headingEl.querySelector("a");
          const h3 = document.createElement("h3");
          h3.textContent = (linkEl || headingEl).textContent.trim();
          textCell.push(h3);
        }
        const descEl = card.querySelector(".uc-heading__subheadline p");
        if (descEl) {
          const p = document.createElement("p");
          p.textContent = descEl.textContent.trim();
          textCell.push(p);
        }
        if (textCell.length > 0) row.push(textCell);
        if (row.length > 0) cells.push(row);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse3(element, { document }) {
    const cells = [];
    const img = element.querySelector(".highlight-block__image img, .image__img");
    const textContent = [];
    const location = element.querySelector("#highlight-geo .uc-heading__headline, .highlight-block__parsys h3");
    if (location) {
      const h3 = document.createElement("h3");
      h3.textContent = location.textContent.trim();
      textContent.push(h3);
    }
    const heading = element.querySelector("#highlight-headline .uc-heading__headline, .highlight-block__header h2");
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      textContent.push(h2);
    }
    const desc = element.querySelector(".highlight-block__header .uc-heading__subheadline p:not(:empty)");
    if (desc && desc.textContent.trim()) {
      const p = document.createElement("p");
      p.textContent = desc.textContent.trim();
      textContent.push(p);
    }
    const cta = element.querySelector(".highlight-block__button a, uc-button a");
    if (cta) {
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      const p = document.createElement("p");
      p.appendChild(a);
      textContent.push(p);
    }
    if (img && textContent.length > 0) {
      cells.push([img, textContent]);
    } else if (textContent.length > 0) {
      cells.push(textContent);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs.js
  function parse4(element, { document }) {
    const cells = [];
    const tabButtons = element.querySelectorAll(".uc-tab__scrolllist button.t-track-body-copy-link");
    const tabPanels = element.querySelectorAll(".uc-tab__tab");
    tabButtons.forEach((btn, index) => {
      const label = btn.textContent.trim();
      if (!label) return;
      cells.push([label]);
      const panel = tabPanels[index];
      if (!panel) return;
      const gridItems = panel.querySelectorAll(".uc-icon-grid-item");
      gridItems.forEach((item) => {
        const contentCell = [];
        const heading = item.querySelector(".uc-heading__headline");
        if (heading) {
          const h3 = document.createElement("h3");
          h3.textContent = heading.textContent.trim();
          if (item.tagName === "A" && item.href) {
            const a = document.createElement("a");
            a.href = item.href;
            a.textContent = heading.textContent.trim();
            const h3Link = document.createElement("h3");
            h3Link.appendChild(a);
            contentCell.push(h3Link);
          } else {
            contentCell.push(h3);
          }
        }
        const desc = item.querySelector(".uc-heading__subheadline p");
        if (desc) {
          const p = document.createElement("p");
          p.textContent = desc.textContent.trim();
          contentCell.push(p);
        }
        if (contentCell.length > 0) {
          cells.push(contentCell);
        }
      });
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/bofa-cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        ".modal__overlay",
        ".modal__overlay--megamenu"
      ]);
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, [
        "header",
        ".aem-wrap--nav",
        "footer",
        ".footer-sub-nav",
        ".footer-main-nav",
        "nav",
        ".utility-nav",
        ".utility-nav--mobile",
        ".back-to-top",
        ".search-box",
        "#search-panel",
        ".navigation__search",
        "iframe",
        "link",
        "noscript",
        ".sr-only",
        ".accessibility-hidden",
        ".screen-reader-text"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/bofa-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const metadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metadataBlock);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-about-homepage.js
  var parsers = {
    "hero": parse,
    "cards": parse2,
    "columns": parse3,
    "tabs": parse4
  };
  var PAGE_TEMPLATE = {
    name: "about-homepage",
    description: "Bank of America About homepage with hero, content cards, tiles, tabbed content, and local impact section",
    urls: [
      "https://about.bankofamerica.com/en"
    ],
    blocks: [
      {
        name: "hero",
        instances: [".uc-masthead"]
      },
      {
        name: "cards",
        instances: [".tile__list", ".uc-content-card-container"]
      },
      {
        name: "columns",
        instances: [".highlight-block--has-parsys"]
      },
      {
        name: "tabs",
        instances: [".uc-tab"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero Masthead",
        selector: ".aem-wrap--masthead-v2",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2-tiles",
        name: "Impact Tiles",
        selector: ".aem-wrap--tile",
        style: null,
        blocks: ["cards"],
        defaultContent: ["h2#csp-class-0834bf59-718e-49e8-8fd1-1683a68f5525"]
      },
      {
        id: "section-3-content-cards",
        name: "Feature Stories",
        selector: ".aem-wrap--content-card-container",
        style: null,
        blocks: ["cards"],
        defaultContent: ["h2#csp-class-df693185-fee8-4ce6-8a1c-b38280da1573"]
      },
      {
        id: "section-4-highlight",
        name: "Local Impact Highlight",
        selector: ".aem-wrap--highlight-block",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-5-tabs",
        name: "Tabbed Content",
        selector: ".aem-wrap--tab",
        style: null,
        blocks: ["tabs"],
        defaultContent: ["h2#csp-class-10488969-0304-4de6-a585-59257eef515f"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_about_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_about_homepage_exports);
})();
