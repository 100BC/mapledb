import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
  id: string | undefined;
  label: string;
  children: ReactNode;
}

const InputWrapper = ({ id, label, children }: Props) => {
  return (
    <div className={styles.field}>
      {children}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default InputWrapper;
