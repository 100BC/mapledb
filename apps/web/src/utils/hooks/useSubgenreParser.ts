import { capitalCaseWord } from '@utils/functions/stringFormatters';
import { useMemo } from 'react';

const useSubgenreParser = (subgenre: string) => {
  const subgenreParsed = useMemo(() => {
    return subgenre
      .split(' ')
      .map((word) => capitalCaseWord(word))
      .join(' ');
  }, [subgenre]);

  return subgenreParsed;
};

export default useSubgenreParser;
