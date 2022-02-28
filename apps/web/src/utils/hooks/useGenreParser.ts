import { Genre } from '@graphql/schema';
import { useMemo } from 'react';

const useGenreParser = (genre: Genre | null) => {
  const capitalGenre = useMemo(
    () => (genre ? genre[0] + genre.toLowerCase().slice(1) : ''),
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
