import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import { create } from "zustand"

type FilterStore = {
  nameSearchString: string
  setNameSearchString: (value: string) => void
  idSearchString: string
  setIdSearchString: (value: string) => void
  searchFilterCriteria: FilterCriteriaEnum | undefined
  setSearchFilterCriteria: (value: FilterCriteriaEnum) => void
  sortFilterCriteria: FilterCriteriaEnum | undefined
  setSortFilterCriteria: (value: FilterCriteriaEnum) => void
}

const useFilterStore = create<FilterStore>()(set => ({
  nameSearchString: "",
  setNameSearchString: (value: string) =>
    set(state => ({ nameSearchString: value })),
  idSearchString: "",
  setIdSearchString: (value: string) =>
    set(state => ({ idSearchString: value })),
  searchFilterCriteria: undefined,
  setSearchFilterCriteria: (value: FilterCriteriaEnum) =>
    set(state => ({ searchFilterCriteria: value })),
  sortFilterCriteria: undefined,
  setSortFilterCriteria: (value: FilterCriteriaEnum) =>
    set(state => ({ sortFilterCriteria: value })),
}))

export default useFilterStore
