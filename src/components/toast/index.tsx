import capitalizeString from "@/_utils/capitalizeString"
import determineTypeColor from "@/_utils/determineTypeColor"
import usePokemonStore from "@/stores/pokemonStore"
import { PokemonType } from "@/types/PokemonType"
import { ReactElement } from "react"

// TODO: Display remaining information
// TODO: Tidy up form and scroll behavior (left side = sticky)
// TODO: Remove dead modal code
// TODO: Address remaining TODO's (or delete them)
const Toast = ({ data }: { data: PokemonType }): ReactElement => {
  const { setPokemonIdx, pokemon } = usePokemonStore()
  return (
    <div
      className="max-w-sm relative bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
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
            className="absolute top-3 end-3 inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
            onClick={() => setPokemonIdx(-1)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="flex-shrink-0 size-4"
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
        <div className="ms-4 me-5">
          <h3 className="text-gray-500 font-medium text-sm dark:text-white">
            <span className="font-bold text-gray-800">
              {capitalizeString(data.name)}
            </span>{" "}
            {data.id.toString().padStart(3, "0")}
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex gap-4 items-center">
            <p className="font-medium">Types: </p>
            <div className="flex gap-2">
              {data.types.map((t, idx) => (
                <span
                  key={`type-${idx}`}
                  className={
                    "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-white"
                  }
                  style={{ backgroundColor: determineTypeColor(t.name) }}
                >
                  {t.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-4">
            <p className="font-medium">Stats: </p>
            <div className="flex flex-col gap-2">
              {data.stats.map((s, idx) => (
                <span
                  key={`stats-${idx}`}
                  className={
                    "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-gray-600"
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
              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-blue-800 dark:text-blue-500 dark:focus:text-blue-400"
            >
              Prev
            </button>
            <button
              disabled={data.id === pokemon.length}
              onClick={() => setPokemonIdx(data.id)}
              type="button"
              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-blue-800 dark:text-blue-500 dark:focus:text-blue-400"
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
