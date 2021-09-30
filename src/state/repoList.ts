import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRepo = createAsyncThunk(
  'repoList/fetchRepo',
  async (term: string, thunkAPI) => {
    const response = await axios.get('https://registry.npmjs.org/-/v1/search', {
      params: {
        text: term
      }
    })
    console.log(response.data.objects);
    return response.data.objects;
  }
)

interface RepoListState {
  repoList: {
    loading: 'idle' | 'pending';
    data: string[];
    error: string | null;
  },
};

const repoListInitialState: RepoListState = {
  repoList: {
    data: [],
    loading: 'idle',
    error: null,
  },
};

export const repoListSlice = createSlice({
  name: 'repoList',
  initialState: repoListInitialState,
  reducers: {},
  extraReducers: {
    [fetchRepo.pending.type]: (state, action) => {
      state.repoList = {
        loading: 'pending',
        data: [],
        error: null
      };
    },
    [fetchRepo.fulfilled.type]: (state, action) => {
      state.repoList = {
        loading: 'idle',
        data: action.payload,
        error: null
      };
    },
    [fetchRepo.rejected.type]: (state, action) => {
      state.repoList = {
        loading: 'idle',
        data: [],
        error: action.payload
      };
    },
  },
});

export default repoListSlice.reducer;
export type RootState = ReturnType<typeof repoListSlice.reducer>;