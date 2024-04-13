import inferTypeFromString from "@/_utils/inferTypeFromString"
import { PaginationResponseType } from "@/types/PaginationResponseType"
import { PokemonResponseType } from "@/types/PokemonResponseType"
import { PokemonType } from "@/types/PokemonType"

const BASE_URL = "https://pokeapi.co/api/v2"
const LIMIT = 10
const OFFSET = 10

const PokemonService = {
  // TODO: Refactor names
  fetchPokemonPagination: async (pageNumber: number) => {
    const response = await fetch(
      `${BASE_URL}/pokemon/?limit=${LIMIT}&offset=${OFFSET * pageNumber}`,
    )
    const data = (await response.json()) as PaginationResponseType
    return data
  },
  fetchPokemon: async (url: string) => {
    // Fetch data
    const response = await fetch(url)
    const data = (await response.json()) as PokemonResponseType

    // Parse data
    const photoId = data.id.toString().padStart(3, "0")
    const photoUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${photoId}.png`
    const pokemonInfo: PokemonType = {
      id: data.id,
      name: data.name,
      height: data.height,
      photoUrl,
      stats: data.stats.map(s => ({
        baseStat: s.base_stat,
        effort: s.effort,
        name: s.stat.name,
        url: s.stat.url,
      })),
      types: data.types.map(t => ({
        name: inferTypeFromString(t.type.name),
        slot: t.slot,
        url: t.type.url,
      })),
      weight: data.weight,
    }
    return pokemonInfo
  },
}

export default PokemonService
