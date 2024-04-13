import { PokemonTypesEnum } from '@/types/enums/PokemonTypesEnum'

// Source: https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses
const typeToWeaknessMapping: Record<PokemonTypesEnum, PokemonTypesEnum[]> = {
  [PokemonTypesEnum.BUG]: [
    PokemonTypesEnum.FIGHTING,
    PokemonTypesEnum.FLYING,
    PokemonTypesEnum.POISON,
    PokemonTypesEnum.GHOST,
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.FIRE,
    PokemonTypesEnum.FAIRY,
  ],
  [PokemonTypesEnum.DARK]: [
    PokemonTypesEnum.FIGHTING,
    PokemonTypesEnum.DARK,
    PokemonTypesEnum.FAIRY,
  ],
  [PokemonTypesEnum.DRAGON]: [PokemonTypesEnum.STEEL, PokemonTypesEnum.FAIRY],
  [PokemonTypesEnum.ELECTRIC]: [
    PokemonTypesEnum.GROUND,
    PokemonTypesEnum.GRASS,
    PokemonTypesEnum.ELECTRIC,
    PokemonTypesEnum.DRAGON,
  ],
  [PokemonTypesEnum.FAIRY]: [
    PokemonTypesEnum.POISON,
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.FIRE,
  ],
  [PokemonTypesEnum.FIGHTING]: [
    PokemonTypesEnum.FLYING,
    PokemonTypesEnum.POISON,
    PokemonTypesEnum.PSYCHIC,
    PokemonTypesEnum.BUG,
    PokemonTypesEnum.GHOST,
    PokemonTypesEnum.FAIRY,
  ],
  [PokemonTypesEnum.FIRE]: [
    PokemonTypesEnum.ROCK,
    PokemonTypesEnum.FIRE,
    PokemonTypesEnum.WATER,
    PokemonTypesEnum.DRAGON,
  ],
  [PokemonTypesEnum.FLYING]: [
    PokemonTypesEnum.ROCK,
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.ELECTRIC,
  ],
  [PokemonTypesEnum.GHOST]: [PokemonTypesEnum.NORMAL, PokemonTypesEnum.DARK],
  [PokemonTypesEnum.GRASS]: [
    PokemonTypesEnum.FLYING,
    PokemonTypesEnum.POISON,
    PokemonTypesEnum.BUG,
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.FIRE,
    PokemonTypesEnum.GRASS,
    PokemonTypesEnum.DRAGON,
  ],
  [PokemonTypesEnum.GROUND]: [
    PokemonTypesEnum.FLYING,
    PokemonTypesEnum.BUG,
    PokemonTypesEnum.GRASS,
  ],
  [PokemonTypesEnum.ICE]: [
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.FIRE,
    PokemonTypesEnum.WATER,
    PokemonTypesEnum.ICE,
  ],
  [PokemonTypesEnum.NORMAL]: [
    PokemonTypesEnum.ROCK,
    PokemonTypesEnum.GHOST,
    PokemonTypesEnum.STEEL,
  ],
  [PokemonTypesEnum.POISON]: [
    PokemonTypesEnum.POISON,
    PokemonTypesEnum.GROUND,
    PokemonTypesEnum.ROCK,
    PokemonTypesEnum.GHOST,
    PokemonTypesEnum.STEEL,
  ],
  [PokemonTypesEnum.PSYCHIC]: [
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.PSYCHIC,
    PokemonTypesEnum.DARK,
  ],
  [PokemonTypesEnum.ROCK]: [
    PokemonTypesEnum.FIGHTING,
    PokemonTypesEnum.GROUND,
    PokemonTypesEnum.STEEL,
  ],
  [PokemonTypesEnum.STEEL]: [
    PokemonTypesEnum.STEEL,
    PokemonTypesEnum.FIRE,
    PokemonTypesEnum.WATER,
    PokemonTypesEnum.ELECTRIC,
  ],
  [PokemonTypesEnum.WATER]: [
    PokemonTypesEnum.WATER,
    PokemonTypesEnum.GRASS,
    PokemonTypesEnum.DRAGON,
  ],
}

const determineTypesWeaknesses = (
  types: PokemonTypesEnum[],
): PokemonTypesEnum[] => {
  const weaknesses = types.flatMap(type => typeToWeaknessMapping[type])
  return [...new Set(weaknesses)]
}

export default determineTypesWeaknesses
