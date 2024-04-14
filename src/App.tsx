import { useEffect, useRef, useState } from "react"
import PokemonService from "./services/pokemonService"
import usePokemonStore from "./stores/pokemonStore"
import usePageStore from "./stores/pageStore"
import OverviewCard from "./components/overviewCard"
import { SortOrderEnum } from "./types/enums/SortOrderEnum"
import { FilterCriteriaEnum } from "./types/enums/FilterCriteriaEnum"

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
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <input
              name="searchCriteria"
              type="radio"
              id="searchCriteriaId"
              checked={searchFilterCriteria === FilterCriteriaEnum.ID}
              onChange={() => {
                setSearchFilterCriteria(FilterCriteriaEnum.ID)
              }}
            />
            <label htmlFor="searchCriteriaId">ID</label>
            <br></br>
            <input
              name="searchCriteria"
              type="radio"
              id="searchCriteriaName"
              checked={searchFilterCriteria === FilterCriteriaEnum.NAME}
              onChange={() => {
                setSearchFilterCriteria(FilterCriteriaEnum.NAME)
              }}
            />
            <label htmlFor="searchCriteriaName">Name</label>
            <br></br>
          </div>
          <label htmlFor="nameSearch">Name:</label>
          <input
            id="nameSearch"
            type="text"
            value={nameSearchString}
            onChange={e => {
              setNameSearchString(e.target.value)
            }}
            disabled={
              !searchFilterCriteria ||
              searchFilterCriteria === FilterCriteriaEnum.ID
            }
          />
          <label htmlFor="idSearch">ID:</label>
          <input
            id="idSearch"
            type="text"
            value={idSearchString}
            onChange={e => {
              setIdSearchString(e.target.value)
            }}
            disabled={
              !searchFilterCriteria ||
              searchFilterCriteria === FilterCriteriaEnum.NAME
            }
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <input
              name="sortCriteria"
              type="radio"
              id="sortCriteriaId"
              checked={sortFilterCriteria === FilterCriteriaEnum.ID}
              onChange={() => {
                setSortFilterCriteria(FilterCriteriaEnum.ID)
              }}
            />
            <label htmlFor="sortCriteriaId">ID</label>
            <br></br>
            <input
              name="sortCriteria"
              type="radio"
              id="sortCriteriaName"
              checked={sortFilterCriteria === FilterCriteriaEnum.NAME}
              onChange={() => {
                setSortFilterCriteria(FilterCriteriaEnum.NAME)
              }}
            />
            <label htmlFor="sortCriteriaName">Name</label>
            <br></br>
          </div>
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
      <div className="w-full flex justify-center flex-wrap gap-4">
        {filteredPokemon.map(p => (
          <OverviewCard data={p} key={`pokemon-${p.id}`} />
        ))}
      </div>
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
