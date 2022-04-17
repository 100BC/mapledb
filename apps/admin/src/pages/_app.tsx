import React from 'react';
import type { AppProps /* AppContext */ } from 'next/app';
import { Provider as UrqlProvider } from 'urql';
import 'normalize.css';

import Spinner from '@mapledb/shared/components/Spinner';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import useAuth from '@utils/hooks/useAuth';
import SignInForm from '@components/SignInForm';
import '@styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [currentUser, loading] = useAuth();

  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <UrqlProvider value={gqlClient}>
      {loading ? (
        <div style={{ margin: 'auto', width: 'fit-content' }}>
          <Spinner />
        </div>
      ) : (
        <>{currentUser ? <Component {...pageProps} /> : <SignInForm />}</>
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
