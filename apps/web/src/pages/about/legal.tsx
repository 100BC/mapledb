import React from 'react';
import Link from 'next/link';

import styles from '@styles/about.module.scss';
import Layout from '@components/Layout';

const Legal = () => {
  return (
    <Layout
      title="Legal | Mooseical"
      description="Legal Information of Mooseical - Canadian Music Database."
      canonicalUrlPath="/about/legal"
      className={styles.about}
    >
      <h1>Legal</h1>
      <hr />
      <section className={styles.section}>
        <p>
          The cover art that is displayed on Mooseical is used under the Fair
          Dealing exception of the Canadian Copyright Act. The images are of low
          quality, compressed and are used solely to promote the music that they
          display. Clicking on the cover art will redirect the user to a page
          that contains at minimum one external link where the user can stream
          or buy said musical work, as such we believe they are used fairly. Any
          page that contains missing, broken, or mismatched links is not
          intentional and will be rectified as soon as possible once made aware.
        </p>
        <br />
        <p>
          If you are or represent an artist featured on Mooseical and would like
          the music cover art, or the database entry removed from the site,{' '}
          <Link href="/about/contact">
            <a>Contact Me</a>
          </Link>
          .
        </p>
      </section>
      <time className={styles.lastUpdated}>Last Updated: 2021-12-04</time>
    </Layout>
  );
};

export default Legal;
