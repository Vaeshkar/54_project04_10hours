export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'max-w-[1000px] w-full bg-white rounded-t-lg m-auto mt-4 p-6';
  footer.innerHTML = `
    <div class="wrapper flex flex-col text-center gap-2">
      <p>&copy; 2025 – <a class="" href="./index.html" target="_self">🐭⚡ Pokédex Diary</a> / 
      <a class="" href="https://wbscodingschool.com/" target="_blank">WBS Coding School</a> – Project 04</p>
      <p>Made with ❤️ and by hand from: 
      <a class="pokemon-blue" href="https://github.com/ChaOscDelEch" target="_blank">Julien</a> and 
      <a class="pokemon-blue" href="http://github.com/Vaeshkar" target="_blank">Dennis</a>.</p>
    </div>
  `;
  document.body.appendChild(footer);
}