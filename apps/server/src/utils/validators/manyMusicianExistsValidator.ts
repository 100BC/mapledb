import { PrismaClient } from '@prisma/client';
import { logger } from '@server';

interface Props {
  musicianIds: string[];
  prisma: PrismaClient;
}

const errorMessage = "One or more Musician doesn't Exist in the DB";

const manyMusiciansExistsValidator = async ({ musicianIds, prisma }: Props) => {
  const fetchMusicians = musicianIds.map(async (id: string) => {
    const data = prisma.musician
      .findUnique({
        where: { id },
        rejectOnNotFound: true,
      })
      .catch(() => {
        logger.error(errorMessage);
        throw new Error(errorMessage);
      });
    return data;
  });

  const musiciansData = await Promise.all(fetchMusicians);

  return musiciansData;
};

export default manyMusiciansExistsValidator;
