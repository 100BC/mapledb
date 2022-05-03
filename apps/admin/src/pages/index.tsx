import React from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';

import MainLayout from '@layouts/main';
import styles from '@styles/home.module.scss';
import Environment from '@components/Environment';
import { auth } from '@gcp/client';

const Home = () => {
  return (
    <MainLayout noIndex>
      <h1>MapleDB Admin</h1>
      <hr />
      <Environment />
      <section className={styles.section}>
        <h2>Musician</h2>
        <div className={styles.row}>
          <Link href="/submit/musician">
            <a>Submit Musician</a>
          </Link>
          <Link href="/update/musician">
            <a>Edit Musician</a>
          </Link>
          <Link href="/delete/musician">
            <a>Delete Musician</a>
          </Link>
        </div>
        <h2>Music</h2>
        <div className={styles.row}>
          <Link href="/submit/music">
            <a>Submit Music</a>
          </Link>
          <Link href="/update/music">
            <a>Edit Music</a>
          </Link>
          <Link href="/delete/music">
            <a>Delete Music</a>
          </Link>
        </div>

        <button
          type="button"
          className={styles.signOut}
          onClick={() => signOut(auth)}
        >
          Sign Out
        </button>
      </section>
    </MainLayout>
  );
};

export default Home;
