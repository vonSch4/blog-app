import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogService from '../../services';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (params, { rejectWithValue }) => {
    try {
      const articles = await blogService.getArticles(params);

      return articles.data;
    } catch ({ message, name }) {
      return rejectWithValue({ message, name });
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    isLoading: true,
    isError: false,
    error: null,
  },
  reducers: {
    setCurrentOffset: (state, action) => {
      state.currentOffset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });

    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { setCurrentOffset } = articlesSlice.actions;

export default articlesSlice.reducer;
