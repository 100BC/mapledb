import React from 'react';
import { GetServerSideProps } from 'next';

import { Genre, MusicType } from '@mooseical/schema/types';
import { GetManyMusicDocument } from '@mooseical/schema/types/web';
import { gqlClient, ssrCache } from '@graphql/gqlClient';
import { MUSIC_QUERY_SIZE } from '@mooseical/constants';
import Layout from '@components/Layout';
import setSSRCache from '@utils/setSSRCache';
import MusicTypeFilter from '@components/DbComponents/MusicTypeFilter';
import { DbFilter } from '@components/DbComponents/DbFilter';
import musicSSRValidator from '@utils/validators/musicSSRValidator';
import GqlContainer from '@components/GqlContainer';
import DbContainer from '@components/DbComponents/DbContainer';
import Pagination from '@components/DbComponents/Pagination';
import MusicCard from '@components/Cards/MusicCard';
import useGenreParser from '@utils/hooks/useGenreParser';
import { useGetManyMusicQuery } from '@graphql/hooks';

interface Props {
  genre: Genre | null;
  musicTypes: MusicType[] | null;
  skip: number;
  currentPage: number | null;
}

const MusicGrid = ({ genre, musicTypes, skip, currentPage }: Props) => {
  const [{ data, fetching, error }] = useGetManyMusicQuery({
    variables: {
      take: MUSIC_QUERY_SIZE,
      skip,
      genre,
      type: musicTypes || Object.values(MusicType),
    },
  });
  const [
    capitalGenre,
    capitalGenreSpaced,
    lowerCaseGenre,
    lowerCaseGenreSpaced,
  ] = useGenreParser(genre);

  return (
    <Layout
      title={`Canadian ${capitalGenreSpaced}Music Database | Mooseical`}
      description={`Explore the database of ${lowerCaseGenreSpaced}music released by Underground Canadian Musicians on Mooseical - Canadian Music Database.`}
      canonicalUrlPath={`/music/${lowerCaseGenre || 'all'}`}
    >
      <h1>Music Database</h1>
      <hr />
      <h2>{capitalGenre ? `${capitalGenre} Music` : 'All Genres'}</h2>
      <DbFilter page="music" />
      <MusicTypeFilter musicTypes={musicTypes} />
      <GqlContainer fetching={fetching} error={error}>
        <DbContainer type="music" tag="section">
          {data?.musicList.map((doc, i) => (
            <MusicCard
              showMusicType
              key={doc.id}
              {...doc}
              imagePriority={i < 5}
            />
          ))}
        </DbContainer>
        <Pagination
          pageType="music"
          currentPage={currentPage || 1}
          totalCount={data?.musicCount || 0}
        />
      </GqlContainer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
  query,
}) => {
  if (!musicSSRValidator(params?.genre, query.page)) {
    return {
      notFound: true,
    };
  }

  setSSRCache(res, 1);

  let musicTypes = null;
  if (Array.isArray(query.type)) {
    musicTypes = query.type;
  } else if (typeof query.type === 'string') {
    musicTypes = [query.type];
  }

  if (
    musicTypes &&
    (!musicTypes.every((type) =>
      (Object.values(MusicType) as string[]).includes(type)
    ) ||
      musicTypes.length !== new Set(musicTypes).size)
  ) {
    return {
      redirect: {
        destination: `/music/${params!.genre}`,
        permanent: true,
      },
    };
  }

  const genre =
    params?.genre === 'all' ? null : (params?.genre as string).toUpperCase();

  const skip = query.page
    ? MUSIC_QUERY_SIZE * (parseInt(query.page as string, 10) - 1)
    : 0;

  // In order to get static generation and render the components properly,
  // the initial query must match the client
  const music = await gqlClient
    .query(GetManyMusicDocument, {
      take: MUSIC_QUERY_SIZE,
      skip,
      genre,
      type: musicTypes || Object.values(MusicType),
    })
    .toPromise();

  return {
    props: {
      genre,
      skip,
      musicTypes,
      currentPage: query.page ? parseInt(query.page as string, 10) : null,
      urqlState: music.data ? ssrCache.extractData() : null,
      key: `${params?.genre}-${musicTypes}`, // Allows the state to reset on new path
    },
  };
};

export default MusicGrid;
