import { create } from "zustand"

type PageStore = {
  pageNumber: number
  increasePageNumber: () => void
}

const usePageStore = create<PageStore>()(set => ({
  pageNumber: 0,
  increasePageNumber: () =>
    set(state => ({ pageNumber: state.pageNumber + 1 })),
}))

export default usePageStore
