import { FileUpload } from 'graphql-upload';
import { logger } from '@server';

import { Musician } from '@prisma/client';

import { createImageLocally, deleteLocalImage } from './imageFunctions';
import { cloudinaryUpload } from './cloudinaryFunctions';

const uploadCover = async (
  image: Promise<FileUpload>,
  musicians: Musician[],
  id: string
) => {
  const { createReadStream, mimetype, filename } = await image;
  logger.info('Reading Image');

  if (mimetype.split('/')[0] !== 'image') {
    logger.error('Image was not provided');
    throw new Error('Image was not provided');
  }
  const fileName = `${__dirname}/${filename}`;

  await createImageLocally(createReadStream(), fileName);

  await cloudinaryUpload(
    fileName,
    id,
    musicians.map((i) => i.name)
  );
  deleteLocalImage(fileName);

  return true;
};

export default uploadCover;
