import React from 'react';

import styles from './LoaderSpinner.module.scss';

function LoaderSpinner({ text }) {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loaderSpinner} />
      {!!text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

export default LoaderSpinner;
