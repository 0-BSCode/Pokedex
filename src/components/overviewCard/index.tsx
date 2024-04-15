import capitalizeString from "@/_utils/capitalizeString"
import determineTypeColor from "@/_utils/determineTypeColor"
import { PokemonType } from "@/types/PokemonType"
import { ReactElement } from "react"
import Modal from "../modal"

const OverviewCard = ({ data }: { data: PokemonType }): ReactElement => {
  return (
    <div>
      <div className="w-72 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <img
          className="w-full h-auto rounded-t-xl"
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
                    "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-white"
                  }
                  style={{ backgroundColor: determineTypeColor(t.name) }}
                >
                  {t.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <Modal pokemonId={data.id} />
        </div>
      </div>
    </div>
  )
}

export default OverviewCard
