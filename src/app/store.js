import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import coursesReducer from '../features/coursesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
  },
});
