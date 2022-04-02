import faker from 'faker';

import { createMusic } from './music';
import { pickRandomCity } from './city';
import prisma from './prismaClient';

export const createMusician = async (testMusician: string | null = null) => {
  const musicianId =
    testMusician?.toLowerCase() || faker.unique(faker.lorem.slug);
  const musicianName = testMusician || faker.name.findName();
  const cityObj = pickRandomCity();

  await prisma.musician.create({
    data: {
      id: musicianId,
      name: musicianName,
      city: {
        connect: {
          name_province: { name: cityObj.name, province: cityObj.province },
        },
      },
      appleLink: `https://music.apple.com/us/album/${musicianId}`,
      bandcampLink: `https://${musicianId}.bandcamp.com/album/${musicianId}`,
      spotifyLink: `https://open.spotify.com/album/${musicianId}`,
      youtubeLink: `https://youtu.be/${musicianId}`,
      isGroup: Math.random() < 0.5,
      disbanded: Math.random() < 0.2 ? faker.date.past().toISOString() : null,
    },
  });

  const musicPromise: Promise<boolean>[] = [];
  for (let i = 0; i < 10; i++) {
    musicPromise.push(
      createMusic([musicianId], testMusician ? `music-${i}` : null)
    );
  }

  await Promise.all([...musicPromise]);
  return true;
};
