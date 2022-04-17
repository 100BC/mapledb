import { useMemo } from 'react';

import { capitalCaseWord } from '@utils/functions/stringFormatters';

const useParseSubgenre = (subgenre: string) => {
  const subgenreParsed = useMemo(() => {
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
