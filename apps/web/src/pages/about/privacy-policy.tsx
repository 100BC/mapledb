import React from 'react';

import styles from '@styles/about.module.scss';
import Link from 'next/link';
import Layout from '@components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout
      title="MapleDB | Privacy Policy"
      description="Privacy Policy of MapleDB - Canadian Music Database."
      canonicalUrlPath="/about/privacy-policy"
      className={styles.about}
    >
      <h1>Privacy Policy</h1>
      <hr />
      <section className={styles.section}>
        <p>
          MapleDB uses Google reCAPTCHA to prevent spam when suggesting a
          musician via the Suggest Musician form. As such your use of reCAPTCHA
          is subject to{' '}
          <a
            rel="noopener noreferrer nofollow external"
            href="https://policies.google.com/privacy"
          >
            Google Privacy Policy and Terms of Use
          </a>
          . The Google reCAPTCHA collects hardware and software information,
          such as device and application data, and sends the data to Google for
          analysis. The information collected in connection with your use of the
          service will be used for improving reCAPTCHA and for general security
          purposes. If you wish to avoid the reCAPTCHA, you can also{' '}
          <Link href="/about/contact">
            <a>Contact Me</a>
          </Link>
        </p>
      </section>
      <time className={styles.lastUpdated}>Last Updated: 2022-03-29</time>
    </Layout>
  );
};

export default PrivacyPolicy;
