import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JwtResponse } from '../../models/authDtos/JwtResponse';

export interface UserState {
  isUserLoggedIn: boolean,
  jwtResponse: JwtResponse
}

const initialState: UserState = {
  isUserLoggedIn: false,
  jwtResponse: {
    id: "",
    jwt: "",
    username: "",
    email: ""
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {

    setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },

    setUser: (state, action: PayloadAction<JwtResponse>) => {
      const jwtResponse = action.payload
      state.jwtResponse = jwtResponse;
      localStorage.setItem(
        "loggedInUserInfo",
        JSON.stringify({
          id: jwtResponse.id,
          jwt: jwtResponse.jwt,
          username: jwtResponse.username,
          email: jwtResponse.email
        })
      )
    },


  },
});

export const {
  setIsUserLoggedIn,
  setUser
} = userSlice.actions;

export default userSlice.reducer

