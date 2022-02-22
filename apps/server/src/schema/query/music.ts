import builder from '@schema/builder';
import { MusicObject } from '@schema/types/Music';
import { logger } from '@server';

const errorMessage = 'No Music Found';

export const music = builder.queryField('music', (t) => {
  return t.field({
    type: MusicObject,
    description: 'Find a specific song, album, ep or other music by Id',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_parent, args, ctx) => {
      logger.info(`Querying Music: ${args.id}`);
      return ctx.prisma.music.findUnique({
        where: { id: args.id },
        rejectOnNotFound: () => {
          logger.error(errorMessage);
          throw new Error(errorMessage);
        },
      });
    },
  });
});
