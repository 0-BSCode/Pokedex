import { PokemonType } from "@/types/PokemonType";
import { create } from "zustand";

type PokemonStore = {
    pokemon: PokemonType[]
    push: (value: PokemonType) => void
    extend: (value: PokemonType[]) => void
}

const usePokemonStore = create<PokemonStore>()((set) => ({
    pokemon: [],
    push: (value: PokemonType) => set((state) => ({pokemon: [...state.pokemon, value]})),
    extend: (values: PokemonType[]) => set((state) => ({pokemon: [...state.pokemon, ...values]}))
}))

export default usePokemonStore