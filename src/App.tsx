import { useEffect, useRef } from "react"
import PokemonService from "./services/pokemonService"
import usePokemonStore from "./stores/pokemonStore"
import usePageStore from "./stores/pageStore"
import OverviewCard from "./components/overviewCard"

function App() {
  const { pokemon, extendPokemon } = usePokemonStore()
  const { pageNumber, increasePageNumber } = usePageStore()
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

  return (
    <>
      {pokemon.map(p => (
        <OverviewCard data={p} key={`pokemon-${p.id}`} />
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
