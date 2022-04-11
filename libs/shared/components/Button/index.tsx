import React, { ReactNode } from 'react';
import Link from 'next/link';

import { combine } from '@mapledb/style-helpers';
import styles from './styles.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => any;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Button = ({
  type,
  onClick,
  disabled = false,
  children,
  className,
  style,
}: ButtonProps) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combine(styles.button, className)}
      style={style}
    >
      {children}
    </button>
  );
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

export const ButtonLink = ({
  href,
  className,
  children,
  title,
  style,
}: ButtonLinkProps) => {
  return (
    <Link href={href}>
      <a
        title={title}
        className={combine(styles.button, className)}
        style={style}
      >
        {children}
      </a>
    </Link>
  );
};

export default Button;
