// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
