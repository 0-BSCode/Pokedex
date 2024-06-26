import { PokemonType } from "@/types/PokemonType"
import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import { SortOrderEnum } from "@/types/enums/SortOrderEnum"
import { create } from "zustand"

type PokemonStore = {
  pokemon: PokemonType[]
  filteredPokemon: PokemonType[]
  pokemonIdx: number
  extendPokemon: (value: PokemonType[]) => void
  setPokemonIdx: (value: number) => void
  searchPokemon: (criteria: FilterCriteriaEnum, searchString: string) => void
  sortPokemon: (criteria: FilterCriteriaEnum, sortOrder: SortOrderEnum) => void
}

const usePokemonStore = create<PokemonStore>()(set => ({
  pokemon: [],
  filteredPokemon: [],
  pokemonIdx: -1,
  setPokemonIdx: (value: number) => set(state => ({ pokemonIdx: value })),
  extendPokemon: (values: PokemonType[]) =>
    set(state => ({
      pokemon: [...state.pokemon, ...values],
      filteredPokemon: [...state.pokemon, ...values],
    })),
  searchPokemon: (criteria: FilterCriteriaEnum, searchString: string) =>
    set(state => {
      let filteredPokemon = state.pokemon

      if (searchString.length) {
        if (criteria === FilterCriteriaEnum.NAME) {
          filteredPokemon = state.pokemon.filter(pokemon =>
            pokemon.name.toLowerCase().startsWith(searchString.toLowerCase()),
          )
        }

        if (
          criteria === FilterCriteriaEnum.ID &&
          !isNaN(Number(searchString))
        ) {
          filteredPokemon = state.pokemon.filter(
            pokemon => pokemon.id === Number(searchString),
          )
        }
      }

      return {
        filteredPokemon,
      }
    }),
  // Sorts only the filtered Pokemon (since other Pokemon won't be displayed)
  sortPokemon: (criteria: FilterCriteriaEnum, sortOrder: SortOrderEnum) =>
    set(state => {
      const sortedPokemon = state.filteredPokemon.sort((a, b) => {
        if (criteria === FilterCriteriaEnum.NAME) {
          if (a.name < b.name) return sortOrder === SortOrderEnum.ASC ? -1 : 1
          if (a.name > b.name) return sortOrder === SortOrderEnum.ASC ? 1 : -1
        }

        if (criteria === FilterCriteriaEnum.ID) {
          return sortOrder === SortOrderEnum.ASC ? a.id - b.id : b.id - a.id
        }

        return 0
      })

      return {
        filteredPokemon: sortedPokemon,
      }
    }),
}))

export default usePokemonStore
