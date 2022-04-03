import { useMemo } from 'react';

import { MusicType } from '@mooseical/schema/types';

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
      case 'DELUXE':
        return {
          sentence: 'a deluxe release',
          capitalCase: 'Deluxe Release',
          lowerCase: 'deluxe release',
        };
      case 'COMPILATION':
        return {
          sentence: 'a compilation',
          capitalCase: 'Compilation',
          lowerCase: 'compilation',
        };
      case 'REMIX':
        return {
          sentence: 'a remix',
          capitalCase: 'Remix',
          lowerCase: 'remix',
        };
      case 'LIVE':
        return {
          sentence: 'a live release',
          capitalCase: 'Live Release',
          lowerCase: 'live Release',
        };
      case 'OTHER':
        return {
          sentence: 'a project',
          capitalCase: 'Project',
          lowerCase: 'project',
        };
      default:
        return {
          sentence: 'a project',
          capitalCase: 'Project',
          lowerCase: 'project',
        };
    }
  }, [musicType]);

  return musicTypeParsed;
};

export default useMusicTypeParser;
