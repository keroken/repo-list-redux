import { configureStore } from '@reduxjs/toolkit';
import repoListSlice from './repoList';

export const store = configureStore({
  reducer: repoListSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;