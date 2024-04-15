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
import Toast from "./components/toast"
import DetailedCard from "./components/detailedCard"

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

  return (
    <div className="flex justify-between">
      {/* Forms */}
      <div className="float-left flex h-full h-screen flex-col gap-10 overflow-auto">
        <SearchForm />
        <SortForm />
        <DetailedCard />
      </div>

      {/* Pokemon list */}
      <div className="float-left flex h-screen w-3/4 flex-col items-center gap-8 overflow-auto">
        <div className="flex w-full flex-wrap justify-center gap-4">
          {filteredPokemon.map(p => (
            <OverviewCard data={p} key={`pokemon-${p.id}`} />
          ))}
        </div>
        {/* <Toast /> */}
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="button"
            className=" inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
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
