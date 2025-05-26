import * as utils from './utils/utils.js';

// Wait till the page is loaded, gives us the pokedexGrid and Cards
window.addEventListener('DOMContentLoaded', renderPokedex);

// Function: renderPokedexCard ()
function renderPokedexCard(pokemon, pokemons, renderCallback) {
  const { colors, gradient: bgStyle } = utils.getPokemonColors(pokemon.types);

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="card-container perspective w-[285px] h-[400px]">
      <div class="card-inner transition-transform duration-500 transform-style-preserve-3d relative w-full h-full">
        <div class="card-front absolute w-full h-full backface-hidden tilt-card p-1 rounded-xl shadow-md" style="${bgStyle}; border: 12px solid #ffcc00; border-radius: 1.5rem; transform-style: preserve-3d;">
          <div class="grain-glitter-layer absolute inset-0 pointer-events-none z-0 rounded-xl"></div>
          <div style="background-color: rgba(255, 255, 255, 0.25); transform: translateZ(8px);" class="relative rounded-lg w-full h-full p-4 flex flex-col items-center text-center shadow-lg">
            <button class="release-button absolute top-1 right-1 text-black text-xs font-bold px-1 py-1 z-2 flex flex-col items-center gap-0.5 cursor-pointer hover:scale-115 transform transition-all">
              <img src="./images/pokeball_icon.png" alt="Poké Ball" class="w-8 h-8"/>
              Release
            </button>
            <img class="h-42 mb-2" src="${pokemon.image}" alt="${pokemon.name}"/>
            <h2 class="text-xl font-bold capitalize" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}); -webkit-background-clip: text; color: transparent; text-shadow: -1px -1px 0 black;">
              ${pokemon.name}
            </h2>
            <div class="flex justify-center gap-x-2 gap-y-1 flex-wrap w-full mt-2 mb-2">
              ${pokemon.types.map(t => `<span class="px-2 py-1 rounded-full text-xs text-black border border-black border-opacity-50" style="background-color: ${utils.typeColors[t]};">${t}</span>`).join('')}
            </div>
            <div class="text-xs text-left w-full mt-auto" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}); -webkit-background-clip: text; color: transparent; text-shadow: -1px -1px 0 black;">
              ${pokemon.stats.map(stat => `
                <div class="flex justify-between">
                  <span class="capitalize">${stat.name}</span>
                  <span>${stat.value}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="card-back absolute w-full h-full backface-hidden rotate-y-180 bg-cover bg-center rounded-xl overflow-hidden" style="background-image: url('./images/tcg-card-back.jpg');">
          <div class="card-back-glare absolute inset-0"></div>
          <textarea placeholder="Write your notes..." class="bg-white/80 text-sm w-10/12 p-2 rounded mt-55 mx-auto block resize-none relative z-3"></textarea>
        </div>
      </div>
    </div>
  `;

  const cardInner = li.querySelector('.card-inner');
  const tiltElement = li.querySelector('.tilt-card');

  VanillaTilt.init(tiltElement, {
    max: 15,
    speed: 200,
    glare: true,
    "max-glare": 0.75,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    gyroscope: true,
    reverse: true,
    perspective: 2000,
  });

  li.querySelector('.release-button').addEventListener('click', () => {
    const updated = pokemons.filter(p => p.id !== pokemon.id);
    localStorage.setItem('caughtPokemons', JSON.stringify(updated));
    renderCallback();
  });

  cardInner.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'textarea') return;
    cardInner.classList.toggle('flipped');
    tiltElement.vanillaTilt.destroy();
    const enableGyro = !cardInner.classList.contains('flipped');
    setTimeout(() => {
      VanillaTilt.init(tiltElement, {
        max: 15,
        speed: 200,
        glare: true,
        "max-glare": 0.75,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        gyroscope: enableGyro,
        reverse: true,
        perspective: 2000,
      });
    }, 500);
  });

  const noteField = li.querySelector('textarea');
  noteField.value = pokemon.note || '';
  noteField.addEventListener('input', () => {
    pokemon.note = noteField.value;
    localStorage.setItem('caughtPokemons', JSON.stringify(pokemons));
  });

  return li;
}

function renderPokedex() {
  const grid = document.getElementById('todo-list');
  grid.innerHTML = '';
  const pokemons = JSON.parse(localStorage.getItem('caughtPokemons')) || [];

  pokemons.forEach(pokemon => {
    const card = renderPokedexCard(pokemon, pokemons, renderPokedex);
    grid.appendChild(card);
  });
}

// collapse function for 'How to'
const helpButton = document.getElementById('toggle-help');
const helpText = document.getElementById('help-text');
if (helpButton && helpText) {
  helpButton.addEventListener('click', () => {
    helpText.classList.toggle('hidden');
  });
}
