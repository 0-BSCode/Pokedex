import { PokemonTypesEnum } from "@/types/enums/PokemonTypesEnum"

// TODO: Sort by enum
const typeToColorStringMapping: Record<PokemonTypesEnum, string> = {
  [PokemonTypesEnum.NORMAL]: "#A8A77A",
  [PokemonTypesEnum.FIRE]: "#EE8130",
  [PokemonTypesEnum.WATER]: "#6390F0",
  [PokemonTypesEnum.ELECTRIC]: "#F7D02C",
  [PokemonTypesEnum.GRASS]: "#7AC74C",
  [PokemonTypesEnum.ICE]: "#96D9D6",
  [PokemonTypesEnum.FIGHTING]: "#C22E28",
  [PokemonTypesEnum.POISON]: "#A33EA1",
  [PokemonTypesEnum.GROUND]: "#E2BF65",
  [PokemonTypesEnum.FLYING]: "#A98FF3",
  [PokemonTypesEnum.PSYCHIC]: "#F95587",
  [PokemonTypesEnum.BUG]: "#A6B91A",
  [PokemonTypesEnum.ROCK]: "#B6A136",
  [PokemonTypesEnum.GHOST]: "#735797",
  [PokemonTypesEnum.DRAGON]: "#6F35FC",
  [PokemonTypesEnum.DARK]: "#705746",
  [PokemonTypesEnum.STEEL]: "#B7B7CE",
  [PokemonTypesEnum.FAIRY]: "#D685AD",
}

const determineTypeColor = (type: PokemonTypesEnum): string => {
  return typeToColorStringMapping[type]
}

export default determineTypeColor
