import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import { MusicType } from '@mooseical/schema/types';
import { GetMusicianDocument } from '@mooseical/schema/types/web';
import ExternalLinks from '@components/ExternalLinks';
import Layout from '@components/Layout';
import styles from '@styles/musician.module.scss';
import setSSRCache from '@utils/setSSRCache';
import MusicCard from '@components/Cards/MusicCard';
import DbContainer from '@components/DbComponents/DbContainer';
import GqlContainer from '@components/GqlContainer';
import useDateParser from '@utils/hooks/useDateParser';
import useYearParser from '@utils/hooks/useYearParser';
import { useGetMusicianQuery } from '@graphql/hooks';

interface Props {
  musicianId: string;
}

const MusicianDisplay = ({ musicianId }: Props) => {
  const [{ data, fetching, error }] = useGetMusicianQuery({
    variables: { id: musicianId },
  });

  const {
    name,
    appleLink,
    bandcampLink,
    spotifyLink,
    youtubeLink,
    city,
    isGroup,
    disbanded,
    latestInfo,
  } = { ...data?.musician };
  const releaseDate = useDateParser(latestInfo?.latestRelease);
  const pluralMusician = isGroup ? 'Group' : 'Musician';
  const disbandedYear = useYearParser(disbanded);

  return (
    <Layout
      title={`${name} | Mooseical`}
      ogpTitle={name}
      description={`View information on ${name}, ${
        isGroup ? 'a musical group' : 'a musician'
      } based in ${city?.name}, ${
        city?.province
      } Canada on Mooseical - Canadian Music Database.`}
      canonicalUrlPath={`/musicians/m/${musicianId}`}
    >
      <GqlContainer
        fetching={fetching}
        error={error}
        errorComponent
        errorStatusCode={404}
      >
        {data && (
          <>
            <h1>{name}</h1>
            <hr />
            <ExternalLinks
              apple={appleLink}
              bandcamp={bandcampLink}
              spotify={spotifyLink}
              youtube={youtubeLink}
            />
            <section>
              <h2>Info</h2>
              <hr />
              <ul className={styles.info}>
                <li>
                  {pluralMusician} based in{' '}
                  <Link
                    href={`/musicians/${
                      city?.province?.toLowerCase() || 'all'
                    }`}
                  >
                    <a>
                      <address>
                        {city?.name
                          ? `${city?.name}, ${city?.province}`
                          : 'Canada'}
                      </address>
                    </a>
                  </Link>
                </li>
                <li>
                  Latest Major Release: <time>{releaseDate}</time>
                </li>
                {disbanded && (
                  <li>
                    Disbanded: <time>{disbandedYear}</time>
                  </li>
                )}
              </ul>
            </section>
            {data.musician.albums.length > 0 && (
              <section>
                <h2>Albums</h2>
                <hr />
                <DbContainer type="music">
                  {data.musician.albums.map((doc, i) => (
                    <MusicCard
                      key={doc.id}
                      {...doc}
                      musicType={MusicType.Album}
                      imagePriority={i < 5}
                    />
                  ))}
                </DbContainer>
              </section>
            )}
            {data.musician.eps.length > 0 && (
              <section>
                <h2>EPs</h2>
                <hr />
                <DbContainer type="music">
                  {data.musician.eps.map((doc) => (
                    <MusicCard key={doc.id} {...doc} musicType={MusicType.Ep} />
                  ))}
                </DbContainer>
              </section>
            )}
            {data.musician.singles.length > 0 && (
              <section>
                <h2>Non-Album Singles</h2>
                <hr />
                <DbContainer type="music">
                  {data.musician.singles.map((doc) => (
                    <MusicCard
                      key={doc.id}
                      {...doc}
                      musicType={MusicType.Single}
                    />
                  ))}
                </DbContainer>
              </section>
            )}
            {data.musician.live.length > 0 && (
              <section>
                <h2>Live Releases</h2>
                <hr />
                <DbContainer type="music">
                  {data.musician.live.map((doc) => (
                    <MusicCard
                      key={doc.id}
                      {...doc}
                      musicType={MusicType.Live}
                    />
                  ))}
                </DbContainer>
              </section>
            )}
            {data.musician.other.length > 0 && (
              <section>
                <h2>Other Releases</h2>
                <hr />
                <DbContainer type="music">
                  {data.musician.other.map((doc) => (
                    <MusicCard
                      key={doc.id}
                      {...doc}
                      musicType={MusicType.Other}
                    />
                  ))}
                </DbContainer>
              </section>
            )}
          </>
        )}
      </GqlContainer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
  setSSRCache(res, 14);

  const musician = await gqlClient
    .query(GetMusicianDocument, { id: String(params?.musicianId) })
    .toPromise();

  return {
    props: {
      musicianId: params?.musicianId,
      urqlState: musician.data ? ssrCache.extractData() : null,
    },
  };
};

export default MusicianDisplay;
