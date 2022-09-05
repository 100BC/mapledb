import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  image: string | null;
  imageAlt: string;
}

const placeholderImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsKC//DwAFHAJfGcMDnAAAAABJRU5ErkJggg==';

export const ImageInput = forwardRef(
  (
    { name, id, onChange, onBlur, label, image, imageAlt }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label htmlFor={id} className={styles.imageContainer}>
        {label}
        <Image
          layout="intrinsic"
          width={200}
          height={200}
          src={image || placeholderImg}
          placeholder="blur"
          blurDataURL={placeholderImg}
          alt={imageAlt}
          objectFit="cover"
        />
        <input
          id={id}
          name={name}
          ref={ref}
          type="file"
          accept="image/*"
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
    );
  }
);
