import { useMemo } from 'react';

import { MusicType } from '@mooseical/schema';

const useMusicTypeParser = (musicType: MusicType | undefined) => {
  const musicTypeParsed = useMemo(() => {
    switch (musicType) {
      case 'ALBUM':
        return {
          sentence: 'an album',
          capitalCase: 'Album',
          lowerCase: 'album',
        };
      case 'EP':
        return { sentence: 'an EP', capitalCase: 'EP', lowerCase: 'ep' };
      case 'SINGLE':
        return {
          sentence: 'a single',
          capitalCase: 'Single',
          lowerCase: 'single',
        };
      case 'LIVE':
        return {
          sentence: 'a live work',
          capitalCase: 'Live Collection',
          lowerCase: 'live collection',
        };
      case 'OTHER':
        return {
          sentence: 'a musical work',
          capitalCase: 'Music',
          lowerCase: 'music',
        };
      default:
        return {
          sentence: 'a musical work',
          capitalCase: 'Music',
          lowerCase: 'music',
        };
    }
  }, [musicType]);

  return musicTypeParsed;
};

export default useMusicTypeParser;
