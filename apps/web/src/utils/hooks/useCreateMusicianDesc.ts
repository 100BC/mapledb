import { useMemo } from 'react';

import { MusicCardFragment } from '@mapledb/schema/types/web';

const useCreateMusicianDesc = (
  musicians: MusicCardFragment['musicians'] | undefined,
  nonCanadians: MusicCardFragment['nonCanadians'] | undefined
) => {
  const description = useMemo(() => {
    let desc = '';

    musicians?.forEach((musician, index) => {
      desc = desc.concat(`${index > 0 ? ' & ' : ''}${musician.name}`);
    });

    nonCanadians?.forEach((musician) => {
      desc = desc.concat(` & ${musician}`);
    });

    return desc;
  }, [musicians, nonCanadians]);

  return description;
};

export default useCreateMusicianDesc;
