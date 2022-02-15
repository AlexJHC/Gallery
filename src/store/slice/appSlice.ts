import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialAppState: initialAppStateType = {
  isLoading: false,
  isError: 'Error',
}

const appSlice = createSlice({
  name: 'AppGlobal',
  initialState: initialAppState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.isError = action.payload
    },
  }
})

type initialAppStateType = {
  isLoading: boolean
  isError: string
}

export const {setLoading, setError} = appSlice.actions
export default appSlice.reducer