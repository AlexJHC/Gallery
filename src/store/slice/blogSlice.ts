import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialBlogState: InitialAppStateType = {
  search: '',
  filter: {
    sort: '',
    order: ''
  },
  currentPage: 1,
  filterValue: ''
}

const blogSlice = createSlice({
  name: 'Blog',
  initialState: initialBlogState,
  reducers: {
    setFilter(state, action: PayloadAction<ActionFilterType>) {
      switch (action.payload) {
        case 'BLOG/FILTER_ID_UP':
          return {...state, filter: {sort: 'userId', order: 'asc'}, filterValue: action.payload}
        case 'BLOG/FILTER_ID_DOWN':
          return {...state, filter: {sort: 'userId', order: 'desc'}, filterValue: action.payload}
        case 'BLOG/FILTER_TITLE_UP':
          return {...state, filter: {sort: 'title', order: 'asc'}, filterValue: action.payload}
        case 'BLOG/FILTER_TITLE_DOWN':
          return {...state, filter: {sort: 'title', order: 'desc'}, filterValue: action.payload}
        default:
          return {...state, filter: {sort: '', order: ''}, filterValue: ''}
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  }
})

export type InitialAppStateType = {
  search: string
  filter: FilterType
  currentPage: number
  filterValue: ActionFilterType
}

type FilterType = {
  sort: string
  order: string
}

export type ActionFilterType = 'BLOG/FILTER_ID_UP'
  | 'BLOG/FILTER_ID_DOWN'
  | 'BLOG/FILTER_TITLE_UP'
  | 'BLOG/FILTER_TITLE_DOWN'
  | ''

export const {setFilter, setSearch, setCurrentPage} = blogSlice.actions
export default blogSlice.reducer