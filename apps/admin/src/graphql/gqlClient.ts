import { createClient, ssrExchange, dedupExchange, cacheExchange } from 'urql';

import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });

const gqlClient = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_SERVER!,
  exchanges: [dedupExchange, cacheExchange, ssrCache, multipartFetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
      },
    };
  },
});

export { gqlClient, ssrCache };
