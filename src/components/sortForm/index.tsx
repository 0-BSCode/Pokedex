import useFilterStore from "@/stores/filterStore"
import { ReactElement } from "react"
import RadioInput from "../radioInput"
import { FilterCriteriaEnum } from "@/types/enums/FilterCriteriaEnum"
import { SortOrderEnum } from "@/types/enums/SortOrderEnum"

const SortForm = (): ReactElement => {
  const { sortFilterCriteria, setSortFilterCriteria, setSortOrder } =
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
  )
}

export default SortForm
