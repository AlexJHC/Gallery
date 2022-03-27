import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserType} from '../../api/usersApi';

const initialUsersState: initialAppStateType = {
  users: [],
  usersDataLength: 0,
  test: []
}

const usersSlice = createSlice({
  name: 'Users',
  initialState: initialUsersState,
  reducers: {
    setUsersDataLength(state, action: PayloadAction<number>) {
      state.usersDataLength = action.payload
    },
    setData(state, action:PayloadAction<any>) {
      state.test = action.payload
    }
  }
})

type initialAppStateType = {
  users: UserType[]
  usersDataLength: number
  test: any
}

export const {setUsersDataLength,setData} = usersSlice.actions
export default usersSlice.reducer