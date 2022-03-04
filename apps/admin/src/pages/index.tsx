import React from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';

import Layout from '@components/Layout';
import styles from '@styles/home.module.scss';
import Environment from '@components/Environment';
import { auth } from '@gcp/client';

const Home = () => {
  return (
    <Layout noIndex>
      <h1>Welcome</h1>
      <hr />
      <h2>What would you like to do?</h2>
      <section className={styles.section}>
        <Environment />
        <div className={styles.row}>
          <Link href="/submit/musician">
            <a>Submit Musician</a>
          </Link>
          <Link href="/submit/music">
            <a>Submit Music</a>
          </Link>
        </div>
        <div className={styles.row}>
          <Link href="/update/musician">
            <a>Edit Musician</a>
          </Link>
          <Link href="/update/music">
            <a>Edit Music</a>
          </Link>
        </div>
        <div className={styles.row}>
          <Link href="/delete/musician">
            <a>Delete Musician</a>
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
    </Layout>
  );
};

export default Home;
