window.addEventListener('DOMContentLoaded', renderPokedex);

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

function renderPokedex() {
  const grid = document.getElementById('todo-list');
  grid.innerHTML = '';
  const pokemons = JSON.parse(localStorage.getItem('caughtPokemons')) || [];

  pokemons.forEach(pokemon => {
    const colors = pokemon.types.map(type => typeColors[type]);
    const bgStyle = colors.length === 1
      ? `background: linear-gradient(135deg, ${colors[0]} 0%, rgba(255, 255, 255, 1) 100%)`
      : `background: linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;

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
                ${pokemon.types.map(t => `<span class="px-2 py-1 rounded-full text-xs text-black border border-black border-opacity-50" style="background-color: ${typeColors[t]};">${t}</span>`).join('')}
              </div>
              <div class="text-xs text-left w-full mt-auto" style="background: linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]}); -webkit-background-clip: text; color: transparent; text-shadow: -1px -1px 0 black;">
                ${pokemon.stats.map(stat => `
                  <div class="flex justify-between">
                    <span class="capitalize">${stat.name}</span>
                    <span>${stat.value}</span>
                  </div>
                `).join('')}
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
    grid.appendChild(li);

    // Vanilla Tilt
    VanillaTilt.init(li.querySelectorAll(".tilt-card"), {
      max: 15,
      speed: 200,
      glare: true,
      "max-glare": 0.75,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      gyroscope: true,
      reverse: true,
      perspective: 2000,
    });

    // Release button
    li.querySelector('.release-button').addEventListener('click', () => {
      const updated = pokemons.filter(p => p.id !== pokemon.id);
      localStorage.setItem('caughtPokemons', JSON.stringify(updated));
      renderPokedex();
    });

    // Toggle flip on card-inner click
    const cardInner = li.querySelector('.card-inner');
    const tiltElement = li.querySelector('.tilt-card');

    cardInner.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'textarea') return;

      // Temporarily disable tilt
      tiltElement.vanillaTilt.destroy();
      cardInner.classList.toggle('flipped');

      // Re-enable after animation
      setTimeout(() => {
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
      }, 500); // Matches transition duration
    });

    // Note saving
    const noteField = li.querySelector('textarea');
    noteField.value = pokemon.note || '';
    noteField.addEventListener('input', () => {
      pokemon.note = noteField.value;
      localStorage.setItem('caughtPokemons', JSON.stringify(pokemons));
    });

  });
}

// collapse function for 'How to'
document.getElementById('toggle-help').addEventListener('click', () => {
  const help = document.getElementById('help-text');
  help.classList.toggle('hidden');
});
