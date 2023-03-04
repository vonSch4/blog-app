import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticle } from '../store/slices/articleSlice';
import Article from '../components/Article';
import LoaderSpinner from '../components/LoaderSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

function ArticlePage() {
  const dispatch = useDispatch();
  const params = useParams();

  const loading = useSelector((state) => state.article.isLoading);
  const error = useSelector((state) => state.article.error);
  const isError = useSelector((state) => state.article.isError);

  useEffect(() => {
    dispatch(fetchArticle(params));
  }, [dispatch, params]);

  const showError = error !== null && isError && <ErrorMessage error={error} />;
  const showSpinner = loading && <LoaderSpinner text='Загрузка статьи...' />;
  const hasData = !(loading || isError);
  const showContent = hasData && <Article />;

  return (
    <>
      {showError}
      {showSpinner}
      {showContent}
    </>
  );
}

export default ArticlePage;
