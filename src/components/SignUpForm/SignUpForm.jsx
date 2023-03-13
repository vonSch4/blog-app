import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerNewUser, clearError } from '../../store/slices/userSlice';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

import styles from './SignUpForm.module.scss';

function SignUpForm() {
  const dispatch = useDispatch();
  const serverError = useSelector((state) => state.user.error?.errors);
  const isLoading = useSelector((state) => state.user.isLoading);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(registerNewUser(data));
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

    return () => dispatch(clearError());
  }, [dispatch, setError, serverError]);

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
          <legend className={styles.formLegend}>Create new account</legend>
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
                    'The email is incorrect. Use lowercase English letters and numbers.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.email?.message}
              {errors?.root?.serverEmailError?.type}
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
            </span>
          </label>
          <label className={styles.label}>
            <span className={styles.inputLabelText}>Repeat password</span>
            <input
              className={styles.input}
              type='password'
              placeholder='Repeat password'
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: 'The field is required.',
                },
                validate: {
                  checkPassword: (value, formValue) =>
                    value === formValue.password || 'Passwords must match.',
                },
              })}
            />
            <span className={styles.inputErrorText}>
              {errors?.confirmPassword?.message}
            </span>
          </label>
          <label className={styles.labelCheckbox}>
            <input
              className={styles.inputCheckbox}
              type='checkbox'
              {...register('сonsent', {
                required: {
                  value: true,
                  message: 'Consent is required.',
                },
              })}
            />
            <span className={styles.inputCheckboxText}>
              I agree to the processing of my personal information
            </span>
            <span className={styles.inputErrorText}>
              {errors?.сonsent?.message}
            </span>
          </label>

          <input className={styles.inputSubmit} type='submit' value='Create' />
        </form>
        <span className={styles.linkSignIn}>
          Already have an account?{' '}
          <Link className={styles.link} to='/sign-in'>
            Sign In.
          </Link>
        </span>
      </div>
      {isLoading && <LoaderSpinner customClass={styles.loaderContainer} />}
    </>
  );
}

export default SignUpForm;
