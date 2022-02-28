import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql';

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });

const gqlClient = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_SERVER!,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  fetchOptions: () => {
    // if (isServerSide) {
    //   return {
    //     headers: {
    //       Authorization: `Basic ${process.env.SECRET_API_KEY}`,
    //     },
    //   };
    // }
    return {};
  },
});

export { gqlClient, ssrCache };
