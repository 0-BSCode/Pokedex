import useFilterStore from "@/stores/filterStore"
import { ReactElement } from "react"
import RadioInput from "../radioInput"
import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import { SortOrderEnum } from "@/types/enums/SortOrderEnum"

const SortForm = (): ReactElement => {
  const { sortFilterCriteria, setSortFilterCriteria, sortOrder, setSortOrder } =
    useFilterStore()
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
      <h2 className="text-3xl dark:text-white">Sort</h2>
      <div className="flex items-center gap-4">
        <h5 className="text-md dark:text-white">
          <strong>Criteria</strong>
        </h5>
        <div className="flex">
          <RadioInput
            name="sortCriteriaId"
            group="sortCriteria"
            label="ID"
            checked={sortFilterCriteria === FilterCriteriaEnum.ID}
            onChange={() => {
              setSortFilterCriteria(FilterCriteriaEnum.ID)
            }}
          />
          <RadioInput
            name="sortCriteriaName"
            group="sortCriteria"
            label="Name"
            checked={sortFilterCriteria === FilterCriteriaEnum.NAME}
            onChange={() => {
              setSortFilterCriteria(FilterCriteriaEnum.NAME)
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <h5 className="text-md dark:text-white">
          <strong>Sort Order</strong>
        </h5>
        <div className="flex gap-2">
          <button
            type="button"
            className={
              sortOrder === SortOrderEnum.ASC
                ? "inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                : "inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
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
                ? "inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                : "inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
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
