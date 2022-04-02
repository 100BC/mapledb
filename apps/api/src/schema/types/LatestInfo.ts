import { Genre } from '@prisma/client';
import builder from '@schema/builder';
import { GenreEnum } from './Enums';

export type LatestInfoType = {
  latestRelease: Date;
  latestGenre: Genre;
};

export const LatestInfoObject = builder.objectRef<LatestInfoType>('LatestInfo');

LatestInfoObject.implement({
  description: 'Latest Release Date and Genre of a Musician',
  fields: (t) => ({
    latestRelease: t.expose('latestRelease', { type: 'Date' }),
    latestGenre: t.expose('latestGenre', { type: GenreEnum }),
  }),
});
