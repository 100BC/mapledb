import React from 'react';
import type { AppProps /* AppContext */ } from 'next/app';
import { Provider as UrqlProvider } from 'urql';

import { gqlClient, ssrCache } from '@graphql/gqlClient';

import 'normalize.css';
import '@styles/global.scss';
import useAuth from '@utils/hooks/useAuth';
import Spinner from '@mooseical/shared/components/Spinner';

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }
  const [, loading] = useAuth();

  return (
    <UrqlProvider value={gqlClient}>
      {loading ? (
        <div style={{ margin: 'auto', width: 'fit-content' }}>
          <Spinner />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </UrqlProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
