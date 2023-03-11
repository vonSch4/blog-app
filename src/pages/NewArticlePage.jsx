import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import NewArticleForm from '../components/NewArticleForm';
import { resetIsCreated } from '../store/slices/articleSlice';

function NewArticlePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.user.isLogin);
  const isCreated = useSelector((state) => state.article.isCreated);

  useEffect(() => {
    if (!isLogin) {
      navigate('/sign-in', { state: { from: location }, replace: true });
    }

    if (isCreated) {
      navigate('/articles', { state: { from: location }, replace: true });
      dispatch(resetIsCreated());
    }
  });

  return <NewArticleForm />;
}

export default NewArticlePage;
