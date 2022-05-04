import React, { ReactNode } from 'react';

import { combine, conditional } from '@mapledb/shared/style-helpers';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  type: 'music' | 'musician';
  autoFill?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

const CardGridLayout = ({
  children,
  type,
  tag: Tag = 'div',
  autoFill = false,
}: Props) => {
  return (
    <Tag
      className={combine(
        styles.grid,
        styles[type],
        conditional(autoFill, styles.autoFill)
      )}
    >
      {children}
    </Tag>
  );
};

export default CardGridLayout;
