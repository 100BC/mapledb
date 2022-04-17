import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { combine, conditional } from '@mapledb/style-helpers';

import Logo from '@components/Logo';

import styles from './styles.module.scss';

const DesktopNav = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [largeHeader, setLargeHeader] = useState(!isHome);

  const listenScrollEvent = () => {
    if (window.scrollY > 200) {
      return setLargeHeader(true);
    }
    return setLargeHeader(false);
  };

  useEffect(() => {
    if (isHome) window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, [isHome]);

  return (
    <header
      className={combine(
        styles.header,
        conditional(largeHeader, styles.boxShadow)
      )}
    >
      <nav
        className={combine(styles.nav, conditional(largeHeader, styles.large))}
      >
        <div className={styles.logoContainer}>
          <Link href="/">
            <a
              className={combine(styles.logo, styles.link)}
              title="MapleDB Home"
            >
              <Logo altLogo />
            </a>
          </Link>
        </div>
        <ul className={styles.middleNav}>
          <li>
            <Link href="/music/all">
              <a title="Music Database" className={styles.link}>
                Music
              </a>
            </Link>
          </li>
          <li>
            <Link href="/musicians/all">
              <a title="Musicians Database" className={styles.link}>
                Musicians
              </a>
            </Link>
          </li>
          <li>
            <Link href="/suggest-musician">
              <a title="Suggest a Musician" className={styles.link}>
                Suggest&nbsp;Musician
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DesktopNav;
