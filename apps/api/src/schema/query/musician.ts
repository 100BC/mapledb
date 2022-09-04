import { logger } from '@server';

import builder from '@schema/builder';
import { MusicianObject } from '@schema/types/MusicianRef';

export const musician = builder.queryField('musician', (t) => {
  return t.field({
    type: MusicianObject,
    description: 'Find a specific Musician',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_parent, args, ctx) => {
      logger.info(`Querying Musician: ${args.id}`);
      return ctx.prisma.musician.findUniqueOrThrow({
        where: { id: args.id },
      });
    },
  });
});
