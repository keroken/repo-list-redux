import { createSlice } from '@reduxjs/toolkit';

interface RepoState {
  loading: boolean;
  error: string | null;
  data: string[];
};

const initialState: RepoState = {
  data: [],
  error: null,
  loading: false
};

export const repoListSlice = createSlice({
  name: 'repoList',
  initialState,
  reducers: {
    searchRepo: (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    searchRepoSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    searchRepoError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    }
  }
});

export const { searchRepo, searchRepoSuccess, searchRepoError } = repoListSlice.actions;

export default repoListSlice.reducer;