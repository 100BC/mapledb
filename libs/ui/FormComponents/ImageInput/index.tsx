import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  image: string | null;
  imageAlt: string;
}

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
          src={image || '/grey.png'}
          alt={imageAlt}
          unoptimized
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
