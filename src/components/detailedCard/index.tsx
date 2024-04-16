import usePokemonStore from "@/stores/pokemonStore"
import { ReactElement } from "react"
import Toast from "../toast"

const DetailedCard = (): ReactElement => {
  const { pokemonIdx, pokemon } = usePokemonStore()
  return (
    <>
      <h2 className="text-3xl dark:text-white">Pokemon Information</h2>
      {pokemonIdx < 0 ? (
        <p>No Pokemon selected.</p>
      ) : (
        <Toast data={pokemon[pokemonIdx]} />
      )}
    </>
  )
}

export default DetailedCard
