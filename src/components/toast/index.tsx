import capitalizeString from "@/_utils/capitalizeString"
import determineTypeColor from "@/_utils/determineTypeColor"
import determineTypesWeaknesses from "@/_utils/determineTypesWeakness"
import usePokemonStore from "@/stores/pokemonStore"
import { PokemonType } from "@/types/PokemonType"
import { ReactElement } from "react"

const statsStringToStringMapping: Record<string, string> = {
  attack: "Attack",
  defense: "Defense",
  hp: "HP",
  "special-attack": "Special Attack",
  "special-defense": "Special Defense",
  speed: "Speed",
}

// TODO: Address remaining TODO's (or delete them)
const Toast = ({ data }: { data: PokemonType }): ReactElement => {
  const { setPokemonIdx, pokemon } = usePokemonStore()
  return (
    <div
      className="relative max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
      role="alert"
    >
      <div className="flex flex-col items-center p-4">
        <div className="flex-shrink-0">
          <img
            className="mb-4 inline-block size-20 rounded-full"
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
          <div>
            <h3 className="w-full text-sm font-medium text-gray-500 dark:text-white">
              <span className="text-lg font-bold text-gray-800">
                {capitalizeString(data.name)}
              </span>{" "}
              {data.id.toString().padStart(3, "0")}
            </h3>
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Weight: </span>
            {data.weight / 10} kg
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Height: </span>
            {data.height * 10} cm
          </div>
          <hr className="m-auto my-4 w-28 border-gray-500" />
          <div className="mt-1 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
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
          <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">Weakness: </p>
            <div className="flex w-full flex-wrap gap-2">
              {determineTypesWeaknesses(data.types.map(t => t.name)).map(
                (t, idx) => (
                  <span
                    key={`type-weakness-${idx}`}
                    className={
                      "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white"
                    }
                    style={{ backgroundColor: determineTypeColor(t) }}
                  >
                    {t.toString().toUpperCase()}
                  </span>
                ),
              )}
            </div>
          </div>
          <hr className="m-auto my-4 w-28 border-gray-500" />
          <div className="max-w-full overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500"
                      >
                        Base
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500"
                      >
                        Effort
                      </th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {data.stats.map((s, idx) => (
                      <tr
                        key={`pokemon-stat-${idx}`}
                        className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                      >
                        <td className="whitespace-nowrap px-6 py-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {statsStringToStringMapping[s.name]}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 text-sm text-gray-800 dark:text-neutral-200">
                          {s.baseStat}
                        </td>
                        <td className="whitespace-nowrap px-6 py-2 text-sm text-gray-800 dark:text-neutral-200">
                          {s.effort}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-4">
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
