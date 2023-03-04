import React from 'react';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>{new Date().getFullYear()}</span>
      <span>
        {`created by `}
        <a href='https://github.com/vonSch4' target='_blank' rel='noreferrer'>
          vonSch4 ¯\_(ツ)_/¯
        </a>
      </span>
    </footer>
  );
}

export default Footer;
