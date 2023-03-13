import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { fetchArticle, resetIsCreated } from '../store/slices/articleSlice';
import EditArticleForm from '../components/EditArticleForm';
import { getItem } from '../storage/storage';

function EditArticlePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const savedToken = getItem('token');
  const isLogin = useSelector((state) => state.user.isLogin);
  const username = useSelector((state) => state.user.user.username);
  const isCreated = useSelector((state) => state.article.isCreated);
  const loading = useSelector((state) => state.article.isLoading);
  const article = useSelector((state) => state?.article?.article);

  const token = useSelector((state) => state.user.user.token);

  useEffect(() => {
    if (!Object.keys(article).length) {
      dispatch(fetchArticle({ slug, token }));
    }
  });

  useEffect(() => {
    if (!isLogin && !savedToken) {
      navigate('/sign-in', { state: { from: location }, replace: true });
    }

    if (isCreated) {
      navigate(-1, { state: { from: location }, replace: true });
      dispatch(resetIsCreated());
    }
  });

  useEffect(() => {
    if (article?.author && isLogin && username !== article.author.username) {
      navigate('/articles', { state: { from: location }, replace: true });
    }
  });

  return loading || <EditArticleForm />;
}

export default EditArticlePage;
