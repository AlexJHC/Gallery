import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userType} from '../../api/usersApi';

const initialUsersState: initialAppStateType = {
  users: [],
  usersDataLength: 0
}

const usersSlice = createSlice({
  name: 'Users',
  initialState: initialUsersState,
  reducers: {
    setUsersDataLength(state, action: PayloadAction<number>) {
      state.usersDataLength = action.payload
    },
  }
})

type initialAppStateType = {
  users: userType[]
  usersDataLength: number
}

export const {setUsersDataLength} = usersSlice.actions
export default usersSlice.reducer