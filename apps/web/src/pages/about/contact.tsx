import React, { useEffect, useState } from 'react';

import Spinner from '@mooseical/ui/Spinner';
import CopySVG from '@mooseical/assets/svg/copy.svg';
import LaunchSVG from '@mooseical/assets/svg/launch.svg';
import styles from '@styles/about.module.scss';
import Layout from '@components/Layout';
import { Button, ButtonLink } from '@mooseical/ui/Button';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setCopiedEmail(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [copiedEmail]);

  const copyEmail = () => {
    navigator.clipboard.writeText(email!).then(() => {
      setCopiedEmail(true);
    });
  };

  // GET Request email to stop bots
  // Not too sure if the key will do anything
  // But prevents easy access
  const getEmail = async () => {
    setLoading(true);
    const response = await fetch('/api/email', {
      headers: {
        key: 'allow',
        'Content-Type': 'text/plain',
      },
    }).then((data) => data.json());

    setEmail(response.email);
    setLoading(false);
  };

  return (
    <Layout
      title="Contact Me | Mooseical"
      description="Contact Mooseical - Canadian Music Database."
      canonicalUrlPath="/about/contact"
      className={styles.about}
    >
      <h1>Contact</h1>
      <hr />
      <section className={styles.section}>
        <div className={styles.email}>
          <b>Email:</b>&nbsp;
          {loading && (
            <Spinner className={styles.spinner} size={16} margin="0 1rem" />
          )}
          {!email && !loading && (
            <button type="button" onClick={() => getEmail()}>
              Click to reveal email
            </button>
          )}
          {email && (
            <>
              <>{email}</>
              <div className={styles.buttonRow}>
                {copiedEmail ? (
                  'Copied Email To Clipboard'
                ) : (
                  <>
                    <Button type="button" onClick={() => copyEmail()}>
                      Copy Email
                      <CopySVG />
                    </Button>
                    <ButtonLink href={`mailto:${email}`}>
                      Open Email
                      <LaunchSVG />
                    </ButtonLink>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
