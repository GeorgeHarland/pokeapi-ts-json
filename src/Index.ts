import fetch from 'node-fetch'

console.log('------------------')

const POKEMON_INDEX: Number = 1
let speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/" + POKEMON_INDEX

async function getImage(): Promise<String> {
    let response = await fetch(speciesUrl)
    let json = await response.json()

    let image_response = await fetch("https://pokeapi.co/api/v2/pokemon/" + json.name)
    let image_json = await image_response.json()

    return image_json.sprites.front_default
}

async function saveImage(): Promise<void> {
    await getImage()
    console.log("Image found.")
}

saveImage()


// save image
// create mock response