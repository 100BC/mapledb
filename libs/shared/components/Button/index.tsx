import React, { ReactNode } from 'react';
import Link from 'next/link';

import { combine } from '@mooseical/style-helpers';
import styles from './styles.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => any;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export const Button = ({
  type,
  onClick,
  disabled = false,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combine(styles.button, className)}
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
}

export const ButtonLink = ({
  href,
  className,
  children,
  title,
}: ButtonLinkProps) => {
  return (
    <Link href={href}>
      <a title={title} className={combine(styles.button, className)}>
        {children}
      </a>
    </Link>
  );
};

export default Button;
