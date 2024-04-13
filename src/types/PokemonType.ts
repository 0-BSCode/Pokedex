import { PokemonTypesEnum } from "./enums/PokemonTypesEnum"

export interface PokemonType {
  id: number
  name: string
  photoUrl: string
  height: number
  weight: number
  types: PokemonTypeInformationType[]
  stats: PokemonStatInformationType[]
}

export interface PokemonStatInformationType {
  baseStat: number
  effort: number
  name: string
  url: string
}

export interface PokemonTypeInformationType {
  slot: number
  name: PokemonTypesEnum
  url: string
}
