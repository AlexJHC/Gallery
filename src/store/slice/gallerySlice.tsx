import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialGalleryState: InitialGalleryStateType = {
  currentPage: 1,
  filter: ''
}

const gallerySlice = createSlice({
  name: 'Gallery',
  initialState: initialGalleryState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setAlbumFilter(state,action:PayloadAction<string>) {
      state.filter = action.payload
      state.currentPage = 1
    }
  }
})

export type InitialGalleryStateType = {
  currentPage: number
  filter: string
}

export const {setCurrentPage,setAlbumFilter} = gallerySlice.actions
export default gallerySlice.reducer