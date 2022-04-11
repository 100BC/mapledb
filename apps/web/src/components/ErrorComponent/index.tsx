import React from 'react';
import Head from 'next/head';

import { DOMAIN_NAME, META_DESCRIPTION, META_TITLE } from '@components/Layout';
import styles from './styles.module.scss';

interface Props {
  error?: string;
  errorNum?: number;
}

const ErrorComponent = ({ error, errorNum = 404 }: Props) => {
  return (
    <>
      <Head>
        <title>{`MapleDB | ${errorNum}`}</title>
        <meta name="robots" content="noindex" />

        <meta property="og:title" content={META_TITLE} />
        <meta name="twitter:title" content={META_TITLE} />

        <meta name="description" content={META_DESCRIPTION} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta name="twitter:description" content={META_DESCRIPTION} />

        <meta property="og:url" content={DOMAIN_NAME} />
      </Head>
      {errorNum >= 500 ? (
        <>
          <h1>Ouch! Sorry About That</h1>
          <hr />
          <h2>Something went wrong on our end</h2>
        </>
      ) : (
        <>
          <h1>Watch where ya going there bud</h1>
          <hr />
          <h2>We can&apos;t find whatcha looking for</h2>
        </>
      )}

      <div className={styles.error}>
        <h3>{errorNum}</h3>
        {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default ErrorComponent;
