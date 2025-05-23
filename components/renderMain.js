import { createCardElement } from './renderCards.js';

export function renderMain(pokemonArray, container, translateZValue, resetFetchButtonStyle) {
  container.innerHTML = '';
  pokemonArray.forEach(data => {
    const card = createCardElement(data, translateZValue);
    container.appendChild(card);
  });
  resetFetchButtonStyle();
}