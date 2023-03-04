import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import ArticlePage from '../../pages/ArticlePage';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import Layout from '../Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate replace to='articles' />} />
        <Route path='articles' element={<HomePage />} />
        <Route path='articles/:slug' element={<ArticlePage />} />
        <Route path='signin' element={<SignInPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
