import faker from 'faker';

import createNonCanadians from './createNonCanadians';
import prisma from './prismaClient';
import { pickRandomGenre } from './subgenre';

const musicType = ['ALBUM', 'EP', 'SINGLE', 'LIVE', 'OTHER'];

export const createMusic = async (
  musicianIds: string[],
  testMusic: string | null = null
) => {
  const musicId = testMusic || faker.unique(faker.lorem.slug);
  const releaseDate = faker.date.past().toISOString();
  const pickMusicType = musicType[
    Math.floor(Math.random() * musicType.length)
  ] as any;

  await prisma.music.create({
    data: {
      id: musicId,
      name:
        testMusic || Math.random() < 0.5
          ? faker.name.jobDescriptor()
          : faker.name.jobTitle(),
      release: releaseDate,
      subgenre: {
        connect: { name: pickRandomGenre().name },
      },
      hasCover: !!testMusic,
      musicType: pickMusicType,
      instrumental: Math.random() < 0.1,
      appleLink: faker.unique(faker.internet.url),
      bandcampLink: faker.unique(faker.internet.url),
      soundcloudLink: faker.unique(faker.internet.url),
      spotifyLink: faker.unique(faker.internet.url),
      youtubeLink: faker.unique(faker.internet.url),
      nonCanadians: Math.random() < 0.1 ? createNonCanadians() : [],
      copyright: faker.company.companyName(),
      musicians: {
        create: musicianIds.map((musicianId) => {
          return { musicianId };
        }),
      },
    },
  });

  return true;
};
