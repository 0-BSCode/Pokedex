import { useEffect, useRef, useState } from "react"
import PokemonService from "./services/pokemonService"
import usePokemonStore from "./stores/pokemonStore"
import usePageStore from "./stores/pageStore"
import OverviewCard from "./components/overviewCard"
import { SortOrderEnum } from "./types/enums/SortOrderEnum"

function App() {
  const {
    pokemon,
    filteredPokemon,
    extendPokemon,
    searchPokemon,
    sortPokemon,
  } = usePokemonStore()
  const { pageNumber, increasePageNumber } = usePageStore()
  const isCalled = useRef(false)
  const [nameSortOrder, setNameSortOrder] = useState<SortOrderEnum | undefined>(
    undefined,
  )
  const [idSortOrder, setIdSortOrder] = useState<SortOrderEnum | undefined>(
    undefined,
  )
  const [name, setName] = useState("")
  const [id, setId] = useState("")

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

  // Whenever Pokemon are fetched, update filteredPokemon
  useEffect(() => {
    searchPokemon(name, id)
    sortPokemon(nameSortOrder, idSortOrder)
  }, [pokemon])

  return (
    <>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => {
            sortPokemon(SortOrderEnum.ASC, undefined)
          }}
        >
          Sort by name ASC
        </button>
        <button
          onClick={() => {
            sortPokemon(SortOrderEnum.DESC, undefined)
          }}
        >
          Sort by name DESC
        </button>
        <button
          onClick={() => {
            sortPokemon(undefined, SortOrderEnum.ASC)
          }}
        >
          Sort by ID ASC
        </button>
        <button
          onClick={() => {
            sortPokemon(undefined, SortOrderEnum.DESC)
          }}
        >
          Sort by ID DESC
        </button>
        <label htmlFor="nameSearch">Name:</label>
        <input
          id="nameSearch"
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <label htmlFor="idSearch">ID:</label>
        <input
          id="idSearch"
          type="text"
          value={id}
          onChange={e => {
            setId(e.target.value)
          }}
        />
      </div>
      <button onClick={increasePageNumber}>Load More</button>
      {filteredPokemon.map(p => (
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
