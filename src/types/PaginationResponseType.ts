export interface PaginationResponseType {
  count: number
  next: string | null
  previous: string | null
  results: PaginationResponseResultType[]
}

export interface PaginationResponseResultType {
  name: string
  url: string
}
