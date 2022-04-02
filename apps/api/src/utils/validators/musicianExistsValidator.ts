import { PrismaClient } from '@prisma/client';
import { logger } from '@server';

interface Props {
  musicianId: string;
  prisma: PrismaClient;
}

const errorMessage = "One or more Musician doesn't Exist in the DB";

const musicianExistsValidator = async ({ musicianId, prisma }: Props) => {
  const musician = prisma.musician
    .findUnique({
      where: { id: musicianId },
      rejectOnNotFound: true,
    })
    .catch(() => {
      logger.error(errorMessage);
      throw new Error(errorMessage);
    });

  return musician;
};

export default musicianExistsValidator;
