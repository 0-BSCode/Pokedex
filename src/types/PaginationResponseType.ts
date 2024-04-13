export interface PaginationResponseType {
  count: number
  next: string
  previous: string
  results: PaginationResponseResultType[]
}

export interface PaginationResponseResultType {
  name: string
  url: string
}
