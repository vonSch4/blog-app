import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm';

function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);

  const fromPath = location.state?.from?.pathname || '/articles';
  const fromSearch = location.state?.from?.search || '';
  const fromPage = fromPath + fromSearch;

  useEffect(() => {
    if (isLogin) {
      navigate(fromPage, { replace: true });
    }
  });

  return isLogin || <SignUpForm />;
}

export default SignUpPage;
