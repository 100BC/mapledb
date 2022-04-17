import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';

import InputWrapper from '../InputWrapper';

import styles from './styles.module.scss';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
}

export const Select = forwardRef(
  (
    { label, id, name, onChange, onBlur, children }: Props,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <InputWrapper id={id} label={label}>
        <select
          id={id}
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue=""
          className={styles.select}
        >
          <option hidden value="" disabled>
            Select
          </option>
          {children}
        </select>
      </InputWrapper>
    );
  }
);
