import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habitsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    user: userReducer
  }
});