import { useEffect } from 'react'
import './App.css'
import PokemonService from './services/pokemonService'
import usePokemonStore from './stores/pokemonStore'

function App() {
  const {extend, pokemon} = usePokemonStore()

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

    getPokemon().then((data) => extend(data))
  }, [])

  console.log(pokemon)

  return (
    <>
      {pokemon.map(p => (
        <div>
          <p>{p.id}</p>
          <p>{p.name}</p>
          <img src={`${p.photoURL}`} alt={`${p.name} Picture`} />
          <p>{p.types.toString()}</p>
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