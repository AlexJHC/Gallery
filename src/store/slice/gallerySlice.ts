import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AlbumType, PhotoType} from '../../api/appApi';

const initialGalleryState: initialAppStateType = {
  albums: [],
  photos: []
}

const gallerySlice = createSlice({
  name: 'Gallery',
  initialState: initialGalleryState,
  reducers: {
    setAlbums(state, action: PayloadAction<AlbumType[]>) {
      state.albums = action.payload
    },
    setPhotos(state, action: PayloadAction<PhotoType[]>) {
      state.photos = action.payload
    },
  }
})

type initialAppStateType = {
  albums: AlbumType[]
  photos: PhotoType[]
}

export const {setAlbums, setPhotos} = gallerySlice.actions
export default gallerySlice.reducer