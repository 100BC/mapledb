import React from 'react';

import LogoSvg from '@assets/svg/logo.svg';
import { combine } from '@utils/styleHelpers';
import styles from './styles.module.scss';

interface Props {
  size?: React.CSSProperties['width'];
  margin?: React.CSSProperties['margin'];
  className?: string;
}

const Spinner = ({ className, margin = '50px auto', size = 60 }: Props) => {
  return (
    <LogoSvg
      className={combine(styles.spinner, className)}
      style={{ margin, width: size, height: size }}
    />
  );
};

export default Spinner;