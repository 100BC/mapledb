import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <hr />
    <nav>
      <Link href="/about">
        <a title="About">About</a>
      </Link>
      <Link href="/about/legal">
        <a title="Legal">Legal</a>
      </Link>
      <Link href="/about/privacy-policy">
        <a title="Privacy">Privacy Policy</a>
      </Link>
      <Link href="/about/contact">
        <a title="Contact">Contact</a>
      </Link>
    </nav>
  </footer>
);

export default Footer;
