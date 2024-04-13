import { create } from "zustand"

type PageStore = {
  pageNumber: number
  increasePageNumber: () => void
  decreasePageNumber: () => void
}

const usePageStore = create<PageStore>()(set => ({
  pageNumber: 0,
  increasePageNumber: () =>
    set(state => ({ pageNumber: state.pageNumber + 1 })),
  decreasePageNumber: () =>
    set(state => ({ pageNumber: state.pageNumber - 1 })),
}))

export default usePageStore
