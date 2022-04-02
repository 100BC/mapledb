import builder from '@schema/builder';
import { MUSIC_QUERY_SIZE } from '@mooseical/constants';
import { logger } from '@server';
import { MusicObject } from '@schema/types/Music';
import { GenreEnum, MusicTypeEnum } from '@schema/types/Enums';

export const musicList = builder.queryField('musicList', (t) => {
  return t.field({
    type: [MusicObject],
    description: `Return up to ${MUSIC_QUERY_SIZE} musical works ordered by release date, optional subgenre and type of music query`,
    args: {
      take: t.arg.int({
        required: true,
        validate: { min: 1, max: MUSIC_QUERY_SIZE },
      }),
      skip: t.arg.int(),
      genre: t.arg({ type: GenreEnum }),
      type: t.arg({ type: [MusicTypeEnum] }),
    },
    complexity: (args) => ({ multiplier: args.take }),
    resolve: async (_parent, args, ctx) => {
      logger.info(`Querying Many Music with args:${JSON.stringify(args)}`);

      const data = await ctx.prisma.music.findMany({
        take: args.take,
        skip: args.skip || 0,
        where: {
          subgenre: args.genre ? { genre: args.genre } : undefined,
          musicType: args.type ? { in: args.type } : undefined,
        },
        include: { musicians: { select: { musicianRef: true } } },
        orderBy: [{ release: 'desc' }, { name: 'asc' }],
      });

      return data.map((i) => ({
        ...i,
        musicians: i.musicians.map((ii) => ii.musicianRef),
      }));
    },
  });
});
