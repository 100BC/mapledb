import { logger } from '@server';

import builder from '@schema/builder';
import { MusicObject } from '@schema/types/Music';

export const music = builder.queryField('music', (t) => {
  return t.field({
    type: MusicObject,
    description: 'Find a specific song, album, ep or other music by Id',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_parent, args, ctx) => {
      logger.info(`Querying Music: ${args.id}`);
      return ctx.prisma.music.findUniqueOrThrow({
        where: { id: args.id },
      });
    },
  });
});
