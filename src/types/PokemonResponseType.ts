export interface PokemonResponseType {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonResponseTypeInformationType[]
  stats: PokemonResponseStatInformationType[]
}

export interface PokemonResponseStatInformationType {
  base_stat: number
  effort: 0
  stat: PokemonResponseStatType
}

export interface PokemonResponseStatType {
  name: string
  url: string
}

export interface PokemonResponseTypeInformationType {
  slot: number
  type: PokemonResponseTypeType
}

export interface PokemonResponseTypeType {
  name: string
  url: string
}
