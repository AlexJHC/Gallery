import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialBlogState: InitialAppStateType = {
  search: '',
  filter: {
    sort: '',
    order: ''
  }
}

const blogSlice = createSlice({
  name: 'Blog',
  initialState: initialBlogState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterType>) {
      switch (action.type) {
        case 'Blog/ID_UP':
        case 'Blog/ID_DOWN':
        case 'Blog/TITLE_UP':
        case 'Blog/TITLE_DOWN':
          return {...state, filter: action.payload}
        default:
          return state
      }
    },
  }
})

type InitialAppStateType = {
  search: string
  filter: FilterType
}

type FilterType = {
  sort: string
  order: string
}

export const {setFilter} = blogSlice.actions
export default blogSlice.reducer