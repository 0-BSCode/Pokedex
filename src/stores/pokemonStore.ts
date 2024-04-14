import { PokemonType } from "@/types/PokemonType"
import { SortOrderEnum } from "@/types/enums/SortOrderEnum"
import { create } from "zustand"

type PokemonStore = {
  pokemon: PokemonType[]
  filteredPokemon: PokemonType[]
  extendPokemon: (value: PokemonType[]) => void
  sortPokemonByName: (order: SortOrderEnum) => void
  sortPokemonById: (order: SortOrderEnum) => void
}

const usePokemonStore = create<PokemonStore>()(set => ({
  pokemon: [],
  filteredPokemon: [],
  extendPokemon: (values: PokemonType[]) =>
    set(state => ({ pokemon: [...state.pokemon, ...values] })),
  sortPokemonByName: (order: SortOrderEnum) =>
    set(state => {
      const sortedPokemon = state.pokemon
      sortedPokemon.sort((a, b) => {
        if (a.name < b.name) return order === SortOrderEnum.ASC ? -1 : 1
        if (a.name > b.name) return order === SortOrderEnum.ASC ? 1 : -1
        return 0
      })

      return {
        pokemon: sortedPokemon,
      }
    }),
  sortPokemonById: (order: SortOrderEnum) =>
    set(state => {
      const sortedPokemon = state.pokemon
      sortedPokemon.sort((a, b) =>
        order === SortOrderEnum.ASC ? a.id - b.id : b.id - a.id,
      )
      return {
        pokemon: sortedPokemon,
      }
    }),
}))

export default usePokemonStore
