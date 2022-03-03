import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  music?: string;
  error?: string | null;
  resetForm: (arg0: boolean) => void;
}

const MusicUpdated = ({ music, error, resetForm }: Props) => {
  return (
    <div className={styles.submitted}>
      {error || `Updated ${music}`}
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
          <button type="button" onClick={() => resetForm(true)}>
            Update another Musical Work?
          </button>
          <Link href="/">
            <a>Return Home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MusicUpdated;
