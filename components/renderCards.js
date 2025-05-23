import { zoomCard } from '../utils/zoom.js';
import { catchPokemon } from '../utils/storage.js';
import { applyTiltEffect } from '../utils/tilt.js';
import { typeColors } from '../data/typeColors.js';

export function createCardElement(data, translateZValue) {
  const typeNames = data.types.map(t => t.type.name);
  const colors = typeNames.map(type => typeColors[type]);

  let bgStyle = '';
  if (colors.length === 1) {
    bgStyle = `background: linear-gradient(135deg, ${colors[0]} 0%, rgba(255, 255, 255, 1) 100%)`;
  } else {
    bgStyle = `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  }

  const li = document.createElement('li');
  li.classList.add('flex', 'items-center', 'justify-around', 'py-2', 'rounded');

  li.innerHTML = `
    <div class="zoom-wrapper cursor-pointer">
      <div class="tilt-card p-1 rounded-xl w-[285px] h-[400px] overflow-visible shadow-md relative" style="${bgStyle}; border: 12px solid #ffcc00; border-radius: 1.5rem; transform-style: preserve-3d;">
        <div class="grain-glitter-layer absolute inset-0 pointer-events-none z-0 rounded-xl"></div>
        <div style="background-color: rgba(255, 255, 255, 0.25); transform: translateZ(${translateZValue}px);" class="rounded-lg w-full h-full p-4 flex flex-col items-center text-center shadow-lg relative">
          <button class="catch-button absolute top-1 right-1 text-black text-xs font-bold px-1 py-1 z-2 flex flex-col items-center gap-0.5 cursor-pointer hover:scale-115 transform transition-all">
            <img src="./images/pokeball_icon.png" alt="Poké Ball" class="w-8 h-8" />
            Catch
          </button>
          <img class="h-42 mb-2" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"/>
          <h2 class="text-xl font-bold capitalize" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}); -webkit-background-clip: text; color: transparent; text-shadow: -1px -1px 0 black;">
            ${data.name}
          </h2>
          <div class="flex justify-center gap-x-2 gap-y-1 flex-wrap w-full mt-2 mb-2">
            ${(data.types || []).map(t => `<span class="px-2 py-1 rounded-full text-xs text-black border border-black border-opacity-50" style="background-color: ${typeColors[t.type.name]};">${t.type.name}</span>`).join('')}
          </div>
          <div class="text-xs text-left w-full mt-auto" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}); -webkit-background-clip: text; color: transparent; text-shadow: -1px -1px 0 black;">
            ${data.stats.map(stat => `
              <div class="flex justify-between">
                <span class="capitalize">${stat.stat.name}</span>
                <span>${stat.base_stat}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Tilt effect
  applyTiltEffect(li.querySelectorAll(".tilt-card"));

  // Catch button event
  li.querySelector('.catch-button').addEventListener('click', () => {
    catchPokemon(data);
  });

  // Zoom card click behavior
  li.querySelector('.zoom-wrapper').addEventListener('click', () => {
    zoomCard(li);
  });

  return li;
}