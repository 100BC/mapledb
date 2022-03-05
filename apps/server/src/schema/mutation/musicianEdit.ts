import builder from '@schema/builder';
import linksValidator from '@utils/validators/linksValidator';
import frenchCityParser from '@utils/helpers/frenchCityParser';
import { logger } from '@server';
import musicianExistsValidator from '@utils/validators/musicianExistsValidator';
import { MusicianObject } from '@schema/types/MusicianRef';
import { ProvinceEnum } from '@schema/types/Enums';
import parseNullableField from '@utils/helpers/parseNullableField';

export const musicianEdit = builder.mutationField('musicianEdit', (t) => {
  return t.field({
    type: MusicianObject,
    description: 'Edit a Musician',
    authScopes: {
      authMutation: true,
    },
    args: {
      id: t.arg.string({ required: true }),
      city: t.arg.string(),
      province: t.arg({ type: ProvinceEnum }),
      appleLink: t.arg.string(),
      bandcampLink: t.arg.string(),
      soundcloudLink: t.arg.string(),
      spotifyLink: t.arg.string(),
      youtubeLink: t.arg.string(),
      isGroup: t.arg.boolean(),
      disbanded: t.arg({ type: 'Date' }),
    },
    resolve: async (_parent, args, ctx) => {
      logger.info('Starting Musician Edit Mutation');
      Object.values(args).forEach((argument) => {
        if (typeof argument === 'string') return argument.trim();
        return argument;
      });

      const {
        id,
        city,
        province,
        appleLink,
        bandcampLink,
        soundcloudLink,
        spotifyLink,
        youtubeLink,
        isGroup,
        disbanded,
      } = args;

      const musicianInfo = await musicianExistsValidator({
        musicianId: id,
        prisma: ctx.prisma,
      });
      const citySpelling = frenchCityParser(city);

      linksValidator({
        apple: appleLink,
        bandcamp: bandcampLink,
        soundcloud: soundcloudLink,
        spotify: spotifyLink,
        youtube: youtubeLink,
        isUpdate: true,
      });

      let newProvince = province;
      if (city && !newProvince) {
        const cityData = await ctx.prisma.city
          .findUnique({
            where: { id: musicianInfo.cityId },
            rejectOnNotFound: true,
          })
          .catch((err) => {
            logger.error(err);
            throw new Error(err);
          });
        newProvince = cityData.province;
      }

      const musician = await ctx.prisma.musician.update({
        where: { id },
        data: {
          ...(citySpelling && {
            city: {
              connectOrCreate: {
                where: {
                  name_province: {
                    name: citySpelling,
                    province: newProvince!,
                  },
                },
                create: { name: citySpelling, province: newProvince! },
              },
            },
          }),
          appleLink: parseNullableField(appleLink),
          bandcampLink: parseNullableField(bandcampLink),
          soundcloudLink: parseNullableField(soundcloudLink),
          spotifyLink: parseNullableField(spotifyLink),
          youtubeLink: parseNullableField(youtubeLink),
          isGroup: isGroup || undefined,
          disbanded: parseNullableField(disbanded),
        },
      });

      logger.info(`Updated Musician ${id}`);
      return musician;
    },
  });
});
