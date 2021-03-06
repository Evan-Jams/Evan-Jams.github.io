// console.log('hi');



const $pokedex = $('#pokedex')
const pokemonList = []




//=========================================================//
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
                const pokemon = {
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                }


                // console.log($pokemonInfo);
                displayPokemon(pokemon)
                pokemonList.push(pokemon);
            })

        }
        // sort array based on $pokemon id
    }

// Appending pokemon to the page =========================//
const displayPokemon = (pokemon) => {
    pokemon = $(`
        <div class="pokemon">
            <a href="pages/battle.html?id=${pokemon.id}">
                <img src="${pokemon.image}" alt="${pokemon.name}"/>
            </a>
            <div class="pokemon-info">
                <h2>${pokemon.id}. ${pokemon.name}</h2>
                <p>Power: 50</p>
            </div>
        </div>
    `)

    $pokedex.append(pokemon)
}

// Cycling through the pokedex functions =========================//
        let currentImgIndex = 0
        let maxIndex = 149

    $('#next').on('click', (event) => {
        event.preventDefault();
        $('#pokedex').children().eq(currentImgIndex).css('display', 'none');
        if (currentImgIndex < maxIndex) {
            currentImgIndex++
        } else {
            currentImgIndex = 0
        }
        $('#pokedex').children().eq(currentImgIndex).css('display', 'block');
    })
    $('#previous').on('click', (event) => {
        event.preventDefault();
        $('#pokedex').children().eq(currentImgIndex).css('display', 'none');
        if (currentImgIndex > 0) {
            currentImgIndex--
        } else {
            currentImgIndex = maxIndex
        }
        $('#pokedex').children().eq(currentImgIndex).css('display', 'block');
    })
//==================================================================//

getPokemon()

})
