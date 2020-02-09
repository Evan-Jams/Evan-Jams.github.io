const $pokedex = $('#pokedex')
const $enemy = $('#enemy')
const pokemonList = []
const randomInt = () => {
    return Math.floor(Math.random() * 149)
}
console.log(randomInt());
let params = new window.URLSearchParams(window.location.search);
// alert(params.get('id'))

//=========================================================//
$(() => {
    const getPokemon = (i) => {

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
    const getEnemy = (i) => {
        console.log(i);
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
                displayEnemy(pokemon)
                // pokemonList.push(pokemon);
            })
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

const displayEnemy = (enemy) => {
    enemy = $(`
        <div class="enemy">
            <a href="pages/battle.html?id=${enemy.id}">
                <img src="${enemy.image}" alt="${enemy.name}"/>
            </a>
            <div class="pokemon-info">
                <h2>${enemy.id}. ${enemy.name}</h2>
                <p>Power: 25</p>
            </div>
        </div>
    `)

    $enemy.append(enemy)
}

// Cycling through the pokedex functions =========================//
    //     let currentImgIndex = 0
    //     let maxIndex = 149
    //
    // $('#next').on('click', (event) => {
    //     event.preventDefault();
    //     $('#pokedex').children().eq(currentImgIndex).css('display', 'none');
    //     if (currentImgIndex < maxIndex) {
    //         currentImgIndex++
    //     } else {
    //         currentImgIndex = 0
    //     }
    //     $('#pokedex').children().eq(currentImgIndex).css('display', 'block');
    // })
    // $('#previous').on('click', (event) => {
    //     event.preventDefault();
    //     $('#pokedex').children().eq(currentImgIndex).css('display', 'none');
    //     if (currentImgIndex > 0) {
    //         currentImgIndex--
    //     } else {
    //         currentImgIndex = maxIndex
    //     }
    //     $('#pokedex').children().eq(currentImgIndex).css('display', 'block');
    // })
//==================================================================//

getPokemon(params.get('id'))
getEnemy(randomInt())
})
