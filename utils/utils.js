export const fetchButton = document.getElementById('fetch-poke');
export const searchButton = document.getElementById('searchButton');
export const ul = document.getElementById('todo-list');
export const searchUl = document.getElementById('search-results');
// Path to resource
export const path = 'https://pokeapi.co/api/v2/pokemon';
// Pokemon ID
export let pokeId = 1;

export const translateZValue = 8;

export const typeColors = {
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
export function resetFetchButtonStyle() {
  fetchButton.disabled = false;
  fetchButton.classList.remove('bg-gray-300', 'hover:bg-gray-300');
  fetchButton.classList.add('bg-pokemon-yellow', 'hover:bg-pokemon-orange');
}

// Function: getPokemonColors 
export function getPokemonColors(types) {
  const typeNames = types.map(t =>
    typeof t === 'string' ? t : t.type.name
  );
  const colors = typeNames.map(type => typeColors[type]);
  const gradient = colors.length === 1
    ? `background: linear-gradient(135deg, ${colors[0]} 0%, rgba(255, 255, 255, 1) 100%)`
    : `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  return { colors, gradient };
}

// Function: replyTiltEffect (makes the cards move on the mouse event)
// source: 
// https://micku7zu.github.io/vanilla-tilt.js/
export function applyTiltEffect(elements) {
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
export function setupZoomEffect(wrapper, data) {
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

// Function: catchPokemon (saves slimData on the localStorage)
export function catchPokemon(data) {
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