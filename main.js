import * as utils from './utils/utils.js';

// Clear results button logic
const clearButton = document.getElementById('clear-results');
if (clearButton) {
  clearButton.addEventListener('click', () => {
    utils.searchUl.innerHTML = '';
    // utils.ul.innerHTML = '';
  });
}

const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

if (searchInput && searchButton) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchButton.click();
    }
  });

  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchAndRenderSearchPokemon();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('lastFetchedPokemons');
  if (stored) {
    renderPokemons(JSON.parse(stored));
  } else {
    fetchAndRenderPokemons();
  }
});

utils.fetchButton.addEventListener('click', fetchAndRenderPokemons);

document.getElementById('toggle-help').addEventListener('click', () => {
  const help = document.getElementById('help-text');
  help.classList.toggle('hidden');
});

document.getElementById('enable-gyro').addEventListener('click', async () => {
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      alert(response === 'granted' ? "Gyroscope enabled!" : "Permission denied.");
    } catch (e) {
      console.error("Gyroscope permission error:", e);
    }
  } else {
    alert("Your device or browser does not support motion permissions.");
  }
});


// Function: LimitInput (change the limit and press enter to start)
const limitInput = document.getElementById('poke-limit');
limitInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    utils.fetchButton.click();
  }
});

// Helper function: createPokemonCard
function createPokemonCard(data, targetUl) {
  const { colors, gradient: bgStyle } = utils.getPokemonColors(data.types);

  const li = document.createElement('li');
  li.classList.add('flex', 'items-center', 'justify-around', 'py-2', 'rounded');
  li.innerHTML = `
    <div class="zoom-wrapper cursor-pointer">
      <div class="tilt-card p-1 rounded-xl w-[285px] h-[400px] overflow-visible shadow-md relative" style="${bgStyle}; border: 12px solid #ffcc00; border-radius: 1.5rem; transform-style: preserve-3d; transform: perspective(1000px);">
        <div class="grain-glitter-layer absolute inset-0 pointer-events-none z-0 rounded-xl"></div>
        <div style="background-color: rgba(255, 255, 255, 0.25); transform: translateZ(${utils.translateZValue}px);" class="rounded-lg w-full h-full p-4 flex flex-col items-center text-center shadow-lg relative">
          <button class="catch-button absolute top-1 right-1 text-black text-xs font-bold px-1 py-1 z-2 flex flex-col items-center gap-0.5 cursor-pointer hover:scale-115 transform transition-all">
            <img src="./images/pokeball_icon.png" alt="Poké Ball" class="w-8 h-8" />
            Catch
          </button>
          <img class="h-42 mb-2" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"/>
          <h2 class="text-xl font-bold capitalize" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}); -webkit-background-clip: text; color: transparent; text-shadow: -1px -1px 0 black;">${data.name}</h2>
          <div class="flex justify-center gap-x-2 gap-y-1 flex-wrap w-full mt-2 mb-2">
            ${(data.types || []).map(t => `<span class="px-2 py-1 rounded-full text-xs text-black border border-black border-opacity-50" style="background-color: ${utils.typeColors[t.type.name]};">${t.type.name}</span>`).join('')}
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

  targetUl.appendChild(li);

  li.querySelector('.catch-button').addEventListener('click', () => {
    utils.catchPokemon(data);
  });

  utils.applyTiltEffect(li.querySelectorAll(".tilt-card"));
  const wrapper = li.querySelector('.zoom-wrapper');
  utils.setupZoomEffect(wrapper, data);
}

function renderPokemons(pokemonArray) {
  utils.ul.innerHTML = '';
  pokemonArray.forEach(p => createPokemonCard(p, utils.ul));
  utils.resetFetchButtonStyle();
}

function fetchAndRenderSearchPokemon() {
  const input = searchInput.value.trim().toLowerCase();
  if (!input) return;

  fetch(`${utils.path}/${input}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Pokémon "${input}" not found.`);
      }
      return res.json();
    })
    .then((p) => {
      const slimData = [{
        id: p.id,
        name: p.name,
        types: p.types,
        stats: p.stats,
        sprites: {
          other: {
            "official-artwork": {
              front_default: p.sprites.other["official-artwork"].front_default
            }
          }
        }
      }];
      localStorage.setItem('searchedPokemons', JSON.stringify(slimData));
      renderSearchResults(slimData);
      searchInput.value = '';
      // utils.ul.innerHTML = '';
    })
    .catch((err) => {
      console.error('Fetch error:', err);
      alert(err.message);
    });
}

function renderSearchResults(pokemonArray) {
  utils.searchUl.innerHTML = '';
  pokemonArray.forEach(p => createPokemonCard(p, utils.searchUl));
  utils.resetFetchButtonStyle();
}

// function fetchAndRenderPokemons ( )
function fetchAndRenderPokemons() {
  utils.fetchButton.disabled = true;
  utils.fetchButton.classList.remove('bg-pokemon-yellow', 'hover:bg-pokemon-orange');
  utils.fetchButton.classList.add('bg-gray-300', 'hover:bg-gray-300');

  const limitInput = document.getElementById('poke-limit');
  const limit = parseInt(limitInput.value, 10);

  // Fetch Pokémon list with ?limit=X
  fetch(`${utils.path}?limit=${limit}`)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch Pokémon list');
      return res.json();
    })
    .then(() => {
      const maxId = 1017; // Max safe Pokemons from https://pokeapi.co/ – Timestamp: 03.2025
      const requests = [];
      for (let i = 0; i < limit; i++) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        requests.push(fetch(`${utils.path}/${randomId}`).then(res => res.json()));
      }
      return Promise.all(requests);
    })
    .then((pokemonArray) => {
      // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      const filtered = pokemonArray.filter(p => p && p.sprites?.other?.["official-artwork"]?.front_default);
      const slimData = filtered.map(p => ({
        id: p.id,
        name: p.name,
        types: p.types,
        stats: p.stats,
        sprites: {
          other: {
            "official-artwork": {
              front_default: p.sprites.other["official-artwork"].front_default
            }
          }
        }
      }));
      localStorage.setItem('lastFetchedPokemons', JSON.stringify(slimData));
      renderPokemons(slimData);
    })
    .catch((err) => {
      console.error(err);
      utils.resetFetchButtonStyle();
    });
}