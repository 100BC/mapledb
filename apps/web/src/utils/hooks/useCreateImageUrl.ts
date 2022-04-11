import { useCallback, useMemo } from 'react';
import { ImageLoader } from 'next/image';

interface Props {
  musicId: string;
  hasCover: boolean;
  maxWidth: number;
}

const useCreateImageUrl = ({ musicId, hasCover, maxWidth }: Props) => {
  const baseCloudinaryUrl = 'https://res.cloudinary.com/mapledb/image/upload';
  const urlPrepend =
    process.env.NEXT_PUBLIC_NODE_ENV === 'development'
      ? 'development'
      : 'music';

  const placeholder: 'blur' = 'blur';
  const blurryImageUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0snH4DwADJQG3miJkEQAAAABJRU5ErkJggg==';

  const loader: ImageLoader = useCallback(
    ({ src, quality }) => {
      return `${baseCloudinaryUrl}/c_limit,q_${
        quality || 'auto'
      },w_${maxWidth},f_auto/${urlPrepend}/${src}`;
    },
    [urlPrepend, maxWidth]
  );

  const imageUrl = useMemo(() => {
    if (!hasCover) return undefined;
    return musicId;
  }, [musicId, hasCover]);

  const fullImageUrl = useMemo(() => {
    if (!hasCover) return undefined;
    return `${baseCloudinaryUrl}/c_limit,q_auto,w_400,f_auto/${urlPrepend}/${musicId}`;
  }, [musicId, urlPrepend, hasCover]);

  return {
    loader: hasCover ? loader : undefined,
    imageUrl,
    fullImageUrl,
    placeholder,
    blurryImageUrl,
  };
};

export default useCreateImageUrl;
