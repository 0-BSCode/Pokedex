import { PokemonI } from "@/types/pokemon";
import { create } from "zustand";

type PokemonStore = {
    pokemon: PokemonI[]
    push: (value: PokemonI) => void
    extend: (value: PokemonI[]) => void
}

const usePokemonStore = create<PokemonStore>()((set) => ({
    pokemon: [],
    push: (value: PokemonI) => set((state) => ({pokemon: [...state.pokemon, value]})),
    extend: (values: PokemonI[]) => set((state) => ({pokemon: [...state.pokemon, ...values]}))
}))

export default usePokemonStore