import { PokemonType } from "@/types/PokemonType";
import { create } from "zustand";

type PokemonStore = {
    pokemon: PokemonType[]
    extendPokemon: (value: PokemonType[]) => void
}

const usePokemonStore = create<PokemonStore>()((set) => ({
    pokemon: [],
    extendPokemon: (values: PokemonType[]) => set((state) => ({pokemon: [...state.pokemon, ...values]}))
}))

export default usePokemonStore