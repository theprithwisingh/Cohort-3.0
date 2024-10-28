
/*async function getPokemonData() {
    try {
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
      let pokemon = await response.json();
      console.log('Pokemon Data:', pokemon.sprites.front_default);
    } catch (error) {
      console.error('Error loading pokemon:', error);
    }
  }
getPokemonData();*/

 // script.js

document.getElementById('fetch-btn').addEventListener('click', () => {
    const numberOfPokemon = document.getElementById('number').value;
    const pokemonType = document.getElementById('category').value;
    const cardContainer = document.querySelector('.card-container');

    // Clear previous results
    cardContainer.innerHTML = '';

    if (numberOfPokemon) {
        fetchPokemons(numberOfPokemon, pokemonType);
    } else {
        alert('Please enter a valid number of Pokémon!');
    }
});

async function fetchPokemons(count, type) {
    const pokemonIds = Array.from({ length: count }, () => Math.floor(Math.random() * 151) + 1); // Random IDs (from 1-151)
    const promises = pokemonIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));

    try {
        const pokemons = await Promise.all(promises);
        const filteredPokemons = type ? pokemons.filter(pokemon => pokemon.types.some(t => t.type.name === type)) : pokemons;

        renderPokemons(filteredPokemons);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

function renderPokemons(pokemons) {
    const cardContainer = document.querySelector('.card-container');
    
    if (pokemons.length === 0) {
        cardContainer.innerHTML = `<p>No Pokémon found for the selected type.</p>`;
        return;
    }

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        `;

        cardContainer.appendChild(card);
    });
}
