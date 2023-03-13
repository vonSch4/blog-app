import React from 'react';
import classNames from 'classnames';

import styles from './LoaderSpinner.module.scss';

function LoaderSpinner({ text, customClass }) {
  return (
    <div className={classNames(styles.loaderContainer, customClass)}>
      <span className={styles.loaderSpinner} />
      {!!text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

export default LoaderSpinner;
