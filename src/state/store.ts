import { configureStore } from '@reduxjs/toolkit';
import repoListReducer from './repoList';

export default configureStore({
  reducer: {
    repoList: repoListReducer
  },
});
