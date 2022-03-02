import React, { ReactNode } from 'react';
import { CombinedError } from 'urql';

import ErrorComponent from '@components/ErrorComponent';
import Spinner from '@mooseical/ui/Spinner';
import { AllOrNone } from '@mooseical/generics';

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
  if (fetching) return <Spinner />;

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
