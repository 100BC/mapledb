import React from 'react';

import LogoSvg from '@mooseical/assets/svg/logo.svg';
import LogoAltSvg from '@mooseical/assets/svg/logo-white.svg';
import { combine } from '@mooseical/style-helpers';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  altLogo?: boolean;
}

const Logo = ({ className, altLogo = false }: Props) => {
  return (
    <div className={combine(styles.logo, className)}>
      {altLogo ? <LogoAltSvg /> : <LogoSvg />}
      Mooseical
    </div>
  );
};

export default Logo;
