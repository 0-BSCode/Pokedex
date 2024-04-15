import usePokemonStore from "@/stores/pokemonStore"
import { ReactElement } from "react"
import Modal from "../modal"
import Toast from "../toast"

const DetailedCard = (): ReactElement => {
  const { pokemonIdx, pokemon } = usePokemonStore()
  return (
    <>
      {pokemonIdx < 0 ? (
        <p>No Pokemon selected.</p>
      ) : (
        <Toast data={pokemon[pokemonIdx]} />
      )}
    </>
  )
}

export default DetailedCard
