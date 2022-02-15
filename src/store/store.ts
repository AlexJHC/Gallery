import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/appSlice';
import {appApi} from '../api/appApi';
import gallerySlice from './slice/gallerySlice';

const reducer = {
  app: appSlice,
  gallery: gallerySlice,
  [appApi.reducerPath]: appApi.reducer
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat(appApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store