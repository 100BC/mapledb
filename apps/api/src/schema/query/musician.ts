import { logger } from '@server';

import builder from '@schema/builder';
import { MusicianObject } from '@schema/types/MusicianRef';

const errorMessage = 'No Musician Found';

export const musician = builder.queryField('musician', (t) => {
  return t.field({
    type: MusicianObject,
    description: 'Find a specific Musician',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_parent, args, ctx) => {
      logger.info(`Querying Musician: ${args.id}`);
      return ctx.prisma.musician.findUnique({
        where: { id: args.id },
        rejectOnNotFound: () => {
          logger.error(errorMessage);
          throw new Error(errorMessage);
        },
      });
    },
  });
});
