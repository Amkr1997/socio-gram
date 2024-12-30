import { createSlice } from "@reduxjs/toolkit";

const authorizeSlice = createSlice({
  name: "authorize",
  initialState: {
    isAuthenticated: !!localStorage.getItem("jwtToken"), // double negation, falsy if not.
    status: "idle",
    error: null,
  },

  reducers: {
    loginUserReducer: (state, action) => {
      localStorage.setItem("jwtToken", action.payload.jwtToken);
      state.isAuthenticated = true;
    },

    logoutUser: (state) => {
      localStorage.removeItem("jwtToken");
      state.isAuthenticated = false;
    },
  },
});

export const { logoutUser, loginUserReducer } = authorizeSlice.actions;

export default authorizeSlice;
