import { useEffect, useRef } from "react"
import PokemonService from "./services/pokemonService"
import usePokemonStore from "./stores/pokemonStore"
import usePageStore from "./stores/pageStore"
import OverviewCard from "./components/overviewCard"

function App() {
  const { pokemon, extendPokemon } = usePokemonStore()
  const { pageNumber, increasePageNumber } = usePageStore()
  const isCalled = useRef(false)
  // TODO: Extract to external function (just call function here)
  const getPokemon = async () => {
    const data = await PokemonService.fetchPokemonPagination(pageNumber)
    const pokeData = await Promise.all(
      data.results.map(async res => {
        const pokemonInfo = await PokemonService.fetchPokemon(res.url)
        return pokemonInfo
      }),
    )
    extendPokemon(pokeData)
  }

  // Needed to query API only once on initial page load
  useEffect(() => {
    if (!isCalled.current) {
      getPokemon()
      isCalled.current = true
    }
  }, [])

  useEffect(() => {
    if (pageNumber > 0) {
      getPokemon()
    }
  }, [pageNumber])

  return (
    <>
      <button onClick={increasePageNumber}>Load More</button>
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
