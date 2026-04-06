const pokemonInput = document.getElementById("pokemon-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const resultarea = document.getElementById("result-area");
const pokemonSprite = document.getElementById("pokemon-sprite");
const pokemonTypes = document.getElementById("pokemon-types");
const errorarea = document.getElementById("error-area");
const errormessage = document.getElementById("error-message");
const loadingArea = document.getElementById("loading-area");
const defaultButtonLabel = searchButton.textContent;

function showLoading() {
  loadingArea.classList.remove("hidden");
  resultarea.classList.add("hidden");
  errorarea.classList.add("hidden");
  searchButton.disabled = true;
  searchButton.textContent = "Carregando...";
}

function hideLoading() {
  loadingArea.classList.add("hidden");
  searchButton.disabled = false;
  searchButton.textContent = defaultButtonLabel;
}

function searchPokemon() {
  const pokemonNameInput = pokemonInput.value.toLowerCase().trim();

  if (!pokemonNameInput) {
    displayError("Por favor, insira o nome ou id de um Pokémon.");
    return;
  }

  PokemonData(pokemonNameInput);
}

searchButton.addEventListener("click", searchPokemon);

pokemonInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});

async function PokemonData(pokemonName) {
  showLoading();

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );

    if (!response.ok) {
      throw new Error("Pokémon não encontrado.");
    }

    const data = await response.json();
    displayPokemonData(data);
    
  } catch (error) {
    displayError(error.message || "Pokémon não encontrado.");
  } finally {
    hideLoading();
  }
}

function displayPokemonData(data) {
  errorarea.classList.add("hidden");
  resultarea.classList.remove("hidden");
  pokemonName.textContent = data.name;
  pokemonSprite.src = data.sprites.front_default;
  pokemonSprite.alt = `Sprite de ${data.name}`;
  pokemonTypes.innerHTML = data.types
    .map(
      (type) => `<span class="type ${type.type.name}">${type.type.name}</span>`,
    )
    .join("");
}

function displayError(message) {
  resultarea.classList.add("hidden");
  errorarea.classList.remove("hidden");
  errormessage.textContent = message;
}
