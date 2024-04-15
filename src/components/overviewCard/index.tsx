import capitalizeString from "@/_utils/capitalizeString"
import determineTypeColor from "@/_utils/determineTypeColor"
import { PokemonType } from "@/types/PokemonType"
import { ReactElement } from "react"
import usePokemonStore from "@/stores/pokemonStore"

const OverviewCard = ({ data }: { data: PokemonType }): ReactElement => {
  const { setPokemonIdx } = usePokemonStore()

  return (
    <div>
      <div className="flex w-72 flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]">
        <img
          className="h-auto w-full rounded-t-xl"
          src={data.photoUrl}
          alt={`${data.name} picture`}
        />
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {capitalizeString(data.name)}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
            {data.id.toString().padStart(3, "0")}
          </p>
          <div className="mt-3 flex gap-3">
            <span className="text-gray-500 dark:text-gray-400">Types</span>
            <div className="flex gap-2">
              {data.types.map((t, idx) => (
                <span
                  key={`type-${idx}`}
                  className={
                    "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white"
                  }
                  style={{ backgroundColor: determineTypeColor(t.name) }}
                >
                  {t.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPokemonIdx(data.id - 1)}
            className="mt-3 inline-flex items-center gap-x-1 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400"
          >
            View Details
            <svg
              className="size-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OverviewCard
