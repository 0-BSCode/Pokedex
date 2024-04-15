import useFilterStore from "@/stores/filterStore"
import { ReactElement } from "react"
import RadioInput from "../radioInput"
import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import { SortOrderEnum } from "@/types/enums/SortOrderEnum"

const SortForm = (): ReactElement => {
  const { sortFilterCriteria, setSortFilterCriteria, sortOrder, setSortOrder } =
    useFilterStore()
  return (
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
          {/* TODO: Replace w/ smthg more user friendly */}
          <button
            type="button"
            className={
              sortOrder === SortOrderEnum.ASC
                ? "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                : "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            }
            onClick={() => {
              setSortOrder(SortOrderEnum.ASC)
            }}
            disabled={!sortFilterCriteria}
          >
            Ascending
          </button>
          <button
            type="button"
            className={
              sortOrder === SortOrderEnum.DESC
                ? "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                : "py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
            }
            onClick={() => {
              setSortOrder(SortOrderEnum.DESC)
            }}
            disabled={!sortFilterCriteria}
          >
            Descending
          </button>
        </div>
      </div>
    </div>
  )
}

export default SortForm
