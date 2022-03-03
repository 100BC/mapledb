import React from 'react';

import styles from './styles.module.scss';

const Environment = () => {
  const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

  return (
    <h3 className={isDev ? styles.dev : styles.prod}>
      {process.env.NEXT_PUBLIC_NODE_ENV?.toUpperCase()}!
    </h3>
  );
};

export default Environment;
