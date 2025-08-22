import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import taskReducer from './taskslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
