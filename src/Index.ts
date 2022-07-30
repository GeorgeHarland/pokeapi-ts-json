import fetch from 'node-fetch'

console.log('------------------')

const INPUT_INDEX: number = 1

type pkTypes = {
    type1: string;
    type2?: string;
}

type Pokemon = {
    index: number;
    name: string;
    pkTypes: pkTypes;
    image: any;
}

async function findPokemonFromIndex(pkIndex: number): Promise<any> {
    let speciesData = await requestSpeciesData(pkIndex)
    let pkName = speciesData.name
    let pkURL = constructPokemonURL(pkName)
    let pkData = await requestPokemonData(pkURL)
    return buildPokemon(pkIndex, pkName, pkData)
}

async function requestSpeciesData(pkIndex: number): Promise<any> {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pkIndex)
    return await response.json()
}

function constructPokemonURL(pkName: string): string {
    return "https://pokeapi.co/api/v2/pokemon/" + pkName
}

async function requestPokemonData(pkURL: string): Promise<any> {
    return (await fetch(pkURL)).json()
}

function buildPokemon(pkIndex: number, pkName: string, pkData: any): Pokemon {
    return {
        index: pkIndex,
        name: pkName,
        pkTypes: {type1: 'grass', type2: 'fire'},
        image: pkData.sprites.front_default
    }
}

findPokemonFromIndex(INPUT_INDEX).then((pokemon) => console.log(pokemon))