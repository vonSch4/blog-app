import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import defaultUserAvatar from '../../assets/image/user-image.png';
import { logOut } from '../../store/slices/userSlice';
import { clearItem, getItem } from '../../storage/storage';

import styles from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);
  const image = useSelector((state) => state.user.user?.image);

  const savedToken = getItem('token');

  if (isLogin) {
    return (
      <header className={styles.header}>
        <Link
          className={classNames(styles.articlesLink, styles.link)}
          to='articles'
        >
          MyBlog
        </Link>
        <Link
          className={classNames(styles.createArticleLink, styles.link)}
          to='new-article'
        >
          Create article
        </Link>
        <Link
          className={classNames(styles.editProfileLink, styles.link)}
          to='edit-profile'
        >
          <span>{user.username}</span>
          <img
            className={styles.userAvatar}
            src={image || defaultUserAvatar}
            alt='Avatar'
          />
        </Link>
        <Link
          className={classNames(styles.logOutLink, styles.link)}
          to='log-out'
          onClick={() => {
            dispatch(logOut());
            clearItem('token');
          }}
        >
          Log Out
        </Link>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <Link
        className={classNames(styles.articlesLink, styles.link)}
        to='articles'
      >
        MyBlog
      </Link>

      {!!savedToken || (
        <Link
          className={classNames(styles.signInLink, styles.link)}
          to='sign-in'
          state={{ from: location }}
        >
          Sign In
        </Link>
      )}

      {!!savedToken || (
        <Link
          className={classNames(styles.signUpLink, styles.link)}
          to='sign-up'
          state={{ from: location }}
        >
          Sign Up
        </Link>
      )}
    </header>
  );
}

export default Header;
