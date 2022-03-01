import builder from '@schema/builder';
import { ProvinceEnum, OrderByArgumentEnum } from '@schema/types/Enums';
import { MusicianObject } from '@schema/types/MusicianRef';
import { logger } from '@server';
import { MUSICIAN_QUERY_SIZE } from '@mooseical/constants';

export const musicianList = builder.queryField('musicianList', (t) => {
  return t.field({
    type: [MusicianObject],
    description: `Return up to ${MUSICIAN_QUERY_SIZE} musicians ordered by their latest release date, optional province queries`,
    args: {
      take: t.arg.int({
        required: true,
        validate: { min: 1, max: MUSICIAN_QUERY_SIZE },
      }),
      skip: t.arg.int({ validate: { min: 0 } }),
      province: t.arg({ type: ProvinceEnum }),
      orderBy: t.arg({ type: OrderByArgumentEnum }),
    },
    complexity: (args) => ({ multiplier: args.take }),
    resolve: async (_parent, args, ctx) => {
      logger.info(`Querying Many Musicians with args:${JSON.stringify(args)}`);
      const data = await ctx.prisma.musicianMusic.findMany({
        take: args.take,
        skip: args.skip || 0,
        where: {
          musicRef: { musicType: { in: ['ALBUM', 'EP', 'SINGLE'] } },
          musicianRef: args.province
            ? { city: { province: args.province } }
            : undefined,
        },
        distinct: 'musicianId',
        orderBy:
          args.orderBy === 'DATE_ADDED'
            ? [{ musicianRef: { dateAdded: 'desc' } }]
            : [{ musicRef: { release: 'desc' } }],
        select: {
          musicianRef: true,
          musicRef: {
            select: {
              subgenre: { select: { genre: true } },
              release: true,
            },
          },
        },
      });

      return data.map((musician) => ({
        latestInfo: {
          latestRelease: musician.musicRef.release,
          latestGenre: musician.musicRef.subgenre.genre,
        },
        ...musician.musicianRef,
      }));
    },
  });
});
