import { useMemo } from 'react';

const useYearParser = (date: string | null | undefined) => {
  const yearParsed = useMemo(() => {
    if (!date) return null;

    return new Date(date).toLocaleDateString('en-ca', {
      timeZone: 'UTC',
      year: 'numeric',
    });
  }, [date]);

  return yearParsed;
};

export default useYearParser;
