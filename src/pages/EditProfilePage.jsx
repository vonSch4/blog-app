import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import EditProfileForm from '../components/EditProfileForm';

function EditProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate('/sign-in', { state: { from: location }, replace: true });
    }
  });

  return <EditProfileForm />;
}

export default EditProfilePage;
