import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  global_user: null,
  driver_information: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.global_user = action.payload.global_user;
      state.driver_information = action.payload.driver_information;
    },
    clearUser: (state) => {
      state.global_user = null;
      state.driver_information = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
