import { PokemonTypesEnum } from "@/types/enums/PokemonTypesEnum";

// TODO: Make a mapping instead
// Source: https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses
const determineTypeWeakness = (type: PokemonTypesEnum): PokemonTypesEnum[] => {
    let result: PokemonTypesEnum[] = []
    
    switch (type) {
        case PokemonTypesEnum.BUG:
            result = [PokemonTypesEnum.FIGHTING, PokemonTypesEnum.FLYING, PokemonTypesEnum.POISON, PokemonTypesEnum.GHOST, PokemonTypesEnum.STEEL, PokemonTypesEnum.FIRE, PokemonTypesEnum.FAIRY] 
            break
        case PokemonTypesEnum.DARK:
            result = [PokemonTypesEnum.FIGHTING, PokemonTypesEnum.DARK, PokemonTypesEnum.FAIRY]
            break
        case PokemonTypesEnum.DRAGON:
            result = [PokemonTypesEnum.STEEL, PokemonTypesEnum.FAIRY]
            break
        case PokemonTypesEnum.ELECTRIC:
            result = [PokemonTypesEnum.GROUND, PokemonTypesEnum.GRASS, PokemonTypesEnum.ELECTRIC, PokemonTypesEnum.DRAGON]
            break
        case PokemonTypesEnum.FAIRY:
            result = [PokemonTypesEnum.POISON, PokemonTypesEnum.STEEL, PokemonTypesEnum.FIRE]
            break
        case PokemonTypesEnum.FIGHTING:
            result = [PokemonTypesEnum.FLYING, PokemonTypesEnum.POISON, PokemonTypesEnum.PSYCHIC, PokemonTypesEnum.BUG, PokemonTypesEnum.GHOST, PokemonTypesEnum.FAIRY]
            break
        case PokemonTypesEnum.FIRE:
            result = [PokemonTypesEnum.ROCK, PokemonTypesEnum.FIRE, PokemonTypesEnum.WATER, PokemonTypesEnum.DRAGON]
            break
        case PokemonTypesEnum.FLYING:
            result = [PokemonTypesEnum.ROCK, PokemonTypesEnum.STEEL, PokemonTypesEnum.ELECTRIC]
            break
        case PokemonTypesEnum.GHOST:
            result = [PokemonTypesEnum.NORMAL, PokemonTypesEnum.DARK]
            break
        case PokemonTypesEnum.GRASS:
            result = [PokemonTypesEnum.FLYING, PokemonTypesEnum.POISON, PokemonTypesEnum.BUG, PokemonTypesEnum.STEEL, PokemonTypesEnum.FIRE, PokemonTypesEnum.GRASS, PokemonTypesEnum.DRAGON]
            break
        case PokemonTypesEnum.GROUND:
            result = [PokemonTypesEnum.FLYING, PokemonTypesEnum.BUG, PokemonTypesEnum.GRASS]
            break
        case PokemonTypesEnum.ICE:
            result = [PokemonTypesEnum.STEEL, PokemonTypesEnum.FIRE, PokemonTypesEnum.WATER, PokemonTypesEnum.ICE]
            break
        case PokemonTypesEnum.NORMAL:
            result = [PokemonTypesEnum.ROCK, PokemonTypesEnum.GHOST, PokemonTypesEnum.STEEL]
            break
        case PokemonTypesEnum.POISON:
            result = [PokemonTypesEnum.POISON, PokemonTypesEnum.GROUND, PokemonTypesEnum.ROCK, PokemonTypesEnum.GHOST, PokemonTypesEnum.STEEL]
            break
        case PokemonTypesEnum.PSYCHIC:
            result = [PokemonTypesEnum.STEEL, PokemonTypesEnum.PSYCHIC, PokemonTypesEnum.DARK]
            break
        case PokemonTypesEnum.ROCK:
            result = [PokemonTypesEnum.FIGHTING, PokemonTypesEnum.GROUND, PokemonTypesEnum.STEEL]
            break
        case PokemonTypesEnum.STEEL:
            result = [PokemonTypesEnum.STEEL, PokemonTypesEnum.FIRE, PokemonTypesEnum.WATER, PokemonTypesEnum.ELECTRIC]
            break
        case PokemonTypesEnum.WATER:
            result = [PokemonTypesEnum.WATER, PokemonTypesEnum.GRASS, PokemonTypesEnum.DRAGON]
            break
    }

    return result
}

export default determineTypeWeakness