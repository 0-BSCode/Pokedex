import { PokemonTypesEnum } from "@/types/enums/PokemonTypesEnum"

const typeToColorStringMapping: Record<PokemonTypesEnum, string> = {
  [PokemonTypesEnum.BUG]: "#A6B91A",
  [PokemonTypesEnum.DARK]: "#705746",
  [PokemonTypesEnum.DRAGON]: "#6F35FC",
  [PokemonTypesEnum.ELECTRIC]: "#F7D02C",
  [PokemonTypesEnum.FAIRY]: "#D685AD",
  [PokemonTypesEnum.FIGHTING]: "#C22E28",
  [PokemonTypesEnum.FIRE]: "#EE8130",
  [PokemonTypesEnum.FLYING]: "#A98FF3",
  [PokemonTypesEnum.GHOST]: "#735797",
  [PokemonTypesEnum.GRASS]: "#7AC74C",
  [PokemonTypesEnum.GROUND]: "#E2BF65",
  [PokemonTypesEnum.ICE]: "#96D9D6",
  [PokemonTypesEnum.NORMAL]: "#A8A77A",
  [PokemonTypesEnum.POISON]: "#A33EA1",
  [PokemonTypesEnum.PSYCHIC]: "#F95587",
  [PokemonTypesEnum.ROCK]: "#B6A136",
  [PokemonTypesEnum.STEEL]: "#B7B7CE",
  [PokemonTypesEnum.WATER]: "#6390F0",
}

const determineTypeColor = (type: PokemonTypesEnum): string => {
  return typeToColorStringMapping[type]
}

export default determineTypeColor
