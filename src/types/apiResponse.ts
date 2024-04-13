export interface PaginationResponseI {
    count: number
    next: string
    previous: string
    results: PaginationResponseResultI[]
}

export interface PaginationResponseResultI {
    name: string
    url: string
}