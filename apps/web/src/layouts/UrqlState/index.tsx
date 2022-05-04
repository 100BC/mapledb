import React, { ReactNode } from 'react';
import { CombinedError } from 'urql';
import Head from 'next/head';

import Spinner from '@mapledb/shared/components/Spinner';
import { AllOrNone } from '@mapledb/generics';

import ServerError from '@components/ServerError';
import { DOMAIN_NAME, META_DESCRIPTION, META_TITLE } from '@layouts/Main';

type Props = {
  fetching: boolean;
  error: CombinedError | undefined;
  children: ReactNode;
} & AllOrNone<{
  errorComponent: boolean;
  errorStatusCode?: number;
}>;

const UrqlStateLayout = ({
  fetching,
  error,
  children,
  errorComponent,
  errorStatusCode,
}: Props) => {
  if (fetching)
    return (
      <>
        <Head>
          <title>MapleDB | Loading</title>
          <meta name="robots" content="noindex" />

          <meta property="og:title" content={META_TITLE} />
          <meta name="twitter:title" content={META_TITLE} />

          <meta name="description" content={META_DESCRIPTION} />
          <meta property="og:description" content={META_DESCRIPTION} />
          <meta name="twitter:description" content={META_DESCRIPTION} />

          <meta property="og:url" content={DOMAIN_NAME} />
        </Head>
        <Spinner />
      </>
    );

  if (error) {
    if (errorComponent)
      return <ServerError error={error.message} errorNum={errorStatusCode} />;

    return <>{error.message}</>;
  }

  return <>{children}</>;
};

export default UrqlStateLayout;
