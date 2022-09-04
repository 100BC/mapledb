import { PrismaClient } from '@prisma/client';

interface Props {
  musicianIds: string[];
  prisma: PrismaClient;
}

const manyMusiciansExistsValidator = async ({ musicianIds, prisma }: Props) => {
  const fetchMusicians = musicianIds.map(async (id: string) => {
    const data = prisma.musician.findUniqueOrThrow({
      where: { id },
    });
    return data;
  });

  const musiciansData = await Promise.all(fetchMusicians);

  return musiciansData;
};

export default manyMusiciansExistsValidator;
