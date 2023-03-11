import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';
import SignInForm from '../components/SignInForm/SignInForm';
import { getItem } from '../storage/storage';

function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);
  const savedToken = getItem('token');

  const fromPath = location.state?.from?.pathname || '/articles';
  const fromSearch = location.state?.from?.search || '';
  const fromPage = fromPath + fromSearch;

  useEffect(() => {
    if (isLogin) {
      navigate(fromPage, { replace: true });
    }
  });

  if (savedToken) return <LoaderSpinner />;

  return isLogin || <SignInForm />;
}

export default SignInPage;
