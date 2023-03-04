import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to='articles'>
        MyBlog
      </Link>
      <Link className={styles.link} to='signin'>
        Sign In
      </Link>
      <Link className={styles.link} to='signup'>
        Sign Up
      </Link>
    </header>
  );
}

export default Header;
