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
      appleLink: faker.unique(faker.internet.url),
      bandcampLink: faker.unique(faker.internet.url),
      soundcloudLink: faker.unique(faker.internet.url),
      spotifyLink: faker.unique(faker.internet.url),
      youtubeLink: faker.unique(faker.internet.url),
      isGroup: Math.random() < 0.5,
      disbanded: Math.random() < 0.2 ? faker.date.past().toISOString() : null,
    },
  });

  const musicPromise: Promise<boolean>[] = [];
  for (let i = 0; i < 10; i++) {
    musicPromise.push(
      createMusic([musicianId], testMusician ? `testMusic-${i}` : null)
    );
  }

  await Promise.all([...musicPromise]);
  return true;
};
