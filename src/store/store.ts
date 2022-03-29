import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/appSlice';
import {dataApi} from '../api/dataApi';
import blogSlice from './slice/blogSlice';

const reducer = {
  app: appSlice,
  blog: blogSlice,
  [dataApi.reducerPath]: dataApi.reducer,
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(dataApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store