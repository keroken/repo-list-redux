import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RepoListState {
  loading: 'idle' | 'pending';
  data: { name: string, link: string }[];
  error: string | null;
};

export const fetchRepo = createAsyncThunk(
  'repoList/fetchRepo',
  async (term: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: term
        }
      })
      console.log(data);
      const names = data.objects.map((results: any) => {
        return ({
          name: results.package.name,
          link: results.package.links.homepage,
        });
      })
      return names;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const repoListInitialState: RepoListState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const repoListSlice = createSlice({
  name: 'repoList',
  initialState: repoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepo.pending, (state, action) => {
      state.loading = 'pending';
      state.data = [];
      state.error = null;
    });
    builder.addCase(fetchRepo.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRepo.rejected, (state, action) => {
      state.loading = 'idle';
      state.data = [];
      state.error = 'error';
    });
  },
});

export default repoListSlice;
export type RootState = ReturnType<typeof repoListSlice.reducer>;