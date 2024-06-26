import { logger } from '@server';

import builder from '@schema/builder';
import idCreator from '@utils/helpers/idCreator';
import linksValidator from '@utils/validators/linksValidator';
import frenchCityParser from '@utils/helpers/frenchCityParser';
import { MusicianObject } from '@schema/types/MusicianRef';
import { ProvinceEnum } from '@schema/types/Enums';
import trimArgs from '@utils/helpers/trimArgs';

export const musicianAdd = builder.mutationField('musicianAdd', (t) => {
  return t.field({
    type: MusicianObject,
    description: 'Add an Musician',
    authScopes: {
      authMutation: true,
    },
    args: {
      name: t.arg.string({ required: true }),
      city: t.arg.string({ required: true }),
      province: t.arg({ type: ProvinceEnum, required: true }),
      appleLink: t.arg.string(),
      bandcampLink: t.arg.string(),
      spotifyLink: t.arg.string(),
      youtubeLink: t.arg.string(),
      isGroup: t.arg.boolean({ required: true }),
      disbanded: t.arg({ type: 'Date' }),
    },
    resolve: async (_parent, args, ctx) => {
      logger.info('Starting Musician Mutation');

      const {
        name,
        city,
        province,
        appleLink,
        bandcampLink,
        spotifyLink,
        youtubeLink,
        isGroup,
        disbanded,
      } = trimArgs(args);

      const citySpelling = frenchCityParser(city);

      linksValidator({
        apple: appleLink,
        bandcamp: bandcampLink,
        spotify: spotifyLink,
        youtube: youtubeLink,
      });

      const id = await idCreator(name.trim(), ctx.prisma.musician);

      const musician = await ctx.prisma.musician.create({
        data: {
          id,
          name,
          city: {
            connectOrCreate: {
              where: { name_province: { name: citySpelling!, province } },
              create: { name: citySpelling!, province },
            },
          },
          appleLink,
          bandcampLink,
          spotifyLink,
          youtubeLink,
          isGroup,
          disbanded,
        },
      });
      logger.info(`Added Musician ${name} to the db`);
      return musician;
    },
  });
});
