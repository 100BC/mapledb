import React, { ReactNode } from 'react';
import { CombinedError } from 'urql';

import ErrorComponent from '@components/ErrorComponent';
import Spinner from '@mooseical/shared/components/Spinner';
import { AllOrNone } from '@mooseical/generics';
import Head from 'next/head';
import { DOMAIN_NAME, META_DESCRIPTION, META_TITLE } from '@components/Layout';

type Props = {
  fetching: boolean;
  error: CombinedError | undefined;
  children: ReactNode;
} & AllOrNone<{
  errorComponent: boolean;
  errorStatusCode?: number;
}>;

const GqlContainer = ({
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
          <title>Mooseical | Loading</title>
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
      return (
        <ErrorComponent error={error.message} errorNum={errorStatusCode} />
      );

    return <>{error.message}</>;
  }

  return <>{children}</>;
};

export default GqlContainer;
