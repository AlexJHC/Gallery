import {configureStore} from '@reduxjs/toolkit';
import {dataApi} from '../api/dataApi';
import blogSlice from './slice/blogSlice';
import userSlice from './slice/userSlice';

const reducer = {
  users: userSlice,
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