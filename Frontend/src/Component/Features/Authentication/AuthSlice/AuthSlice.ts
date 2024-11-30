import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userName, accessToken, role } = action.payload;
      state.userName = userName;
      state.token = accessToken;
      state.role = role;
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
