import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/appSlice';
import {usersApi} from '../api/usersApi';
import blogSlice from './slice/blogSlice';

const reducer = {
  app: appSlice,
  blog: blogSlice,
  [usersApi.reducerPath]: usersApi.reducer,
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(usersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store