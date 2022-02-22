import { MusicObject } from './Music';
import { CityObject } from './City';
import { LatestInfoObject } from './LatestInfo';
import { MusicianObject } from './MusicianRef';
import { MusicTypeEnum } from './Enums';

export const Music = MusicianObject.implement({
  description: 'Musicians of Canada',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    city: t.field({
      type: CityObject,
      complexity: 2,
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.city.findUnique({
          where: { id: parent.cityId },
          rejectOnNotFound: true,
        });
      },
    }),
    disbanded: t.expose('disbanded', { type: 'Date', nullable: true }),
    isGroup: t.exposeBoolean('isGroup'),
    appleLink: t.exposeString('appleLink', { nullable: true }),
    bandcampLink: t.exposeString('bandcampLink', { nullable: true }),
    soundcloudLink: t.exposeString('soundcloudLink', { nullable: true }),
    spotifyLink: t.exposeString('spotifyLink', { nullable: true }),
    youtubeLink: t.exposeString('youtubeLink', { nullable: true }),
    music: t.field({
      type: [MusicObject],
      args: {
        type: t.arg({ type: MusicTypeEnum }),
      },
      complexity: () => ({ field: 10, multiplier: 10 }),
      resolve: (parent, args, ctx) => {
        return ctx.prisma.music.findMany({
          where: {
            musicians: { some: { musicianId: parent.id } },
            musicType: args.type || undefined,
          },
          orderBy: {
            release: 'desc',
          },
        });
      },
    }),
    latestInfo: t.field({
      type: LatestInfoObject,
      nullable: true,
      complexity: () => ({ field: 5, multiplier: 1 }),
      resolve: async (parent, _args, ctx) => {
        if (parent.latestInfo) return parent.latestInfo;

        const data = await ctx.prisma.music.findFirst({
          where: {
            musicType: { in: ['ALBUM', 'EP', 'SINGLE'] },
            musicians: { some: { musicianId: parent.id } },
          },
          orderBy: { release: 'desc' },
          select: {
            subgenre: { select: { genre: true } },
            release: true,
          },
        });

        if (!data) return null;

        const latestRelease = data.release;

        const latestGenre = data.subgenre.genre;

        return { latestGenre, latestRelease };
      },
    }),
  }),
});
