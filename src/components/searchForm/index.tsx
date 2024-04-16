import { ReactElement, useEffect } from "react"
import RadioInput from "../radioInput"
import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import useFilterStore from "@/stores/filterStore"
import TextInput from "../textInput"

const SearchForm = (): ReactElement => {
  const {
    searchFilterCriteria,
    setSearchFilterCriteria,
    searchString,
    setSearchString,
  } = useFilterStore()

  const isSearchById = searchFilterCriteria === FilterCriteriaEnum.ID
  const isDisabled = searchFilterCriteria === undefined

  useEffect(() => {
    setSearchString("")
  }, [searchFilterCriteria])

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
      <h2 className="text-3xl dark:text-white">Search</h2>
      <div className="flex items-center gap-4">
        <h5 className="text-md dark:text-white">
          <strong>Criteria</strong>
        </h5>
        <div className="flex flex-col gap-4">
          <div className="flex">
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
      </div>
      <div className="flex items-center gap-4">
        <h5 className="text-md dark:text-white">
          <strong>Search String</strong>
        </h5>
        <TextInput
          name="search"
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          disabled={isDisabled}
          placeholder={
            isDisabled
              ? "Enter Pokemon Info..."
              : `Enter Pokemon ${isSearchById ? "ID" : "Name"}...`
          }
        />
      </div>
    </div>
  )
}

export default SearchForm
