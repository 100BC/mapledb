import { ServerResponse } from 'http';

const setSSRCache = (res: ServerResponse, days: number) => {
  const cacheAge = 60 * 60 * 24 * days; // seconds * minutes * hours * days

  return res.setHeader(
    'Cache-Control',
    `public, s-maxage=${cacheAge}, stale-while-revalidate=${cacheAge * 2}`
  );
};

export default setSSRCache;
