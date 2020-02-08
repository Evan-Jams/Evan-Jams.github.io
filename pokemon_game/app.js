console.log('hi');



const $pokedex = $('#pokedex')
const pokemonList = []

$(() => {
const getPokemon = () => {
    for (let i = 1; i <= 150; i++){
        const $url = (`https://pokeapi.co/api/v2/pokemon/${i}`)

        $.ajax ({
            url: $url,
            type: 'Get',
            async: false,

        }).then((data) => {
            // console.log(data);
            const $pokemonInfo = {
                name: data.name,
                id: data.id,
                abilities: data.,
                image: data.sprites['front_default'],
            }
            // console.log($pokemonInfo);
            displayPokemon($pokemonInfo)
            pokemonList.push($pokemonInfo);
        })

    }

    // console.log(pokemonList);
}
getPokemon()

})

// console.log(pokemonList);

const displayPokemon = (pokemon) => {
    pokemon = $(`
        <div>
            <img src="${pokemon.image}"/>
            <h2>${pokemon.id}. ${pokemon.name}</h2>
            <p>Abilities: ${pokemon.abilities}</p>
        </div>`
    );
    $pokedex.append(pokemon)
}
