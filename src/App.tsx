import { useEffect, useRef, useState } from "react"
import PokemonService from "./services/pokemonService"
import usePokemonStore from "./stores/pokemonStore"
import usePageStore from "./stores/pageStore"
import OverviewCard from "./components/overviewCard"
import { SortOrderEnum } from "./types/enums/SortOrderEnum"
import { FilterCriteriaEnum } from "./types/enums/FilterCriteriaEnum"
import TextInput from "./components/textInput"
import RadioInput from "./components/radioInput"

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
  const [nameSearchString, setNameSearchString] = useState("")
  const [idSearchString, setIdSearchString] = useState("")
  const [sortOrder, setSortOrder] = useState<SortOrderEnum | undefined>(
    undefined,
  )
  const [searchFilterCriteria, setSearchFilterCriteria] = useState<
    FilterCriteriaEnum | undefined
  >(undefined)
  const [sortFilterCriteria, setSortFilterCriteria] = useState<
    FilterCriteriaEnum | undefined
  >(undefined)
  const [canFetch, setCanFetch] = useState(true)

  // TODO: Extract to external function (just call function here)
  // TODO: Add loading states
  const getPokemon = async () => {
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
    <>
      <div className="flex flex-col gap-1">
        <div className="flex gap-10 justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl dark:text-white">Search</h2>
              <div className="flex gap-4">
                <RadioInput
                  name="searchCriteriaId"
                  group="searchCriteria"
                  label="ID"
                  checked={searchFilterCriteria === FilterCriteriaEnum.ID}
                  onChange={() => {
                    setSearchFilterCriteria(FilterCriteriaEnum.ID)
                  }}
                />
                <RadioInput
                  name="searchCriteriaName"
                  group="searchCriteria"
                  label="Name"
                  checked={searchFilterCriteria === FilterCriteriaEnum.NAME}
                  onChange={() => {
                    setSearchFilterCriteria(FilterCriteriaEnum.NAME)
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <TextInput
                name="nameSearch"
                label="Name"
                value={nameSearchString}
                onChange={e => setNameSearchString(e.target.value)}
                disabled={
                  !searchFilterCriteria ||
                  searchFilterCriteria === FilterCriteriaEnum.ID
                }
                placeholder="Enter Pokemon name..."
              />
              <TextInput
                name="idSearch"
                label="ID"
                value={idSearchString}
                onChange={e => setIdSearchString(e.target.value)}
                disabled={
                  !searchFilterCriteria ||
                  searchFilterCriteria === FilterCriteriaEnum.NAME
                }
                placeholder="Enter Pokemon ID..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl dark:text-white">Sort</h2>
            <div className="flex flex-col gap-1">
              <div className="flex gap-4">
                <RadioInput
                  name="sortCriteriaName"
                  group="sortCriteria"
                  label="Name"
                  checked={sortFilterCriteria === FilterCriteriaEnum.NAME}
                  onChange={() => {
                    setSortFilterCriteria(FilterCriteriaEnum.NAME)
                  }}
                />
                <RadioInput
                  name="sortCriteriaId"
                  group="sortCriteria"
                  label="ID"
                  checked={sortFilterCriteria === FilterCriteriaEnum.ID}
                  onChange={() => {
                    setSortFilterCriteria(FilterCriteriaEnum.ID)
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSortOrder(SortOrderEnum.ASC)
                  }}
                  disabled={
                    !sortFilterCriteria ||
                    sortFilterCriteria === FilterCriteriaEnum.ID
                  }
                >
                  Sort by name ASC
                </button>
                <button
                  onClick={() => {
                    setSortOrder(SortOrderEnum.DESC)
                  }}
                  disabled={
                    !sortFilterCriteria ||
                    sortFilterCriteria === FilterCriteriaEnum.ID
                  }
                >
                  Sort by name DESC
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSortOrder(SortOrderEnum.ASC)
                  }}
                  disabled={
                    !sortFilterCriteria ||
                    sortFilterCriteria === FilterCriteriaEnum.NAME
                  }
                >
                  Sort by ID ASC
                </button>
                <button
                  onClick={() => {
                    setSortOrder(SortOrderEnum.DESC)
                  }}
                  disabled={
                    !sortFilterCriteria ||
                    sortFilterCriteria === FilterCriteriaEnum.NAME
                  }
                >
                  Sort by ID DESC
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center flex-wrap gap-4">
        {filteredPokemon.map(p => (
          <OverviewCard data={p} key={`pokemon-${p.id}`} />
        ))}
      </div>
      <button
        onClick={() => {
          if (canFetch) {
            increasePageNumber()
          }
        }}
        disabled={!canFetch}
      >
        Load More
      </button>
    </>
  )
}

export default App
