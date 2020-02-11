const $pokedex = $('#pokedex')
const $enemy = $('#enemy')
let pokemonList = []
const randomInt = () => {
    return Math.floor(Math.random() * 149)
}
const $openButton = $('#call-button');
const $modal = $('#modal');
const $runButton = $('#run')
const $fightButton = $('#fight')

// Modal functionality ========================//
const openModal = () => {
    $modal.css('display', 'block');
}
const closeModal = () => {
    $modal.css('display', 'none');
}


// ********************************************************//
// Getting the id of the pokemon clicked on home page //
// ********************************************************//

let params = new window.URLSearchParams(window.location.search);


// **********************************************************//
// Pokemon battle classes ===================================//
// **********************************************************//

// class PokemonFighter {
//     constructor(name, health, power, accuracy, id, image) {
//         this.name = name;
//         this.health = health;
//         this.power = power;
//         this.accuracy = accuracy;
//         this.id = id;
//         this.image = image;
//     }
//     checkEnemy(enemy) {
//         let i = Math.random()
//         if(i <= enemy.accuracy) {
//             console.log(this.name, 'has been hit!');
//             this.health -= enemy.power
//             openModal();
//             console.log(this.health);
//         } else {
//             openModal();
//             console.log(enemy.name, 'has missed their attack');
//         }
//     }
//
//     attack(enemy) {
//         let i = Math.random()
//         if (this.health <= 0) {
//             console.log(this.name, 'has been defeated! Reload the page or go back and pick another pokemon');
//             $pokedex.css('display', 'none')
//         }
//         if (i <= this.accuracy) {
//             console.log(enemy.name, 'has been hit!');
//             enemy.health -= this.power;
//             console.log(enemy.health);
//         } else {
//             console.log(this.name, 'has missed their attack');
//         };
//         if (enemy.health > 0) {
//             this.checkEnemy(enemy)
//         } else {
//             console.log('You have defeated', enemy.name, '.', enemy.name, 'is too weak to continue');
//             $enemy.css('display', 'none')
//             $openButton.show()
//             $enemy.empty()
//             getEnemy(randomInt())
//         }
//     }
//
// }


//================== On Load Function ==================//

$(() => {
    $openButton.on('click', (event) => {
        $openButton.hide();
        $enemy.css('display', 'block')
        openModal()
    });

    $runButton.on('click', () => {
        closeModal();
        $enemy.css('display', 'none')
        $enemy.empty()
        getEnemy(randomInt())
        $openButton.show()
    });

    $fightButton.on('click', () => {
        closeModal();
        $('.pokemon-info').hide()
        $modal.children('h1').html('You are currently in battle')
        $enemy.css('display', 'block')
        // pokemon.attack()
    });

    class PokemonFighter {
        constructor(name, health, power, accuracy, id, image) {
            this.name = name;
            this.health = health;
            this.power = power;
            this.accuracy = accuracy;
            this.id = id;
            this.image = image;
        }
        checkEnemy(enemy) {
            let i = Math.random()
            if(i <= enemy.accuracy) {
                console.log(this.name, 'has been hit!');
                this.health -= enemy.power
                openModal();
                console.log(this.health);
            } else {
                openModal();
                console.log(enemy.name, 'has missed their attack');
            }
        }

        attack(enemy) {
            let i = Math.random()
            if (this.health <= 0) {
                console.log(this.name, 'has been defeated! Reload the page or go back and pick another pokemon');
                $pokedex.css('display', 'none')
            }
            if (i <= this.accuracy) {
                console.log(enemy.name, 'has been hit!');
                enemy.health -= this.power;
                console.log(enemy.health);
            } else {
                console.log(this.name, 'has missed their attack');
            };
            if (enemy.health > 0) {
                this.checkEnemy(enemy)
            } else {
                console.log('You have defeated', enemy.name, '.', enemy.name, 'is too weak to continue');
                $enemy.css('display', 'none');
                alert('You have defeated your enemy. To play again, reload the page or go back and pick another pokemon.')
            }
        }

    }

    const getPokemon = (i) => {

            const $url = (`https://pokeapi.co/api/v2/pokemon/${i}`)

            $.ajax ({
                url: $url,
                type: 'Get',
                async: false,

            }).then((data) => {

                const pokemon = new PokemonFighter(data.name, 100, 50, .7, data.id, data.sprites['front_default'])
                $fightButton.on('click', () => {
                    closeModal();
                    $enemy.css('display', 'block')
                    pokemon.attack(pokemonList[0])
                });

                // console.log($pokemonInfo);
                displayPokemon(pokemon)

            })
    }
    const getEnemy = (i) => {
        // console.log(i);
            const $url = (`https://pokeapi.co/api/v2/pokemon/${i}`)

            $.ajax ({
                url: $url,
                type: 'Get',
                async: false,

            }).then((data) => {

                const enemy = new PokemonFighter(data.name, 150, 25, .5, data.id, data.sprites['front_default'])

                // console.log($pokemonInfo);
                displayEnemy(enemy)
                pokemonList.push(enemy);

            })
    }
// ********************************************************//
// Open modal functionality ==============================//
// ********************************************************//


// *******************************************************//
// Appending pokemon to the page =========================//
// *******************************************************//
const displayPokemon = (pokemon) => {
    pokemon = $(`
        <div class="pokemon">
                <img src="${pokemon.image}" alt="${pokemon.name}"/>
            <div class="pokemon-info">
                <h2>${pokemon.id}. ${pokemon.name}</h2>
                <p>HP: ${pokemon.health}</p>
                <p>Power: ${pokemon.power}</p>
            </div>
        </div>
    `)

    $pokedex.append(pokemon)
}

const displayEnemy = (enemy) => {
    enemy = $(`
        <div class="enemy">
                <img src="${enemy.image}" alt="${enemy.name}"/>
            <div class="pokemon-info">
                <h2>${enemy.id}. ${enemy.name}</h2>
                <p>HP: ${enemy.health}</p>
                <p>Power: ${enemy.power}</p>
            </div>
        </div>
    `)

    $enemy.append(enemy)
}


getPokemon(params.get('id'))
getEnemy(randomInt())
})
