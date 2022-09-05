import React from 'react';

import styles from '@styles/about.module.scss';
import MainLayout from '@layouts/Main';

const PrivacyPolicy = () => {
  return (
    <MainLayout
      title="MapleDB | Privacy Policy"
      description="Privacy Policy of MapleDB - Canadian Music Database."
      canonicalUrlPath="/about/privacy-policy"
      className={styles.about}
    >
      <h1>Privacy Policy</h1>
      <hr />
      <section className={styles.lastUpdated}>
        <p>MapleDB currently does not track any users.</p>
      </section>
      <time className={styles.lastUpdated}>Last Updated: 2022-09-04</time>
    </MainLayout>
  );
};

export default PrivacyPolicy;
