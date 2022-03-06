import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import { GetNewReleasesDocument } from '@mooseical/schema/types/web';
import Layout, { DOMAIN_NAME } from '@components/Layout';
import setSSRCache from '@utils/setSSRCache';
import DbContainer from '@components/DbComponents/DbContainer';
import MusicCard from '@components/Cards/MusicCard';
import MusicianCard from '@components/Cards/MusicianCard';
import styles from '@styles/home.module.scss';
import Logo from '@components/Logo';
import GqlContainer from '@components/GqlContainer';
import { useGetNewReleasesQuery } from '@graphql/hooks';

const gqlVariables = { takeMusic: 4, takeMusicians: 4 };

const IndexPage = () => {
  const [{ data, fetching, error }] = useGetNewReleasesQuery({
    variables: gqlVariables,
  });

  return (
    <Layout
      ogpImg={`${DOMAIN_NAME}/OGP.png`}
      ogpImgAlt="Logo of Mooseical: Red Vinyl with a red silhouette of a moose in the middle"
      ogpImgWidth={1200}
      ogpImgHeight={630}
      twitterCard="summary_large_image"
    >
      <GqlContainer
        fetching={fetching}
        error={error}
        errorComponent
        errorStatusCode={500}
      >
        <span className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </span>
        <h1 className={styles.logoTitle}>
          Underground Canadian Music&nbsp;Database
        </h1>
        {data && (
          <>
            <section className={styles.section}>
              <h1>
                <Link href="/music/all?type=SINGLE">
                  <a>New Singles Releases</a>
                </Link>
              </h1>
              <hr />

              <DbContainer type="music" autoFill>
                {data.singleList.map((doc) => (
                  <MusicCard key={doc.id} {...doc} imagePriority />
                ))}
              </DbContainer>
            </section>
            <section className={styles.section}>
              <h1>
                <Link href="/music/all?type=ALBUM">
                  <a>New Album Releases</a>
                </Link>
              </h1>
              <hr />

              <DbContainer type="music" autoFill>
                {data.albumList.map((doc) => (
                  <MusicCard key={doc.id} {...doc} />
                ))}
              </DbContainer>
            </section>

            <section className={styles.section}>
              <h1>
                <Link href="/music/all?type=EP">
                  <a>New EP Releases</a>
                </Link>
              </h1>
              <hr />

              <DbContainer type="music" autoFill>
                {data.epList.map((doc) => (
                  <MusicCard key={doc.id} {...doc} />
                ))}
              </DbContainer>
            </section>

            <section className={styles.section}>
              <h1>
                <Link href="/musicians/all">
                  <a>Newest Musician Entries</a>
                </Link>
              </h1>
              <hr />

              <DbContainer type="musician">
                {data.musicianList.map((musician) => (
                  <MusicianCard key={musician.id} {...musician} />
                ))}
              </DbContainer>
            </section>
          </>
        )}
      </GqlContainer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  setSSRCache(res, 1);

  const newReleases = await gqlClient
    .query(GetNewReleasesDocument, gqlVariables)
    .toPromise();

  return {
    props: {
      urqlState: newReleases.data ? ssrCache.extractData() : null,
    },
  };
};

export default IndexPage;
