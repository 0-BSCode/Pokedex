import { useEffect, useRef } from 'react'
import './App.css'
import PokemonService from './services/pokemonService'
import usePokemonStore from './stores/pokemonStore'
import determineTypesWeaknesses from './_utils/determineTypesWeakness'
import inferTypeFromString from './_utils/inferTypeFromString'

function App() {
  const {extend, pokemon} = usePokemonStore()
  const isCalled = useRef(false)

  useEffect(() => {
    const getPokemon = async () => {
      const data = await PokemonService.fetchPokemonPagination(0)
      const pokeData = await Promise.all(data.results.map(async (res) => {
        const pokemonInfo = await PokemonService.fetchPokemon(res.url)
        const photoId = pokemonInfo.id.toString().padStart(3, "0")
        pokemonInfo.photoURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${photoId}.png`
        return pokemonInfo
      }))
      return pokeData
    }

    if (!isCalled.current) {
      getPokemon().then((data) => extend(data))
      isCalled.current = true
    }
  }, [])

  return (
    <>
      {pokemon.map(p => (
        <div>
          <p>{p.id}</p>
          <p>{p.name}</p>
          <img src={`${p.photoURL}`} alt={`${p.name} Picture`} />
          {determineTypesWeaknesses(p.types.map(t => inferTypeFromString(t.type.name))).map(w => (
            <div>
              {w}
            </div>
          ))}
          <p>{p.height}</p>
          <p>{p.weight}</p>
          <div>
            {p.stats.map(s => (
              <div>
                {s.stat.name}: {s.base_stat}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default App

/**
 * TODO
 * 1. Fetch the pokemon information (use https://pokeapi.co/api/v2/pokemon/{id or name}/)
 * 2. Fetch pokemon type information (use https://pokeapi.co/api/v2/type/{name}/, use half_damage_to and no_damage_to fields)
 * 3. Card info: ID, Name, Photo, Type
 * 4. Detailed info: ID, Name, Photo, Types, Height, Weight, Categories, Stats, Weakness
 */