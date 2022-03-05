import prisma from './generators/prismaClient';
import { createCities } from './generators/city';
import { createMusician } from './generators/musician';
import createSubgenres from './generators/subgenre';
import { createCollab } from './generators/collab';

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

  await createMusician('Test');
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
