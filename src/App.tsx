import { useEffect, useRef, useState } from "react"
import PokemonService from "./services/pokemonService"
import usePokemonStore from "./stores/pokemonStore"
import usePageStore from "./stores/pageStore"
import OverviewCard from "./components/overviewCard"
import { SortOrderEnum } from "./types/enums/SortOrderEnum"
import { FilterCriteriaEnum } from "./types/enums/FilterCriteriaEnum"
import TextInput from "./components/textInput"
import RadioInput from "./components/radioInput"
import SearchForm from "./components/searchForm"
import useFilterStore from "./stores/filterStore"
import SortForm from "./components/sortForm"
import Spinner from "./components/spinner"

function App() {
  const {
    pokemon,
    filteredPokemon,
    extendPokemon,
    searchPokemon,
    sortPokemon,
  } = usePokemonStore()
  const { pageNumber, increasePageNumber } = usePageStore()
  const {
    searchFilterCriteria,
    nameSearchString,
    idSearchString,
    sortFilterCriteria,
    sortOrder,
  } = useFilterStore()
  const isCalled = useRef(false)
  const [canFetch, setCanFetch] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Extract to external function (just call function here)
  const getPokemon = async () => {
    setIsLoading(true)
    const data = await PokemonService.fetchPokemonPagination(pageNumber)

    if (data.next === null) {
      setCanFetch(false)
    }

    const pokeData = await Promise.all(
      data.results.map(async res => {
        const pokemonInfo = await PokemonService.fetchPokemon(res.url)
        return pokemonInfo
      }),
    )
    extendPokemon(pokeData)
    setIsLoading(false)
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

  // Whenever Pokemon are fetched or filters change, update filteredPokemon to apply filters
  useEffect(() => {
    if (searchFilterCriteria) {
      searchPokemon(
        searchFilterCriteria,
        searchFilterCriteria === FilterCriteriaEnum.ID
          ? idSearchString
          : nameSearchString,
      )
    }

    if (sortFilterCriteria && sortOrder) {
      sortPokemon(sortFilterCriteria, sortOrder)
    }
  }, [
    pokemon,
    searchFilterCriteria,
    sortFilterCriteria,
    sortOrder,
    nameSearchString,
    idSearchString,
  ])

  // TODO: Compartmentalize (search form, sort form, card list, load more button)
  return (
    <div className="my-4">
      {/* Forms */}
      <div className="flex gap-10 justify-center">
        <SearchForm />
        <SortForm />
      </div>
      {/* Pokemon list */}
      <div className="flex flex-col gap-8 items-center">
        <div className="w-full flex justify-center flex-wrap gap-4">
          {filteredPokemon.map(p => (
            <OverviewCard data={p} key={`pokemon-${p.id}`} />
          ))}
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => {
              if (canFetch) {
                increasePageNumber()
              }
            }}
            disabled={!canFetch}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  )
}

export default App
