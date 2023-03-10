import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import ArticlePage from '../../pages/ArticlePage';
import EditArticlePage from '../../pages/EditArticlePage';
import EditProfilePage from '../../pages/EditProfilePage';
import HomePage from '../../pages/HomePage';
import NewArticlePage from '../../pages/NewArticlePage';
import NotFoundPage from '../../pages/NotFoundPage';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import { getItem } from '../../storage/storage';
import { getUser } from '../../store/slices/userSlice';
import Layout from '../Layout';

function App() {
  const dispatch = useDispatch();
  const savedToken = getItem('token');

  useEffect(() => {
    if (savedToken) dispatch(getUser({ token: savedToken }));
  }, [dispatch, savedToken]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate replace to='/articles' />} />
        <Route path='articles' element={<HomePage />} />
        <Route path='articles/:slug' element={<ArticlePage />} />
        <Route path='articles/:slug/edit' element={<EditArticlePage />} />
        <Route path='sign-in' element={<SignInPage />} />
        <Route path='sign-up' element={<SignUpPage />} />
        <Route path='new-article' element={<NewArticlePage />} />
        <Route path='edit-profile' element={<EditProfilePage />} />
        <Route path='log-out' element={<Navigate replace to='/articles' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
