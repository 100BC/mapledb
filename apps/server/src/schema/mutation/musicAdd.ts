import { Musician } from '@prisma/client';

import builder from '@schema/builder';
import idCreator from '@utils/helpers/idCreator';
import linksValidator from '@utils/validators/linksValidator';
import manyMusiciansExistsValidator from '@utils/validators/manyMusicianExistsValidator';
import { logger } from '@server';
import uploadCover from '@utils/imageUtils/uploadCover';
import { GenreEnum, MusicTypeEnum } from '@schema/types/Enums';
import { MusicObject } from '@schema/types/Music';
import trimArgs from '@utils/helpers/trimArgs';

export const addMusic = builder.mutationField('musicAdd', (t) => {
  return t.field({
    type: MusicObject,
    description: 'Add a musical work; the musician must already exist in DB',
    authScopes: {
      authMutation: true,
    },
    args: {
      name: t.arg.string({ required: true }),
      musicianIds: t.arg.stringList({ required: true }),
      release: t.arg({ type: 'Date', required: true }),
      subgenre: t.arg.string({ required: true }),
      genre: t.arg({ type: GenreEnum, required: true }),
      instrumental: t.arg.boolean({ required: true }),
      musicType: t.arg({ type: MusicTypeEnum, required: true }),
      cover: t.arg({ type: 'Upload' }),
      appleLink: t.arg.string(),
      bandcampLink: t.arg.string(),
      soundcloudLink: t.arg.string(),
      spotifyLink: t.arg.string(),
      youtubeLink: t.arg.string(),
      nonCanadians: t.arg.stringList({
        required: { list: true, items: true },
      }),
      copyright: t.arg.string(),
    },
    resolve: async (_parent, args, ctx) => {
      logger.info('Starting Music Mutation');

      const {
        name,
        musicianIds,
        release,
        subgenre,
        genre,
        instrumental,
        cover,
        appleLink,
        bandcampLink,
        soundcloudLink,
        spotifyLink,
        nonCanadians,
        youtubeLink,
        musicType,
        copyright,
      } = trimArgs(args);

      const musiciansData = await manyMusiciansExistsValidator({
        musicianIds,
        prisma: ctx.prisma,
      });

      linksValidator({
        apple: appleLink,
        bandcamp: bandcampLink,
        soundcloud: soundcloudLink,
        spotify: spotifyLink,
        youtube: youtubeLink,
      });
      const id = await idCreator(name, ctx.prisma.music);

      let hasCover = false;
      if (cover) {
        hasCover = await uploadCover(cover, musiciansData as Musician[], id);
      }

      const music = await ctx.prisma.music.create({
        data: {
          id,
          name,
          release,
          subgenre: {
            connectOrCreate: {
              where: { name: subgenre.toLowerCase() },
              create: { name: subgenre.toLowerCase(), genre },
            },
          },
          copyright,
          hasCover,
          instrumental,
          appleLink,
          bandcampLink,
          soundcloudLink,
          spotifyLink,
          youtubeLink,
          nonCanadians,
          musicType,
          musicians: {
            create: musicianIds.map((musicianId: string) => {
              return { musicianId };
            }),
          },
        },
      });

      logger.info(`Added Music: ${name} to the database`);

      return music;
    },
  });
});
