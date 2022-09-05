import { combine, conditional } from '@mapledb/shared/style-helpers';

import styles from './styles.module.scss';

const Environment = () => {
  const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

  return (
    <div
      className={combine(
        styles.env,
        conditional(isDev, styles.dev, styles.prod)
      )}
    >
      {process.env.NEXT_PUBLIC_NODE_ENV?.toUpperCase()}!
    </div>
  );
};

export default Environment;
