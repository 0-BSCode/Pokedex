import { ReactElement } from "react"
import RadioInput from "../radioInput"
import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import useFilterStore from "@/stores/filterStore"
import TextInput from "../textInput"

const SearchForm = (): ReactElement => {
  const {
    searchFilterCriteria,
    setSearchFilterCriteria,
    idSearchString,
    setIdSearchString,
    nameSearchString,
    setNameSearchString,
  } = useFilterStore()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl dark:text-white">Search</h2>
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
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  )
}

export default SearchForm
