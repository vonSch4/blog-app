import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './slices/articlesSlice';
import articleReducer from './slices/articleSlice';
import userSlice from './slices/userSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    user: userSlice,
  },
});
