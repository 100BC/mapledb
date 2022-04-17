import { cloudinary, logger } from '@server';
import { UploadApiErrorResponse } from 'cloudinary';

import { IS_DEV } from '@utils/constants';

import { deleteLocalImage } from './imageFunctions';

export const cloudinaryUpload = async (
  fileName: string,
  id: string,
  musicians: string[]
) => {
  const handleError = (err: UploadApiErrorResponse) => {
    deleteLocalImage(fileName);
    logger.error(err);
    throw new Error(err.message);
  };

  await cloudinary.uploader.upload(
    fileName,
    {
      public_id: id,
      tags: musicians,
      upload_preset: IS_DEV ? 'mooseical_development' : 'mooseical_production',
    },
    (error, _result) => {
      if (error) handleError(error);
      else logger.info('Uploaded Image');
    }
  );
};

export const cloudinaryDelete = async (id: string) => {
  await cloudinary.uploader.destroy(
    `${IS_DEV ? 'development' : 'music'}/${id}`,
    (error, _result) => {
      if (error) {
        logger.error(error);
      }
      logger.info(`Deleted ${id} image`);
    }
  );
};
