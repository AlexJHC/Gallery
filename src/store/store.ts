import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/appSlice';
import {usersApi} from '../api/usersApi';
import gallerySlice from './slice/gallerySlice';
import usersSlice from './slice/usersSlice';

const reducer = {
  app: appSlice,
  gallery: gallerySlice,
  users: usersSlice,
  [usersApi.reducerPath]: usersApi.reducer
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat(usersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store