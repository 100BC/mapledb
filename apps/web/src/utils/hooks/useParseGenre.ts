import { useMemo } from 'react';

import { Genre } from '@mooseical/schema/types';
import { capitalCaseEnums } from '@utils/functions/stringFormatters';

const useParseGenre = (genre: Genre | null) => {
  const capitalGenre = useMemo(() => capitalCaseEnums(genre), [genre]);

  const lowerCaseGenre = useMemo(() => genre?.toLowerCase(), [genre]);

  return [capitalGenre, lowerCaseGenre];
};

export default useParseGenre;
