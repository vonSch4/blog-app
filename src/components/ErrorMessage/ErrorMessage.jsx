import React from 'react';

import styles from './ErrorMessage.module.scss';

function ErrorMessage({ error }) {
  return (
    <div className={styles.errorMessage}>
      <h1 className={styles.title}>{error?.name}</h1>
      <p>{error?.message}</p>
    </div>
  );
}

export default ErrorMessage;
