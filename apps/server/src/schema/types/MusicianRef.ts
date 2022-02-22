import { Musician } from '@prisma/client';
import builder from '@schema/builder';
import { LatestInfoType } from './LatestInfo';

type MusicianObjectType = Musician & {
  latestInfo?: LatestInfoType;
};

// created to avoid dependency cycle
export const MusicianObject = builder.objectRef<MusicianObjectType>('Musician');
