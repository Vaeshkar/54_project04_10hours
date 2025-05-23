const button = document.getElementById('fetch-poke');
const ul = document.getElementById('todo-list');
// Path to resource
const path = 'https://pokeapi.co/api/v2/pokemon';
// Pokemon ID
let pokeId = 1;
let translateZValue = 8;

// Pokemon BG-Colors by element power.
const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Function: resetFetchButtonStyle (self explanatory)
function resetFetchButtonStyle() {
  button.disabled = false;
  button.classList.remove('bg-gray-300', 'hover:bg-gray-300');
  button.classList.add('bg-pokemon-yellow', 'hover:bg-pokemon-orange');
}

// Function: replyTiltEffect (makes the cards move on the mouse event)
// source: 
// https://micku7zu.github.io/vanilla-tilt.js/
function applyTiltEffect(elements) {
  VanillaTilt.init(elements, {
    max: 15,
    speed: 200,
    glare: true,
    "max-glare": 0.75,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    gyroscope: true,
    reverse: true,
    perspective: 2000,
  });
}

// Function: setupZoomEffect (makes a clone of the card and animate zooms it)
function setupZoomEffect(wrapper, data) {
  wrapper.addEventListener('click', (e) => {
    e.stopPropagation();

    const existingZoom = document.querySelector('.zoom-clone');
    if (existingZoom) existingZoom.remove();

    const rect = wrapper.getBoundingClientRect();
    const clone = wrapper.cloneNode(true);
    clone.classList.add('zoom-clone');
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.transformOrigin = 'center center';
    clone.style.transition = 'transform 0.3s ease, top 0.3s ease, left 0.3s ease';
    clone.style.zIndex = '999';

    document.body.appendChild(clone);
    clone.addEventListener('click', (event) => {
      event.stopPropagation();
      clone.remove();
    });

    const zoomInner = clone.querySelector('[style*="translateZ"]');
    if (zoomInner) {
      zoomInner.style.transform = `translateZ(${translateZValue * 4}px)`;
    }

    const catchButton = clone.querySelector('.catch-button');
    if (catchButton) {
      catchButton.addEventListener('click', (e) => {
        e.stopPropagation();
        catchPokemon(data);
      });
    }

    requestAnimationFrame(() => {
      clone.style.transform = 'scale(1.5)';
    });

    const closeZoom = (event) => {
      if (!clone.contains(event.target)) {
        clone.style.transform = 'scale(1)';
        setTimeout(() => {
          clone.remove();
        }, 300);
        document.removeEventListener('click', closeZoom);
      }
    };

    document.addEventListener('click', closeZoom);
    applyTiltEffect(clone.querySelectorAll(".tilt-card"));
  });
}

// Helper function to get colors and gradient for pokemon types
function getPokemonColors(types) {
  const typeNames = types.map(t => t.type.name);
  const colors = typeNames.map(type => typeColors[type]);
  const gradient = colors.length === 1
    ? `background: linear-gradient(135deg, ${colors[0]} 0%, rgba(255, 255, 255, 1) 100%)`
    : `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  return { colors, gradient };
}

// Function: catchPokemon (saves slimData on the localStorage)
function catchPokemon(data) {
  const caught = JSON.parse(localStorage.getItem('caughtPokemons')) || [];
  const alreadyCaught = caught.find(p => p.id === data.id);
  if (!alreadyCaught) {
    caught.push({
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      types: data.types.map(t => t.type.name),
      stats: data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    });
    localStorage.setItem('caughtPokemons', JSON.stringify(caught));
    alert(`${data.name} was added to your Pokédex!`);
  } else {
    alert(`${data.name} is already in your Pokédex.`);
  }
}

// Function: LimitInput (change the limit and press enter to start)
const limitInput = document.getElementById('poke-limit');
limitInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    button.click();
  }
});

// Function: renderPokemons (generates the Pokemon grid, set to the input limit)
// Info: Very large innerHTML for making the pokemon cards look good via JS. 
function renderPokemons(pokemonArray) {
  // Clear previous, for testing mode
  // Still have it active. 
  ul.innerHTML = '';

  pokemonArray.forEach(data => {
    const { colors, gradient: bgStyle } = getPokemonColors(data.types);

    const li = document.createElement('li');
    li.classList.add(
      'flex',
      'items-center',
      'justify-around',
      'py-2',
      'rounded',
    );
    // inject HTML Semantic with pokemoncard styles and updated tilt structure
    li.innerHTML = `
      <div class="zoom-wrapper cursor-pointer">
        <div class="tilt-card p-1 rounded-xl w-[285px] h-[400px] overflow-visible shadow-md relative" style="${bgStyle}; border: 12px solid #ffcc00; border-radius: 1.5rem; transform-style: preserve-3d; transform: perspective(1000px);">
          <div class="grain-glitter-layer absolute inset-0 pointer-events-none z-0 rounded-xl"></div>
              <div style="background-color: rgba(255, 255, 255, 0.25); transform: translateZ(${translateZValue}px);" class="rounded-lg w-full h-full p-4 flex flex-col items-center text-center shadow-lg relative" >
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
                    <span class="capitalize">
                      ${stat.stat.name}
                    </span>
                    <span>${stat.base_stat}</span>
                  </div>
                `).join('')}
              </div>
          </div>
        </div>
      </div>
    `;
    // add the cards
    ul.appendChild(li);
    // Click Event
    li.querySelector('.catch-button').addEventListener('click', () => {
      catchPokemon(data);
    });

    // Card titling
    applyTiltEffect(li.querySelectorAll(".tilt-card"));

    // DOM Grab
    const wrapper = li.querySelector('.zoom-wrapper');

    // Click Event
    // Source: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
    // Variations: preventDefault() or stopImmediateProgastion()
    setupZoomEffect(wrapper, data);
  });

  resetFetchButtonStyle();
}

function fetchAndRenderPokemons() {
  button.disabled = true;
  button.classList.remove('bg-pokemon-yellow', 'hover:bg-pokemon-orange');
  button.classList.add('bg-gray-300', 'hover:bg-gray-300');

  const limitInput = document.getElementById('poke-limit');
  const limit = parseInt(limitInput.value, 10);

  // Fetch Pokémon list with ?limit=X
  fetch(`${path}?limit=${limit}`)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch Pokémon list');
      return res.json();
    })
    .then(() => {
      const maxId = 1017; // Max safe Pokemons from https://pokeapi.co/ – Timestamp: 03.2025
      const requests = [];
      for (let i = 0; i < limit; i++) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        requests.push(fetch(`${path}/${randomId}`).then(res => res.json()));
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
      resetFetchButtonStyle();
    });
}

// Call fetchAndRenderPokemons on button click
button.addEventListener('click', fetchAndRenderPokemons);

// Call renderPokemons with stored data or fetch new on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('lastFetchedPokemons');
  if (stored) {
    renderPokemons(JSON.parse(stored));
  } else {
    fetchAndRenderPokemons();
  }
});

// collapse function for 'How to'
document.getElementById('toggle-help').addEventListener('click', () => {
  const help = document.getElementById('help-text');
  help.classList.toggle('hidden');
});

// Gyroscope permission request handler
document.getElementById('enable-gyro').addEventListener('click', async () => {
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response === 'granted') {
        alert("Gyroscope enabled!");
      } else {
        alert("Permission denied.");
      }
    } catch (e) {
      console.error("Gyroscope permission error:", e);
    }
  } else {
    alert("Your device or browser does not support motion permissions.");
  }
});