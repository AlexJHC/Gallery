import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialAppState: initialAppStateType = {
  isLoading: true,
  isError: false,
}

const appSlice = createSlice({
  name: 'AppGlobal',
  initialState: initialAppState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload
    },
  }
})

export type initialAppStateType = {
  isLoading: boolean
  isError: boolean
}

export const {setLoading, setError} = appSlice.actions
export default appSlice.reducer