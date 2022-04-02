import { useMemo } from 'react';

import { Genre } from '@mooseical/schema/types';
import { capitalCaseEnums } from '@utils/functions/stringFormatters';

const useGenreParser = (genre: Genre | null) => {
  const capitalGenre = useMemo(
    () => (genre ? capitalCaseEnums(genre) : ''),
    [genre]
  );

  const capitalGenreSpaced = useMemo(
    () => (capitalGenre ? `${capitalGenre} ` : ''),
    [capitalGenre]
  );

  const lowerCaseGenre = useMemo(
    () => (genre ? genre.toLowerCase() : ''),
    [genre]
  );

  const lowerCaseGenreSpaced = useMemo(
    () => (lowerCaseGenre ? `${lowerCaseGenre} ` : ''),
    [lowerCaseGenre]
  );

  return [
    capitalGenre,
    capitalGenreSpaced,
    lowerCaseGenre,
    lowerCaseGenreSpaced,
  ];
};

export default useGenreParser;
