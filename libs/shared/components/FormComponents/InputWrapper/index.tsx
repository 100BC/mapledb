import React, { ReactNode } from 'react';

import { combine, conditional } from '../../../style-helpers';

import styles from './styles.module.scss';

interface Props {
  id: string | undefined;
  label: string;
  children: ReactNode;
  disabled?: boolean;
}

const InputWrapper = ({ id, label, children, disabled = false }: Props) => {
  return (
    <div
      className={combine(styles.field, conditional(disabled, styles.disabled))}
    >
      {children}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default InputWrapper;
