import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  music?: string;
  error?: string | null;
  resetForm: (arg0: boolean) => void;
}

const MusicDeleted = ({ music, error, resetForm }: Props) => {
  return (
    <div className={styles.submitted}>
      {error || `Deleted ${music}`}
      {error && (
        <div className={styles.buttonContainer}>
          <button type="button" onClick={() => resetForm(false)}>
            Try Again
          </button>
          <button type="button" onClick={() => resetForm(true)}>
            Reset Form
          </button>
        </div>
      )}
      {!error && (
        <div className={styles.buttonContainer}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MusicDeleted;
