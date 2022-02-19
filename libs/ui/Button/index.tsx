/* eslint-disable react/button-has-type */
import React, { ReactNode } from 'react';

import { combine } from 'style-helpers';
import styles from './styles.module.scss';

interface Props {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => any;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = ({
  type,
  onClick = () => {},
  disabled = false,
  children,
  className,
}: Props) => {
  return (
    <button
      type={type}
      onClick={() => onClick()}
      disabled={disabled}
      className={combine(styles.button, className)}
    >
      {children}
    </button>
  );
};

export default Button;
