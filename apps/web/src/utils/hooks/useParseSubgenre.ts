import { capitalCaseWord } from '@utils/functions/stringFormatters';
import { useMemo } from 'react';

const useParseSubgenre = (subgenre: string) => {
  const subgenreParsed = useMemo(() => {
    if (subgenre === 'r&b') return 'R&B';
    return subgenre
      .split(' ')
      .map((word) => capitalCaseWord(word))
      .join(' ');
  }, [subgenre]);

  return subgenreParsed;
};

export default useParseSubgenre;
