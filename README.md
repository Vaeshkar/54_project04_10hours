

# 🐭⚡ Pokédex Diary

A collaborative web application project built by Dennis and Julien from the WBS Coding School Software Engineering Class 01. The project utilizes modern web APIs, TailwindCSS, and local storage to create a Pokédex diary where users can explore, catch, and add notes to their favorite Pokémon.

---

## Live Demo

https://vaeshkar.github.io/54_project04_10hours/

---

## 🚀 Project Overview

This project involves building a Pokédex Diary web app using the PokéAPI. Users can browse Pokémon, search by name or ID, catch them to save in their local Pokédex, and add personal notes to each one.

---

## 📁 File Structure

This project consists of two HTML pages:

- `index.html` – linked with `main.js`
- `pokedex.html` – linked with `pokedex.js`

---

## 🌐 Functional Requirements

### Shared Requirements

| ID      | Requirement                          | Description                                                        |
|---------|--------------------------------------|--------------------------------------------------------------------|
| FR001   | Group Project                        | Work collaboratively; all members share responsibility.            |
| FR002   | Follow Group‑Work Guidelines         | Adhere to the bootcamp’s group‑work best‑practices.                |
| FR003   | Public GitHub Repository             | Store all code in a single public repo; do not add instructors.    |
| FR004   | Incremental Development with PRs     | Merge every change into main via Pull Requests.                    |
| FR005   | Core Web APIs Usage                  | Demonstrate DOM, Web Storage, and Fetch APIs.                      |
| FR006   | TailwindCSS Styling                  | Style the application exclusively with TailwindCSS.                |

### Pokédex Diary Requirements

| ID      | Requirement               | Description                                                                 |
|---------|---------------------------|-----------------------------------------------------------------------------|
| FR007   | File Structure            | Two pages: `index.html` ↔ `main.js`, `pokedex.html` ↔ `pokedex.js`         |
| FR008   | Navigation Bar            | Navbar on both pages to switch between Homepage and Pokédex                |
| FR009   | Fetch Pokémon List        | On Homepage, fetch and display a list of Pokémon from the PokéAPI         |
| FR010   | Search with Dialog        | Search by name or ID, show results/feedback in a dialog                    |
| FR011   | Pokémon Cards             | Display each Pokémon’s image, name, and stats in a card                    |
| FR012   | Catch’em!                 | “Catch” button stores the Pokémon as an object in localStorage            |
| FR013   | Pokédex Page Display      | Pokédex page lists caught Pokémon from localStorage                        |
| FR014   | Personal Notes            | Allow adding notes per Pokémon; persist in localStorage                    |

---

## 💡 Tips for Effective Planning

- **Daily stand-ups**: Use them to keep your instructor informed and share insights with peers.
- **Stay organized**: Create your own Trello board or planning tool.
- **Ask for help**: If you're stuck for more than 30 minutes, reach out!

---

## 👥 Contributors

- Dennis – WBS Software Engineering Class 01
- Julien – WBS Software Engineering Class 01

## 📦 Dependencies

This project uses the following libraries and APIs:

- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework for styling.
- [VanillaTilt.js](https://micku7zu.github.io/vanilla-tilt.js/) – Adds 3D tilt and glare effects to cards.
- [PokéAPI](https://pokeapi.co/) – Public API for Pokémon data.
- [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) – For dynamic rendering and interactions.
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) – For saving caught Pokémon and notes in localStorage.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) – To retrieve data from PokéAPI.

---

## 📝 Changelog


- Refactored project structure:
- Modularized code into `utils.js` for shared logic and styling helpers.
- Activated search bar for querying by Pokémon name or ID.
- Merged `search.js` functionality into `main.js` to simplify script loading.
- Added "❌ Clear Search Results" button above results grid.
- Unified duplicated render logic into a single `createPokemonCard()` function.
- Added a Favicon
- Added disko on the backcard: rotating glitter
- Refactored pokedex card rendering into `renderPokedexCard(pokemon)` for modularity.
- Centralized Pokémon type color logic with shared `getPokemonColors()` helper function.
- Slimmed down stored Pokémon data using only essential fields (id, name, image, types, stats), enabling storage of all 1302 Pokémon under 2.5MB localStorage budget.
- Added 'How to' collapsible section with a click function
- Small TailwindCSS class updates for Mobile
- Made Pokémon cards flippable on click to reveal a note-taking back side styled with a TCG card image.
- Persisted personal notes per Pokémon in localStorage, synced with card back textarea.
- Prevented accidental card flip when interacting with note fields using event bubbling guards.
- Integrated Poké Ball glare overlay on card backs using layered blend mode styling.
- Adjusted card flip logic for more intuitive interaction without hover triggers.
- Restructured layout with `flex-grow` containers to keep footer anchored at the bottom.
- Tuned background glare effect to remain subtle and not obscure card art.
- Updated the Grid design and card positions
- Applied gradient-clipped text styling with shadow overlays to Pokémon names and stats for visual emphasis.
- Colored type badges with full Pokémon type color and black border for clarity and contrast.
- Added a darker gradient background to the stats section for improved readability.
- Final visual tuning with layered effects, shadows, and color cohesion for card polish.
- Integrated glitter and grain texture overlay using separate CSS background layers.
- Moved inline body background styles into external `style.css` for cleaner control.
- Tuned glitter/grain effect visibility with adjusted opacity and filter values.
- Added click-to-zoom effect for Pokémon cards with smooth scaling and tilt preservation.
- Improved zoom transition by scaling cards from their original position using `getBoundingClientRect`.
- Introduced solid white background behind card content to prevent layering and transparency issues.
- Enabled pressing Enter in the input field to trigger fetch.
- Added pointer cursor on hover to indicate card interactivity.
- Applied subtle drop shadow to all Pokémon cards for visual depth.
- Dennis and Julien implemented dynamic card rendering using the PokéAPI.
- Introduced randomized Pokémon fetch with visual styling based on type.
- Added 3D parallax tilt effect with layered `translateZ` visuals.
- Refined card layout with strict sizing and responsive grid structure.
- Julien Started with the 2xHTML and 2xJS files
- Dennis Started making the Git Repo and invite Julien
