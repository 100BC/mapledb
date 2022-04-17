import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Genre, Province } from '@mapledb/schema/types';

import { capitalCaseEnums } from '@utils/functions/stringFormatters';
import getProvinceName from '@utils/functions/getProvinceName';

const useDbFilter = (page: 'music' | 'musicians') => {
  const { query } = useRouter();

  const useGenre = useMemo(() => page === 'music', [page]);

  const tabType = useMemo(() => (useGenre ? Genre : Province), [useGenre]);

  const queryValue = useMemo(
    () => query[useGenre ? 'genre' : 'province'],
    [query, useGenre]
  );

  const params = useMemo(() => {
    return [
      { title: useGenre ? 'All Genres' : 'Canada', value: 'all', select: null },
      ...(Object.values(tabType) as string[]).map((tab) => ({
        title: useGenre ? capitalCaseEnums(tab) : tab.toUpperCase(),
        value: tab.toLowerCase(),
        select: useGenre ? null : getProvinceName(tab as Province),
      })),
    ];
  }, [tabType, useGenre]);

  return { queryValue, params };
};

export default useDbFilter;
