import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.currentUser = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
