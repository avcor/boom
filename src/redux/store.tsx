import {configureStore} from '@reduxjs/toolkit';
import mainSlice from './slice/currentUserSlice';
import currentUserSlice from './slice/currentUserSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
