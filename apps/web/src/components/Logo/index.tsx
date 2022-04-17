import React from 'react';

import { combine } from '@mapledb/style-helpers';

import LogoSvg from '@assets/svg/logo.svg';
import LogoAltSvg from '@assets/svg/logo-white.svg';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  altLogo?: boolean;
}

const Logo = ({ className, altLogo = false }: Props) => {
  return (
    <div className={combine(styles.logo, className)}>
      {altLogo ? <LogoAltSvg /> : <LogoSvg />}
      MapleDB
    </div>
  );
};

export default Logo;
