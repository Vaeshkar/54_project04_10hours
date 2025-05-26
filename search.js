const button = document.getElementById('searchButton');

// Path to resource
const path = 'https://pokeapi.co/api/v2/pokemon';
// Pokemon ID
let pokeId = 1;
// Pokemon Name
let pokeName = 'name';

// Function: searchPokemon (by ID or Name will return on the page the found pokemons)
// The function should let the user enter the number or string and search by pressing 'enter' = eventlistener = keydown event === 'enter'

// Function: LimitInput (change the limit and press enter to start)
const searchInput = document.getElementById('search');
    searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        button.click();
    }
});

// function fetchAndRenderPokemons ( )
function fetchAndRenderPokemons() {
  const searchInput = document.getElementById('search');
  const pokeId = parseInt(searchInput.value, 1);

  // Fetch Pokémon with the search id
  fetch(`${path}/${pokeId}`)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch Pokémon list');
      return res.json();
    })
    .then(() => {
      const requests = [];
      return Promise.all(requests);
    })
    .then((pokemonSearchArray) => {
      // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      const slimData = pokemonSearchArray.map(p => ({
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
      localStorage.setItem('searchedPokemons', JSON.stringify(slimData));
      renderPokemons(slimData);
    })
    .catch((err) => {
      console.error(err);
      resetFetchButtonStyle();
    });
}

// Call fetchAndRenderPokemons on button click
button.addEventListener('click', fetchAndRenderPokemons);

// Function: renderPokemons (generates the Pokemon grid, set to the input limit)
// Info: Very large innerHTML for making the pokemon cards look good via JS. 
function renderPokemons(pokemonSearchArray) {
  // Clear previous, for testing mode
  // Still have it active. 
  // ul.innerHTML = '';

  pokemonSearchArray.forEach(data => {
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