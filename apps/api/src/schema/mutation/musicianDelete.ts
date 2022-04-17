import { logger } from '@server';

import builder from '@schema/builder';
import { MusicianObject } from '@schema/types/MusicianRef';
import { cloudinaryDelete } from '@utils/imageUtils/cloudinaryFunctions';
import musicianExistsValidator from '@utils/validators/musicianExistsValidator';

export const musicianDelete = builder.mutationField('musicianDelete', (t) => {
  return t.field({
    type: MusicianObject,
    description: 'Deletes a musician and all their music',
    authScopes: {
      authMutation: true,
    },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_parent, args, ctx) => {
      logger.info('Starting Musician Delete');

      const { id } = args;

      await musicianExistsValidator({
        musicianId: id,
        prisma: ctx.prisma,
      });

      const musicWithCovers = await ctx.prisma.music.findMany({
        where: { musicians: { some: { musicianId: id } }, hasCover: true },
      });

      musicWithCovers.forEach((piece) => {
        cloudinaryDelete(piece.id);
      });

      await ctx.prisma.music.deleteMany({
        where: { musicians: { some: { musicianId: id } } },
      });

      const musician = await ctx.prisma.musician.delete({
        where: { id },
      });

      logger.info(`Deleted Musician: ${id}`);

      return musician;
    },
  });
});
