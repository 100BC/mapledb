import { useMemo } from 'react';

const useDateParser = (date: string | null | undefined) => {
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

export default useDateParser;
