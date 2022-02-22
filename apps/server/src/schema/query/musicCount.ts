import builder from '@schema/builder';
import { GenreEnum, MusicTypeEnum } from '@schema/types/Enums';
import { logger } from '@server';

export const musicCount = builder.queryField('musicCount', (t) => {
  return t.int({
    description: 'Returns how many music of specified type exists in the db',
    args: {
      type: t.arg({ type: [MusicTypeEnum] }),
      genre: t.arg({ type: GenreEnum }),
    },
    resolve: (_parent, args, ctx) => {
      logger.info('Querying Music Count');
      return ctx.prisma.music.count({
        where: {
          musicType: { in: args.type || undefined },
          ...(args.genre && { subgenre: { genre: args.genre } }),
        },
      });
    },
  });
});
