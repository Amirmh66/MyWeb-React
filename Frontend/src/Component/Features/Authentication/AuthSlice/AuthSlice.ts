import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  userName: null,
  token: null,
  role: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userName, accessToken, role , id , email } = action.payload;
      state.id = id
      state.userName = userName;
      state.email = email;
      state.role = role;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.userName = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUserName = (state: any) => state.auth.userName;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentRole = (state: any) => state.auth.role;
export const selectCurrentId = (state: any) => state.auth.id;
export const selectCurrentEmail = (state: any) => state.auth.email;
