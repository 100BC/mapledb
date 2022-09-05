import { Fragment, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { MusicType } from '@mapledb/schema/types';
import { GetMusicianDocument } from '@mapledb/schema/types/web';
import { conditional } from '@mapledb/shared/style-helpers';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import ExternalLinks from '@components/ExternalLinks';
import MainLayout from '@layouts/Main';
import styles from '@styles/musician.module.scss';
import setSSRCache from '@utils/setSSRCache';
import MusicCard from '@components/Cards/MusicCard';
import CardGridLayout from '@layouts/CardGrid';
import UrqlStateLayout from '@layouts/UrqlState';
import useParseDate, { useParseYear } from '@utils/hooks/useParseDate';
import { useGetMusicianQuery } from '@graphql/hooks';
import GridSvg from '@assets/svg/grid.svg';
import ListSvg from '@assets/svg/list.svg';

interface Props {
  musicianId: string;
}

const MusicianDisplay = ({ musicianId }: Props) => {
  const [{ data, fetching, error }] = useGetMusicianQuery({
    variables: { id: musicianId },
  });
  const [listView, setListView] = useState(0);

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
    music,
  } = { ...data?.musician };
  const releaseDate = useParseDate(latestInfo?.latestRelease);
  const pluralMusician = isGroup ? 'Group' : 'Musician';
  const disbandedYear = useParseYear(disbanded);

  const detailedReleases = useMemo(
    () => [
      {
        title: 'Albums',
        data: music?.filter((m) => m.musicType === 'ALBUM'),
        type: MusicType.Album,
      },
      {
        title: 'EPs',
        data: music?.filter((m) => m.musicType === 'EP'),
        type: MusicType.Ep,
      },
      {
        title: 'Singles',
        data: music?.filter((m) => m.musicType === 'SINGLE'),
        type: MusicType.Single,
      },
      {
        title: 'Deluxe Editions',
        data: music?.filter((m) => m.musicType === 'DELUXE'),
        type: MusicType.Deluxe,
      },
      {
        title: 'Compilations',
        data: music?.filter((m) => m.musicType === 'COMPILATION'),
        type: MusicType.Compilation,
      },
      {
        title: 'Remixes',
        data: music?.filter((m) => m.musicType === 'REMIX'),
        type: MusicType.Remix,
      },
      {
        title: 'Live Recordings',
        data: music?.filter((m) => m.musicType === 'LIVE'),
        type: MusicType.Live,
      },
      {
        title: 'Other Releases',
        data: music?.filter((m) => m.musicType === 'OTHER'),
        type: MusicType.Other,
      },
    ],
    [music]
  );

  return (
    <MainLayout
      title={`MapleDB | ${name}`}
      ogpTitle={name}
      description={`View information on ${name}, ${
        isGroup ? 'a musical group' : 'a musician'
      } based in ${city?.name}, ${
        city?.province
      } on MapleDB - Canadian Music Database.`}
      canonicalUrlPath={`/musicians/m/${musicianId}`}
    >
      <UrqlStateLayout
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
            <section>
              <h2>Music</h2>
              <hr />
              <div className={styles.toggle}>
                <button
                  type="button"
                  onClick={() => setListView(0)}
                  className={conditional(!listView, styles.active)}
                >
                  Grid View
                  <GridSvg />
                </button>
                <button
                  type="button"
                  onClick={() => setListView(1)}
                  className={conditional(!!listView, styles.active)}
                >
                  List View
                  <ListSvg />
                </button>
              </div>

              {listView ? (
                <>
                  {detailedReleases.map((det) =>
                    det.data && det.data.length > 0 ? (
                      <Fragment key={det.type}>
                        <h3 className={styles.subtitle}>{det.title}</h3>
                        {/* <hr /> */}
                        <CardGridLayout type="music">
                          {det.data.map((doc) => (
                            <MusicCard
                              key={doc.id}
                              {...doc}
                              musicType={det.type}
                              showMusicType
                            />
                          ))}
                        </CardGridLayout>
                      </Fragment>
                    ) : null
                  )}
                </>
              ) : (
                <CardGridLayout type="music">
                  {music?.map((doc, i) => (
                    <MusicCard
                      key={doc.id}
                      {...doc}
                      imagePriority={i < 5}
                      showMusicType
                    />
                  ))}
                </CardGridLayout>
              )}
            </section>
          </>
        )}
      </UrqlStateLayout>
    </MainLayout>
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
