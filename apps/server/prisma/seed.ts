import prisma from './seed/prismaClient';
import { createCities } from './seed/city';
import { createMusician } from './seed/musician';
import createSubgenres from './seed/subgenre';
import { createCollab } from './seed/collab';

const main = async () => {
  if (process.env.NODE_ENV !== 'development')
    throw new Error('Must be in dev mode');

  await Promise.all([createCities(), createSubgenres()]);
  console.log('Created Cities');
  console.log('Created Subgenres');

  console.log('Creating Musicians');
  const musicianPromise: Promise<boolean>[] = [];
  for (let i = 0; i < 100; i++) {
    musicianPromise.push(createMusician());
  }
  await Promise.all(musicianPromise);
  console.log('Created 100 Musicians 1000 musical works');

  console.log('Creating Collaborations');
  const collabPromise: Promise<boolean>[] = [];
  for (let i = 0; i < 25; i++) {
    collabPromise.push(createCollab());
  }
  await Promise.all(collabPromise);
  console.log('Created 25 collaborations');

  await createMusician('test');
  console.log('Create test Musician');
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Done');
    process.exit();
  });
