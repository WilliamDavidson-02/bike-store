import { FC } from "react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type RefinementListProps = {
  options?: SortOptions
}

const RefinementList: FC<RefinementListProps> = () => {
  return <div>RefinementList</div>
}

export default RefinementList
