import determineTypeColor from "@/_utils/determineTypeColor"
import { PokemonType } from "@/types/PokemonType"
import { ReactElement } from "react"

const OverviewCard = ({ data }: { data: PokemonType }): ReactElement => {
  return (
    <div>
      <img src={data.photoUrl} alt={`${data.name} picture`} />
      <p>{data.name}</p>
      <p>{data.id}</p>
      {data.types.map((t, idx) => (
        <p
          key={`type-${idx}`}
          className={`text-[${determineTypeColor(t.name)}]`}
        >
          {t.name}
        </p>
      ))}
    </div>
  )
}

export default OverviewCard
