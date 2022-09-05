import { useEffect, useState } from 'react';

import Spinner from '@mapledb/shared/components/Spinner';
import { Button, ButtonLink } from '@mapledb/shared/components/Button';

import CopySVG from '@assets/svg/copy.svg';
import LaunchSVG from '@assets/svg/launch.svg';
import styles from '@styles/about.module.scss';
import MainLayout from '@layouts/Main';

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
    <MainLayout
      title="MapleDB | Contact"
      description="Contact MapleDB - Canadian Music Database."
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
    </MainLayout>
  );
};

export default Contact;
