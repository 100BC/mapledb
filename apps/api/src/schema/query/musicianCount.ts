import builder from '@schema/builder';
import { ProvinceEnum } from '@schema/types/Enums';
import { logger } from '@server';

export const musicianCount = builder.queryField('musicianCount', (t) => {
  return t.int({
    description: 'Returns how many musicians exists in the db',
    args: {
      province: t.arg({ type: ProvinceEnum }),
    },
    resolve: (_parent, args, ctx) => {
      logger.info(
        `Querying Musician Count${args.province ? ` in ${args.province}` : ''}`
      );
      return ctx.prisma.musician.count({
        where: args.province
          ? { city: { province: args.province } }
          : undefined,
      });
    },
  });
});
