export interface PokemonI {
    id: number
    name: string
    photoURL: string
    height: number
    weight: number
    types: PokemonTypeInformationI[]
    stats: PokemonStatI[]
}

export interface PokemonStatI {
    name: string
    baseState: number
    effort: 0
}

export interface PokemonTypeInformationI {
    slot: number
    type: PokemonTypeI
}

export interface PokemonTypeI {
    name: string
    url: string
}