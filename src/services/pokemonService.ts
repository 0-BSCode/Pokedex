import { PaginationResponseI } from "@/types/apiResponse"
import { PokemonI } from "@/types/pokemon"

const BASE_URL = 'https://pokeapi.co/api/v2'
const LIMIT = 10

const PokemonService = {
    fetchPokemonPagination: async (offset: number) => {
        const response = await fetch(`${BASE_URL}/pokemon/?limit=${LIMIT}&offset=${offset}`)
        const data = await response.json() as PaginationResponseI
        return data
    },

    fetchPokemon: async (url: string) => {
        const response = await fetch(url)
        const data = await response.json() as PokemonI
        return data
    }
}

export default PokemonService