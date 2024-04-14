import { create } from "zustand"

type PageStore = {
  pageNumber: number
  canIncrement: boolean
  increasePageNumber: () => void
  setCanIncrement: (newValue: boolean) => void
}

const usePageStore = create<PageStore>()(set => ({
  pageNumber: 0,
  canIncrement: false,
  increasePageNumber: () =>
    set(state => ({ pageNumber: state.pageNumber + 1 })),
  setCanIncrement: (newValue: boolean) =>
    set(state => ({ canIncrement: newValue })),
}))

export default usePageStore
