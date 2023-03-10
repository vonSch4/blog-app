import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { fetchArticles } from '../store/slices/articlesSlice';
import CardList from '../components/CardList';
import LoaderSpinner from '../components/LoaderSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { getItem } from '../storage/storage';

function HomePage() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);
  const isError = useSelector((state) => state.articles.isError);

  const token = useSelector((state) => state.user.user.token);
  const savedToken = getItem('token');

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(
      fetchArticles({
        offset: (currentPage - 1) * 5,
        token: token || savedToken,
      })
    );
  }, [dispatch, currentPage, savedToken, token]);

  const showError = error !== null && isError && <ErrorMessage error={error} />;
  const showSpinner = loading && <LoaderSpinner text='Загрузка статей...' />;
  const hasData = !(loading || isError);
  const showContent = hasData && <CardList />;

  return (
    <>
      {showError}
      {showSpinner}
      {showContent}
    </>
  );
}

export default HomePage;
