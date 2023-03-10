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
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
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

export default articlesSlice.reducer;
