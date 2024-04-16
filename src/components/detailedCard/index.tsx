import usePokemonStore from "@/stores/pokemonStore"
import { ReactElement } from "react"
import Toast from "../toast"

const DetailedCard = (): ReactElement => {
  const { pokemonIdx, pokemon } = usePokemonStore()
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl dark:text-white">Pokemon Information</h2>
      {pokemonIdx < 0 ? (
        <p className="text-center text-gray-500">No Pokemon selected.</p>
      ) : (
        <Toast data={pokemon[pokemonIdx]} />
      )}
    </div>
  )
}

export default DetailedCard
