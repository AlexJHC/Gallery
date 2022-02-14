import {configureStore} from '@reduxjs/toolkit';
import appSlice from './appSlice';


const reducer = {
  appGlobal: appSlice
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch