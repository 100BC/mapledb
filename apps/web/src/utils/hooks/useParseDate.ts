import { useMemo } from 'react';

const useParseDate = (date: string | null | undefined) => {
  const dateParsed = useMemo(() => {
    if (!date) return null;

    return new Date(date).toLocaleDateString('en-ca', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }, [date]);

  return dateParsed;
};

export default useParseDate;

export const useParseYear = (date: string | null | undefined) => {
  const yearParsed = useMemo(() => {
    if (!date) return null;

    return new Date(date).toLocaleDateString('en-ca', {
      timeZone: 'UTC',
      year: 'numeric',
    });
  }, [date]);

  return yearParsed;
};
