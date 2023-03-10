import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, clearError } from '../../store/slices/userSlice';

import styles from './SignInForm.module.scss';

function SignInForm() {
  const dispatch = useDispatch();
  const serverErrors = useSelector((state) => state.user.error?.errors);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (serverErrors) {
      setError('root.serverEmailOrPasswordError', {
        type: 'Invalid email or password.',
      });
    }

    return () => dispatch(clearError());
  }, [dispatch, setError, serverErrors]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signInForm}>
        <legend className={styles.formLegend}>Sign In</legend>
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
            {errors?.root?.serverEmailOrPasswordError?.type}
          </span>
        </label>
        <label className={styles.label}>
          <span className={styles.inputLabelText}>Password</span>
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
            {errors?.root?.serverEmailOrPasswordError?.type}
          </span>
        </label>

        <input className={styles.inputSubmit} type='submit' value='Login' />
      </form>
      <span className={styles.linkSignIn}>
        Don’t have an account?{' '}
        <Link className={styles.link} to='/sign-up'>
          Sign Up.
        </Link>
      </span>
    </div>
  );
}

export default SignInForm;
