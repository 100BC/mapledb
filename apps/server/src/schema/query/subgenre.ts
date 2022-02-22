import builder from '@schema/builder';
import { GenreEnum } from '@schema/types/Enums';
import { SubgenreObject } from '@schema/types/Subgenre';
import { logger } from '@server';

export const subgenreList = builder.queryField('subgenreList', (t) => {
  return t.field({
    type: [SubgenreObject],
    description: `Return the subgenres in the db and how many musical works they have`,
    args: {
      take: t.arg.int(),
      genre: t.arg({ type: [GenreEnum] }),
    },
    complexity: (args) => ({ multiplier: args.take ?? 30 }),
    resolve: (_parent, args, ctx) => {
      const { take, genre } = args;

      logger.info('Querying Many Subgenres');
      return ctx.prisma.subgenre.findMany({
        take: take || undefined,
        where: {
          genre: { in: genre || undefined },
        },
      });
    },
  });
});
