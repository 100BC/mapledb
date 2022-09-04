import { logger } from '@server';

import builder from '@schema/builder';
import { MusicObject } from '@schema/types/Music';
import { cloudinaryDelete } from '@utils/imageUtils/cloudinaryFunctions';

export const musicDelete = builder.mutationField('musicDelete', (t) => {
  return t.field({
    type: MusicObject,
    description: 'Deletes a musical work',
    authScopes: {
      authMutation: true,
    },
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_parent, args, ctx) => {
      logger.info('Starting Music Delete');

      const { id } = args;

      const musicInfo = await ctx.prisma.music.findUniqueOrThrow({
        where: { id: args.id },
      });

      if (musicInfo.hasCover) await cloudinaryDelete(args.id);

      const music = await ctx.prisma.music.delete({
        where: { id },
      });

      logger.info(`Deleted Music: ${id}`);

      return music;
    },
  });
});
