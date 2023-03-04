import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { fetchArticles } from '../store/slices/articlesSlice';
import CardList from '../components/CardList';
import LoaderSpinner from '../components/LoaderSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

function HomePage() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchArticles({ offset: (currentPage - 1) * 5 }));
  }, [dispatch, currentPage]);

  const showError = error !== null && <ErrorMessage error={error} />;
  const showSpinner = loading && <LoaderSpinner />;
  const hasData = !(loading || error);
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
