import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  setToken: (arg0: string | null) => void;
}

export const ReCaptcha = ({ setToken }: Props) => {
  return (
    <div className={styles.recaptchaContainer}>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
        onChange={(t) => setToken(t)}
      />
      <Link href="/about/privacy-policy">
        <a>Privacy Policy</a>
      </Link>
    </div>
  );
};
