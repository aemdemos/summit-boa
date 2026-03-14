import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { createSliderControls, initSlider } from '../../scripts/slider.js';
import { createCard } from '../card/card.js';

export default function decorate(block) {
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'Carousel');

  const rows = [...block.children];
  const isSingleSlide = rows.length < 2;

  const container = document.createElement('div');
  container.classList.add('card-carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('card-carousel-slides');

  if (!isSingleSlide) {
    const { indicatorsNav, buttonsContainer } = createSliderControls(rows.length, {
      indicatorsAriaLabel: 'Card Carousel Slide Controls',
    });
    block.append(indicatorsNav);
    container.append(buttonsContainer);
  }

  rows.forEach((row, idx) => {
    const card = createCard(row);
    card.classList.add('card-carousel-slide');
    card.dataset.slideIndex = idx;
    slidesWrapper.append(card);
    row.remove();
  });

  slidesWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    initSlider(block, {
      slidesContainer: '.card-carousel-slides',
      slideSelector: '.card-carousel-slide',
      indicatorsContainer: '.carousel-slide-indicators',
      indicatorItemSelector: '.carousel-slide-indicator',
      prevSelector: '.slide-prev',
      nextSelector: '.slide-next',
    });
  }
}
