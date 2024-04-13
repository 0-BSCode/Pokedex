import { PokemonTypesEnum } from "@/types/enums/PokemonTypesEnum";

const stringTypeToEnumMapping: Record<string, PokemonTypesEnum> = {
    "bug": PokemonTypesEnum.BUG,
    "dark": PokemonTypesEnum.DARK,
    "dragon": PokemonTypesEnum.DRAGON,
    "electric": PokemonTypesEnum.ELECTRIC,
    "fairy": PokemonTypesEnum.FAIRY,
    "fighting": PokemonTypesEnum.FIGHTING,
    "fire": PokemonTypesEnum.FIRE,
    "flying": PokemonTypesEnum.FLYING,
    "ghost": PokemonTypesEnum.GHOST,
    "grass": PokemonTypesEnum.GRASS,
    "ground": PokemonTypesEnum.GROUND,
    "ice": PokemonTypesEnum.ICE,
    "normal": PokemonTypesEnum.NORMAL,
    "poison": PokemonTypesEnum.POISON,
    "psychic": PokemonTypesEnum.PSYCHIC,
    "rock": PokemonTypesEnum.ROCK,
    "steel": PokemonTypesEnum.STEEL,
    "water": PokemonTypesEnum.WATER
}

export default stringTypeToEnumMapping