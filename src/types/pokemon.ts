export interface PokemonI {
    id: number
    name: string
    photoURL: string
    height: number
    weight: number
    types: string[]
    stats: PokemonStatI[]
}

export interface PokemonStatI {
    name: string
    baseState: number
    effort: 0
}