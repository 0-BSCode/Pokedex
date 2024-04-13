export interface PokemonI {
    id: number
    name: string
    photoURL: string
    height: number
    weight: number
    types: PokemonTypeInformationI[]
    stats: PokemonStatInformationI[]
}

export interface PokemonStatInformationI {
    // TODO: Standardize to camel case
    base_stat: number
    effort: 0
    stat: PokemonStatI
}

export interface PokemonStatI {
    name: string
    url: string
}

export interface PokemonTypeInformationI {
    slot: number
    type: PokemonTypeI
}

export interface PokemonTypeI {
    name: string
    url: string
}