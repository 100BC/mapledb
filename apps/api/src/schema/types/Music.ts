import { Music, Musician } from '@prisma/client';
import builder from '@schema/builder';

import { MusicianObject } from './MusicianRef';
import { MusicTypeEnum } from './Enums';
import { SubgenreObject } from './Subgenre';

type MusicObjectType = Music & { musicians?: Musician[] };

export const MusicObject = builder.objectRef<MusicObjectType>('Music');

MusicObject.implement({
  description: 'Music of Canadian Musicians',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    release: t.expose('release', { type: 'Date' }),
    instrumental: t.exposeBoolean('instrumental'),
    hasCover: t.exposeBoolean('hasCover'),
    nonCanadians: t.exposeStringList('nonCanadians'),
    musicType: t.expose('musicType', { type: MusicTypeEnum }),
    subgenre: t.field({
      type: SubgenreObject,
      complexity: 2,
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.subgenre.findUnique({
          where: { id: parent.subgenreId },
          rejectOnNotFound: true,
        });
      },
    }),
    appleLink: t.exposeString('appleLink', { nullable: true }),
    bandcampLink: t.exposeString('bandcampLink', { nullable: true }),
    spotifyLink: t.exposeString('spotifyLink', { nullable: true }),
    youtubeLink: t.exposeString('youtubeLink', { nullable: true }),
    copyright: t.exposeString('copyright', { nullable: true }),
    musicians: t.field({
      type: [MusicianObject],
      complexity: () => ({ field: 4, multiplier: 1 }),
      resolve: (parent, _args, ctx) => {
        if (parent.musicians) return parent.musicians;

        return ctx.prisma.musician.findMany({
          where: { music: { some: { musicId: parent.id } } },
        });
      },
    }),
  }),
});
