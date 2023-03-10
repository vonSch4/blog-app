import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogService from '../../services';

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async (params, { rejectWithValue }) => {
    try {
      const article = await blogService.getArticle(params);

      return article.data;
    } catch ({ message, name }) {
      return rejectWithValue({ message, name });
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {},
    isLoading: true,
    isError: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchArticle.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.article = action.payload.article;
    });

    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default articleSlice.reducer;
