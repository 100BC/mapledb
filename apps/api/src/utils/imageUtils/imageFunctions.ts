import { createWriteStream, ReadStream, unlink } from 'fs';

import { logger } from '@server';

export const createImageLocally = async (
  stream: ReadStream,
  fileName: string
) => {
  await new Promise<void>((resolve, reject) => {
    stream
      .pipe(createWriteStream(fileName))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        logger.error(err);
        reject(err);
      });
  });
};

export const deleteLocalImage = (fileDir: string) => {
  unlink(fileDir, (error) => {
    if (error) {
      logger.error(error.message);
    }
  });
};

// Used Originally, now using built in cloudinary compression
// export const optimizeImage = async (
//   fileName: string,
//   newFileName: string,
//   mimetype: string
// ) => {
//   logger.info('Resizing Image');
//   const isWebp = mimetype === 'image/webp';
//   const tooBig = statSync(fileName).size > 50000; // 50kb
//   const shouldResize = !isWebp || tooBig;

//   const handleError = (err: any) => {
//     deleteLocalImage(fileName);
//     logger.error(err);
//     throw new Error(err.message);
//   };

//   if (shouldResize) {
//     await sharp(fileName)
//       .resize(400, 400, { withoutEnlargement: true, fit: 'contain' })
//       .webp({ quality: 90 })
//       .toFile(newFileName)
//       .catch((err) => handleError(err));
//   } else {
//     await sharp(fileName)
//       .resize(400, 400, { withoutEnlargement: true, fit: 'contain' })
//       .toFile(newFileName)
//       .catch((err) => handleError(err));
//   }
// };
