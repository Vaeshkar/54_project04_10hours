export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'max-w-[1000px] m-auto flex flex-col md:flex-row justify-between items-center gap-4 bg-white mb-5 rounded-b-lg p-6';
  header.innerHTML = `
    <nav class="flex flex-col md:flex-row justify-center items-center gap-4">
      <a class="active transform transition-transform duration-300 hover:scale-105" href="#home" target="_self">🐭⚡ Pokédex Diary</a>
      <a class="inactive transform transition-transform duration-300 hover:scale-105" href="./pokédex.html">🦊⚡ Pokédex</a>
    </nav>
    <div class="opacity-50 cursor-not-allowed search-container flex items-center border-2 rounded-full">
      <form id="fetch-form" class="cursor-not-allowed px-4">
        <input class="cursor-not-allowed" type="text" placeholder="Search for Pokémon..." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>
    </div>
  `;
  document.body.prepend(header);
}