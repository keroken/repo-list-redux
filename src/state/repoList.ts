import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RepoListState {
  repoList: {
    loading: 'idle' | 'pending';
    data: string[];
    error: string | null;
  },
};

export const fetchRepo = createAsyncThunk(
  'repoList/fetch',
  async (term: string, thunkAPI) => {
    const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
      params: {
        text: term
      }
    })
    const names = data.objects.map((results: any) => {
      return results.package.name;
    })
    return names;
  }
)

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
  extraReducers: (builder) => {
    builder.addCase(fetchRepo.pending, (state, action) => {
      state.repoList = {
        loading: 'pending',
        data: [],
        error: null
      };
    });
    builder.addCase(fetchRepo.fulfilled, (state, action) => {
      state.repoList = {
        loading: 'idle',
        data: action.payload,
        error: null
      };
    });
    builder.addCase(fetchRepo.rejected, (state, action) => {
      state.repoList = {
        loading: 'idle',
        data: [],
        error: 'error'
      };
    });
  },
});

export default repoListSlice.reducer;
export type RootState = ReturnType<typeof repoListSlice.reducer>;