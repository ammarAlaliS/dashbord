
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authorsReducer from './authorsSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    authors: authorsReducer
    
  },
});
