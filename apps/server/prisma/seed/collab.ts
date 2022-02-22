import { createMusic } from './music';
import prisma from './prismaClient';

export const createCollab = async () => {
  const musicians = await prisma.musician.findMany({
    take: Math.floor(Math.random() * 3) + 2,
    select: { id: true },
  });

  await createMusic(musicians.map((obj) => obj.id));
  return true;
};
