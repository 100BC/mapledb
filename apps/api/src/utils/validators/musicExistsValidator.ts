import { PrismaClient } from '@prisma/client';

interface Props {
  id: string;
  prisma: PrismaClient;
}

const musicExistsValidator = async ({ id, prisma }: Props) => {
  const musicInfo = await prisma.music.findUniqueOrThrow({
    where: { id },
  });

  return musicInfo;
};

export default musicExistsValidator;
