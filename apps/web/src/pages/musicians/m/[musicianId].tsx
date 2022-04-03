import React, { useMemo } from 'react';
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
import useParseDate, { useParseYear } from '@utils/hooks/useParseDate';
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
    albums,
    eps,
    singles,
    deluxe,
    compilation,
    remix,
    live,
    other,
  } = { ...data?.musician };
  const releaseDate = useParseDate(latestInfo?.latestRelease);
  const pluralMusician = isGroup ? 'Group' : 'Musician';
  const disbandedYear = useParseYear(disbanded);

  const releases = useMemo(
    () => [
      {
        title: 'Albums',
        data: albums,
        type: MusicType.Album,
        priority: true,
      },
      {
        title: 'EPs',
        data: eps,
        type: MusicType.Ep,
        priority: !albums || albums.length === 0,
      },
      {
        title: 'Singles',
        data: singles,
        type: MusicType.Single,
        priority: !eps || eps.length === 0,
      },
      {
        title: 'Deluxe Editions',
        data: deluxe,
        type: MusicType.Deluxe,
        priority: !singles || singles.length === 0,
      },
      {
        title: 'Compilations',
        data: compilation,
        type: MusicType.Compilation,
        priority: !deluxe || deluxe.length === 0,
      },
      {
        title: 'Remixes',
        data: remix,
        type: MusicType.Remix,
        priority: !compilation || compilation.length === 0,
      },
      {
        title: 'Live Recordings',
        data: live,
        type: MusicType.Live,
        priority: !remix || remix.length === 0,
      },
      {
        title: 'Other Releases',
        data: other,
        type: MusicType.Other,
        priority: !live || live.length === 0,
      },
    ],
    [albums, eps, singles, deluxe, compilation, remix, live, other]
  );

  return (
    <Layout
      title={`Mooseical | ${name}`}
      ogpTitle={name}
      description={`View information on ${name}, ${
        isGroup ? 'a musical group' : 'a musician'
      } based in ${city?.name}, ${
        city?.province
      } on Mooseical - Canadian Music Database.`}
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
            {releases.map((music) =>
              music.data && music.data.length > 0 ? (
                <section key={music.type}>
                  <h2>{music.title}</h2>
                  <hr />
                  <DbContainer type="music">
                    {music.data.map((doc, i) => (
                      <MusicCard
                        key={doc.id}
                        {...doc}
                        musicType={music.type}
                        imagePriority={i < 5 && music.priority}
                      />
                    ))}
                  </DbContainer>
                </section>
              ) : null
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
