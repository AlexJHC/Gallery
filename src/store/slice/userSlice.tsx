import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialUsersState: InitialUsersStateType = {
  currentPage: 1
}

const usersSlice = createSlice({
  name: 'Users',
  initialState: initialUsersState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  }
})

export type InitialUsersStateType = {
  currentPage: number
}

export const {setCurrentPage} = usersSlice.actions
export default usersSlice.reducer