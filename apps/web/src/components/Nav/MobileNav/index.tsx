import React from 'react';
import Link from 'next/link';

import HomeSvg from '@assets/svg/home.svg';
import VinylSvg from '@assets/svg/vinyl.svg';
import MicSvg from '@assets/svg/mic.svg';
import SuggestSvg from '@assets/svg/suggest.svg';
import styles from './styles.module.scss';

const MobileNav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a title="Mooseical Home" aria-label="Mooseical Home">
          <HomeSvg />
          Home
        </a>
      </Link>
      <Link href="/music/all">
        <a title="Music Database" aria-label="Music Database">
          <VinylSvg />
          Music
        </a>
      </Link>
      <Link href="/musicians/all">
        <a title="Musicians Database" aria-label="Musicians Database">
          <MicSvg />
          Musicians
        </a>
      </Link>
      <Link href="/suggest-musician">
        <a title="Suggest a Musician" aria-label="Suggest a Musician">
          <SuggestSvg />
          Suggest
        </a>
      </Link>
    </nav>
  );
};

export default MobileNav;
