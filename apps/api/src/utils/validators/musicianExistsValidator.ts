import { PrismaClient } from '@prisma/client';

interface Props {
  musicianId: string;
  prisma: PrismaClient;
}

const musicianExistsValidator = async ({ musicianId, prisma }: Props) => {
  const musician = prisma.musician.findUniqueOrThrow({
    where: { id: musicianId },
  });

  return musician;
};

export default musicianExistsValidator;
