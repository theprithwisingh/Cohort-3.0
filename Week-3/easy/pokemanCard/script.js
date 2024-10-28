document.getElementById('search-btn').addEventListener('click', () => {
    const pokemonType = document.getElementById('category').value || 'electric';
    const numberOfPokemon = document.getElementById('number').value || 10; // Default to 10 if not entered
    const cardContainer = document.querySelector('.card-container');

    // Clear the previous list
    cardContainer.innerHTML = '';

    // Fetch Pokémon by type
    fetchPokemonsByType(pokemonType, numberOfPokemon);
});

async function fetchPokemonsByType(type, count) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();

        // Get a list of Pokémon from this type
        const pokemonList = data.pokemon.slice(0, count); // Limit by count

        // Fetch individual Pokémon data and render cards
        for (let pokemonData of pokemonList) {
            const pokemonURL = pokemonData.pokemon.url;
            const pokemon = await fetchPokemonData(pokemonURL);
            renderPokemonCard(pokemon);
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

async function fetchPokemonData(url) {
    const response = await fetch(url);
    return await response.json();
}

function renderPokemonCard(pokemon) {
    const cardContainer = document.querySelector('.card-container');
    
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;

    cardContainer.appendChild(card);
}
