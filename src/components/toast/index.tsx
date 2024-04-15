import capitalizeString from "@/_utils/capitalizeString"
import determineTypeColor from "@/_utils/determineTypeColor"
import usePokemonStore from "@/stores/pokemonStore"
import { PokemonType } from "@/types/PokemonType"
import { ReactElement } from "react"

// TODO: Tidy up UI
// TODO: Address remaining TODO's (or delete them)
const Toast = ({ data }: { data: PokemonType }): ReactElement => {
  const { setPokemonIdx, pokemon } = usePokemonStore()
  return (
    <div
      className="relative max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
      role="alert"
    >
      <div className="flex p-4">
        <div className="flex-shrink-0">
          <img
            className="inline-block size-8 rounded-full"
            src={data.photoUrl}
            alt={`${data.name} picture`}
          />
          <button
            type="button"
            className="absolute end-3 top-3 inline-flex size-5 flex-shrink-0 items-center justify-center rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none dark:text-white"
            onClick={() => setPokemonIdx(-1)}
          >
            <span className="sr-only">Close</span>
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
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="me-5 ms-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-white">
            <span className="font-bold text-gray-800">
              {capitalizeString(data.name)}
            </span>{" "}
            {data.id.toString().padStart(3, "0")}
          </h3>
          <div className="mt-1 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">Types: </p>
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
          <div className="mt-1 flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">Stats: </p>
            <div className="flex flex-col gap-2">
              {data.stats.map((s, idx) => (
                <span
                  key={`stats-${idx}`}
                  className={
                    "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600"
                  }
                >
                  {s.name}: {s.baseStat} ({s.effort})
                </span>
              ))}
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Weight: </span>
            {data.weight} lbs
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Height: </span>
            {data.height} dm
          </div>
          <div className="mt-3 flex gap-4">
            <button
              disabled={data.id === 1}
              onClick={() => setPokemonIdx(data.id - 2)}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:focus:text-blue-400"
            >
              Prev
            </button>
            <button
              disabled={data.id === pokemon.length}
              onClick={() => setPokemonIdx(data.id)}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:focus:text-blue-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toast
