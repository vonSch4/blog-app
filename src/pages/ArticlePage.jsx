import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticle } from '../store/slices/articleSlice';
import Article from '../components/Article';
import LoaderSpinner from '../components/LoaderSpinner';
import stylesSpinner from '../components/LoaderSpinner/LoaderSpinner.module.scss';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { getItem } from '../storage/storage';

function ArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const loading = useSelector((state) => state.article.isLoading);
  const error = useSelector((state) => state.article.error);
  const isError = useSelector((state) => state.article.isError);

  const token = useSelector((state) => state.user.user.token);
  const savedToken = getItem('token');

  useEffect(() => {
    dispatch(fetchArticle({ slug, token: token || savedToken }));
  }, [dispatch, slug]);

  const showError = error !== null && isError && <ErrorMessage error={error} />;
  const showSpinner = loading && (
    <LoaderSpinner
      text='Загрузка...'
      customClass={stylesSpinner.articleSpinner}
    />
  );
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
