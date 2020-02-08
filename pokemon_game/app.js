console.log('hi');

const $pokemonList = []
for (let i = 1; i <= 150; i++){
    const $url = `https://pokeapi.co/api/v2/pokemon/${i}`

    $.ajax ({
        url: $url,
        type: "GET",

    }).then((data) => {
        // console.log(data);
        const $pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
        }
        console.log($pokemon);
    })
}
