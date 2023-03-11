import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import {
  updateProfileUser,
  clearError,
  clearUpdate,
} from '../../store/slices/userSlice';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

import 'react-toastify/dist/ReactToastify.css';
import styles from './EditProfileForm.module.scss';

function EditProfileForm() {
  const dispatch = useDispatch();

  const serverError = useSelector((state) => state.user.error?.errors);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isUpdated = useSelector((state) => state.user.isUpdated);

  const currentUserName = useSelector((state) => state.user.user.username);
  const currentEmail = useSelector((state) => state.user.user.email);
  const currentImage = useSelector((state) => state.user.user?.image);

  const token = useSelector((state) => state.user.user.token);

  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: currentUserName,
      email: currentEmail,
      image: currentImage,
    },
  });

  const onSubmit = (data) => {
    dispatch(updateProfileUser({ data, token }));
  };

  useEffect(() => {
    if (serverError?.username) {
      setError('root.serverUsernameError', {
        type: `Username ${serverError.username}`,
      });
    }
    if (serverError?.email) {
      setError('root.serverEmailError', { type: `Email ${serverError.email}` });
    }
    if (serverError?.message) {
      setError('root.serverTokenError', {
        type: `${serverError.message}. Try to re-sign in to your account.`,
      });
    }

    return () => dispatch(clearError());
  }, [dispatch, setError, serverError]);

  useEffect(() => {
    if (!isValidUrl && !loading) {
      setError('image', {
        message: 'This picture is invalid. Choose another one.',
      });
    }
  }, [loading, isValidUrl, setError]);

  useEffect(() => {
    if (isUpdated) {
      toast.success('The profile has been successfully changed!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    return () => dispatch(clearUpdate());
  }, [dispatch, isUpdated]);

  return (
    <>
      <div className={styles.formContainer}>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.editProfileForm}
        >
          <legend className={styles.formLegend}>Edit Profile</legend>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Username</span>
            <input
              className={styles.input}
              type='text'
              placeholder='Username'
              {...register('username', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                minLength: {
                  value: 3,
                  message: 'The username must be at least 3 characters long.',
                },
                maxLength: {
                  value: 20,
                  message: 'The username must be no more than 20 characters.',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'Only lowercase english letters and numbers.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.username?.message}
              {errors?.root?.serverUsernameError?.type}
            </span>
          </label>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Email adress</span>
            <input
              className={styles.input}
              type='email'
              placeholder='Email'
              {...register('email', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/,
                  message:
                    'Must be a valid email. Only lowercase english letters and numbers.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.email?.message}
              {errors?.root?.serverEmailError?.type}
            </span>
          </label>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>New password</span>
            <input
              className={styles.input}
              type='password'
              placeholder='Password'
              {...register('password', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                minLength: {
                  value: 6,
                  message: 'The password must be at least 6 characters long.',
                },
                maxLength: {
                  value: 40,
                  message: 'The password must be no more than 40 characters.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.password?.message}
            </span>
          </label>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Avatar image (url)</span>
            <input
              className={styles.input}
              type='text'
              placeholder='Avatar image'
              {...register('image', {
                onChange: (e) => {
                  setUrl(e.target.value);
                  setLoading(true);
                  setIsValidUrl(true);
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {!isValidUrl ? errors?.image?.message : ''}
            </span>
          </label>
          <img
            className={styles.checkImg}
            src={url}
            alt='test'
            onLoad={() => {
              setIsValidUrl(true);
              setLoading(false);
            }}
            onError={() => {
              setIsValidUrl(false);
              setLoading(false);
            }}
          />

          <input
            className={styles.inputSubmit}
            type='submit'
            value={loading ? 'Image loading...' : 'Save'}
            disabled={url ? loading || !isValidUrl : false}
          />
          <span className={styles.inputErrorText}>
            {errors?.root?.serverTokenError?.type}
          </span>
        </form>
      </div>
      {isLoading && <LoaderSpinner />}
    </>
  );
}

export default EditProfileForm;
