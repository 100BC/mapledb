import { useMemo } from 'react';

import { capitalCaseWord } from '@utils/functions/stringFormatters';

const useParseSubgenre = (subgenre: string | undefined) => {
  const subgenreParsed = useMemo(() => {
    if (!subgenre) return subgenre;
    return subgenre
      .split(' ')
      .map((word) => {
        if (word === 'r&b') return 'R&B';
        return capitalCaseWord(word);
      })
      .join(' ');
  }, [subgenre]);

  return subgenreParsed;
};

export default useParseSubgenre;
