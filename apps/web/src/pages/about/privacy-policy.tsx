import React from 'react';

import styles from '@styles/about.module.scss';
import Link from 'next/link';
import Layout from '@components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout
      title="Privacy Policy | Mooseical"
      description="Privacy Policy of Mooseical - Canadian Music Database."
      canonicalUrlPath="/about/privacy-policy"
      className={styles.about}
    >
      <h1>Privacy Policy</h1>
      <hr />
      <section className={styles.section}>
        <p>
          Mooseical currently only tracks website performance (Largest
          Contentful Paint, First Input Delay, etc.) and uses that information
          to make necessary improvements. The data collected has no identifying
          information pertaining to any user and is only stored for 1 day.
        </p>
        <br />
        <p>
          Mooseical uses Google reCAPTCHA to prevent spam when suggesting a
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
      <time className={styles.lastUpdated}>Last Updated: 2021-12-04</time>
    </Layout>
  );
};

export default PrivacyPolicy;
