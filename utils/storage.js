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