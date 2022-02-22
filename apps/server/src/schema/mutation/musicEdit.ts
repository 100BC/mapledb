import builder from '@schema/builder';
import linksValidator from '@utils/validators/linksValidator';
import musicExistsValidator from '@utils/validators/musicExistsValidator';
import manyMusiciansExistsValidator from '@utils/validators/manyMusicianExistsValidator';
import { logger } from '@server';
import uploadCover from '@utils/imageUtils/uploadCover';
import { cloudinaryDelete } from '@utils/imageUtils/cloudinaryFunctions';
import { MusicObject } from '@schema/types/Music';
import { GenreEnum, MusicTypeEnum } from '@schema/types/Enums';

export const musicEdit = builder.mutationField('musicEdit', (t) => {
  return t.field({
    type: MusicObject,
    description: 'Updates an existing musical work in the db',
    authScopes: {
      authMutation: true,
    },
    args: {
      id: t.arg.string({ required: true }),
      release: t.arg({ type: 'Date' }),
      subgenre: t.arg.string(),
      genre: t.arg({ type: GenreEnum }),
      instrumental: t.arg.boolean(),
      musicType: t.arg({ type: MusicTypeEnum }),
      cover: t.arg({ type: 'Upload' }),
      appleLink: t.arg.string(),
      bandcampLink: t.arg.string(),
      soundcloudLink: t.arg.string(),
      spotifyLink: t.arg.string(),
      youtubeLink: t.arg.string(),
      nonCanadians: t.arg.stringList({
        required: { list: false, items: true },
      }),
      copyright: t.arg.string(),
    },
    resolve: async (_parent, args, ctx) => {
      logger.info('Starting Update Music Mutation');
      Object.values(args).forEach((argument) => {
        if (typeof argument === 'string') return argument.trim();
        return argument;
      });

      const {
        id,
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
      } = args;

      const musicInfo = await musicExistsValidator({
        id,
        prisma: ctx.prisma,
      });

      const musicians = await ctx.prisma.musicianMusic.findMany({
        where: { musicId: musicInfo.id },
      });

      const musiciansData = await manyMusiciansExistsValidator({
        musicianIds: musicians.map((val) => val.musicianId),
        prisma: ctx.prisma,
      });

      linksValidator({
        apple: appleLink,
        bandcamp: bandcampLink,
        soundcloud: soundcloudLink,
        spotify: spotifyLink,
        youtube: youtubeLink,
        isUpdate: true,
      });

      let hasCover: boolean | undefined;
      if (cover) {
        hasCover = await uploadCover(cover, musiciansData, id);
      } else if (cover === null) {
        if (musicInfo.hasCover) await cloudinaryDelete(id);
        hasCover = false;
      }

      let newGenre = genre;
      if (subgenre && !newGenre) {
        const genreData = await ctx.prisma.subgenre
          .findUnique({
            where: { id: musicInfo.subgenreId },
            rejectOnNotFound: true,
          })
          .catch((err) => {
            logger.error(err);
            throw new Error(err);
          });
        newGenre = genreData.genre;
      }

      const music = await ctx.prisma.music.update({
        where: { id },
        data: {
          release: release || undefined,
          ...(subgenre && {
            subgenre: {
              connectOrCreate: {
                where: { name: subgenre.toLowerCase() },
                create: { name: subgenre.toLowerCase(), genre: newGenre! },
              },
            },
          }),
          hasCover,
          instrumental: instrumental ?? undefined,
          appleLink: appleLink === null || appleLink ? appleLink : undefined,
          bandcampLink:
            bandcampLink === null || bandcampLink ? bandcampLink : undefined,
          soundcloudLink:
            soundcloudLink === null || soundcloudLink
              ? soundcloudLink
              : undefined,
          spotifyLink:
            spotifyLink === null || spotifyLink ? spotifyLink : undefined,
          youtubeLink:
            youtubeLink === null || youtubeLink ? youtubeLink : undefined,
          musicType: musicType || undefined,
          nonCanadians: nonCanadians || undefined,
          copyright: copyright === null || copyright ? copyright : undefined,
        },
      });

      logger.info(`Updated Music: ${musicInfo?.name}`);

      return music;
    },
  });
});