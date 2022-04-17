import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import InputWrapper from '../InputWrapper';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef(
  (
    {
      label,
      id,
      name,
      onChange,
      onBlur,
      type = 'text',
      disabled = false,
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputWrapper id={id} label={label} disabled={disabled}>
        <input
          ref={ref}
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.input}
          placeholder=""
          type={type}
          disabled={disabled}
        />
      </InputWrapper>
    );
  }
);
