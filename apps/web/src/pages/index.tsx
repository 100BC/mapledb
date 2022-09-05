import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { GetNewReleasesDocument } from '@mapledb/schema/types/web';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import MainLayout, { DOMAIN_NAME } from '@layouts/Main';
import setSSRCache from '@utils/setSSRCache';
import CardGridLayout from '@layouts/CardGrid';
import MusicCard from '@components/Cards/MusicCard';
import MusicianCard from '@components/Cards/MusicianCard';
import styles from '@styles/home.module.scss';
import Logo from '@components/Logo';
import UrqlStateLayout from '@layouts/UrqlState';
import { useGetNewReleasesQuery } from '@graphql/hooks';

const gqlVariables = { takeMusic: 4, takeMusicians: 4 };

const IndexPage = () => {
  const [{ data, fetching, error }] = useGetNewReleasesQuery({
    variables: gqlVariables,
  });

  return (
    <MainLayout
      ogpImg={`${DOMAIN_NAME}/OGP.png`}
      ogpImgAlt="Logo of MapleDB: Red Vinyl with a red silhouette of a moose in the middle"
      ogpImgWidth={1200}
      ogpImgHeight={630}
      twitterCard="summary_large_image"
    >
      <UrqlStateLayout
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

              <CardGridLayout type="music" autoFill>
                {data.singleList.map((doc) => (
                  <MusicCard key={doc.id} {...doc} imagePriority />
                ))}
              </CardGridLayout>
            </section>
            <section className={styles.section}>
              <h1>
                <Link href="/music/all?type=ALBUM">
                  <a>New Album Releases</a>
                </Link>
              </h1>
              <hr />

              <CardGridLayout type="music" autoFill>
                {data.albumList.map((doc) => (
                  <MusicCard key={doc.id} {...doc} />
                ))}
              </CardGridLayout>
            </section>

            <section className={styles.section}>
              <h1>
                <Link href="/music/all?type=EP">
                  <a>New EP Releases</a>
                </Link>
              </h1>
              <hr />

              <CardGridLayout type="music" autoFill>
                {data.epList.map((doc) => (
                  <MusicCard key={doc.id} {...doc} />
                ))}
              </CardGridLayout>
            </section>

            <section className={styles.section}>
              <h1>
                <Link href="/musicians/all">
                  <a>Newest Musician Entries</a>
                </Link>
              </h1>
              <hr />

              <CardGridLayout type="musician">
                {data.musicianList.map((musician) => (
                  <MusicianCard key={musician.id} {...musician} />
                ))}
              </CardGridLayout>
            </section>
          </>
        )}
      </UrqlStateLayout>
    </MainLayout>
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
