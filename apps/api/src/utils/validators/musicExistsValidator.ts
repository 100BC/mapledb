import { logger } from '@server';

import { PrismaClient } from '@prisma/client';

interface Props {
  id: string;
  prisma: PrismaClient;
}

const errorMessage = 'Music does not exist in db';

const musicExistsValidator = async ({ id, prisma }: Props) => {
  const musicInfo = await prisma.music
    .findUnique({ where: { id }, rejectOnNotFound: true })
    .catch(() => {
      logger.error(errorMessage);
      throw new Error(errorMessage);
    });

  return musicInfo;
};

export default musicExistsValidator;
