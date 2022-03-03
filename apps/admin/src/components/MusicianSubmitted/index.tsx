import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  musician?: string;
  id?: string;
  error?: string | null;
  resetForm: (arg0: boolean) => void;
}

const MusicianSubmitted = ({ musician, id, error, resetForm }: Props) => {
  return (
    <div className={styles.submitted}>
      {error || `Submitted ${musician}`}
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
            Submit another artist?
          </button>
          <Link href={`/submit/music?id=${id}`}>
            <a>Add music to {musician}?</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MusicianSubmitted;
