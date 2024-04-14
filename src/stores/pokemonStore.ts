import { PokemonType } from "@/types/PokemonType"
import { SortOrderEnum } from "@/types/enums/SortOrderEnum"
import { create } from "zustand"

type PokemonStore = {
  pokemon: PokemonType[]
  filteredPokemon: PokemonType[]
  extendPokemon: (value: PokemonType[]) => void
  searchPokemon: (name: string, id: string) => void
  sortPokemon: (
    nameOrder: SortOrderEnum | undefined,
    idOrder: SortOrderEnum | undefined,
  ) => void
}

const usePokemonStore = create<PokemonStore>()(set => ({
  pokemon: [],
  filteredPokemon: [],
  extendPokemon: (values: PokemonType[]) =>
    set(state => ({
      pokemon: [...state.pokemon, ...values],
      filteredPokemon: [...state.pokemon, ...values],
    })),
  searchPokemon: (name: string, id: string) =>
    set(state => {
      const filteredPokemon = state.pokemon

      if (name.length) {
        filteredPokemon.filter(pokemon =>
          pokemon.name.toLowerCase().startsWith(name.toLowerCase()),
        )
      }

      // TODO: Input validation
      if (id.length) {
        filteredPokemon.filter(pokemon => pokemon.id === Number(id))
      }

      return {
        filteredPokemon,
      }
    }),
  // Sorts only the filtered Pokemon (since other Pokemon won't be displayed)
  sortPokemon: (
    nameOrder: SortOrderEnum | undefined,
    idOrder: SortOrderEnum | undefined,
  ) =>
    set(state => {
      const sortedPokemon = state.filteredPokemon.sort((a, b) => {
        if (nameOrder !== undefined) {
          if (a.name < b.name) return nameOrder === SortOrderEnum.ASC ? -1 : 1
          if (a.name > b.name) return nameOrder === SortOrderEnum.ASC ? 1 : -1
        }

        if (idOrder !== undefined) {
          return idOrder === SortOrderEnum.ASC ? a.id - b.id : b.id - a.id
        }

        return 0
      })

      return {
        filteredPokemon: sortedPokemon,
      }
    }),
}))

export default usePokemonStore
