import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

interface Props {
  music?: string;
  error?: string | null;
  resetForm: (arg0: boolean) => void;
}

const MusicSubmitted = ({ music, error, resetForm }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.submitted}>
      {error || `Submitted ${music}`}
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
            {router.query.id
              ? 'Submit another musical work for the same Musician?'
              : 'Add another musical work?'}
          </button>
          <Link href="/submit/musician">
            <a>Submit another Musician</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MusicSubmitted;
