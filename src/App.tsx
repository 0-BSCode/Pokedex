import { useEffect, useRef } from 'react'
import './App.css'
import PokemonService from './services/pokemonService'
import usePokemonStore from './stores/pokemonStore'

function App() {
  const { extendPokemon, pokemon } = usePokemonStore()
  const isCalled = useRef(false)

  useEffect(() => {
    const getPokemon = async () => {
      const data = await PokemonService.fetchPokemonPagination(0)
      const pokeData = await Promise.all(
        data.results.map(async res => {
          const pokemonInfo = await PokemonService.fetchPokemon(res.url)
          return pokemonInfo
        }),
      )
      return pokeData
    }

    if (!isCalled.current) {
      getPokemon().then(data => extendPokemon(data))
      isCalled.current = true
    }
  }, [])

  console.log('test')

  return (
    <>
      {pokemon.map(p => (
        <div>
          {/* <p>{p.id}</p>
          <p>{p.name}</p>
          <img src={`${p.photoUrl}`} alt={`${p.name} Picture`} />
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
          </div> */}
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
