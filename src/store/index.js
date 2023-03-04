import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './slices/articlesSlice';
import articleReducer from './slices/articleSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
  },
});
