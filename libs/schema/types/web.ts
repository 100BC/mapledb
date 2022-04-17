import gql from 'graphql-tag';

import * as Types from '.';

export type MusicianReleaseFragment = {
  id: string;
  name: string;
  hasCover: boolean;
  release: string;
  instrumental: boolean;
  musicType: Types.MusicType;
  subgenre: { name: string };
};

export type GetMusicQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetMusicQuery = {
  music: {
    name: string;
    nonCanadians: Array<string>;
    release: string;
    hasCover: boolean;
    instrumental: boolean;
    musicType: Types.MusicType;
    copyright: string | null;
    appleLink: string | null;
    bandcampLink: string | null;
    spotifyLink: string | null;
    youtubeLink: string | null;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  };
};

export type GetMusicianQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetMusicianQuery = {
  musician: {
    name: string;
    appleLink: string | null;
    bandcampLink: string | null;
    spotifyLink: string | null;
    youtubeLink: string | null;
    isGroup: boolean;
    disbanded: string | null;
    city: { name: string; province: Types.Province };
    latestInfo: { latestRelease: string } | null;
    music: Array<{
      id: string;
      name: string;
      hasCover: boolean;
      release: string;
      instrumental: boolean;
      musicType: Types.MusicType;
      subgenre: { name: string };
    }>;
  };
};

export type MusicCardFragment = {
  id: string;
  name: string;
  hasCover: boolean;
  instrumental: boolean;
  nonCanadians: Array<string>;
  release: string;
  musicType: Types.MusicType;
  musicians: Array<{ id: string; name: string }>;
  subgenre: { name: string };
};

export type MusicianCardFragment = {
  id: string;
  name: string;
  city: { name: string; province: Types.Province };
  latestInfo: { latestRelease: string; latestGenre: Types.Genre } | null;
};

export type GetNewReleasesQueryVariables = Types.Exact<{
  takeMusic: Types.Scalars['Int'];
  takeMusicians: Types.Scalars['Int'];
}>;

export type GetNewReleasesQuery = {
  albumList: Array<{
    id: string;
    name: string;
    hasCover: boolean;
    instrumental: boolean;
    nonCanadians: Array<string>;
    release: string;
    musicType: Types.MusicType;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  }>;
  epList: Array<{
    id: string;
    name: string;
    hasCover: boolean;
    instrumental: boolean;
    nonCanadians: Array<string>;
    release: string;
    musicType: Types.MusicType;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  }>;
  singleList: Array<{
    id: string;
    name: string;
    hasCover: boolean;
    instrumental: boolean;
    nonCanadians: Array<string>;
    release: string;
    musicType: Types.MusicType;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  }>;
  musicianList: Array<{
    id: string;
    name: string;
    city: { name: string; province: Types.Province };
    latestInfo: { latestRelease: string; latestGenre: Types.Genre } | null;
  }>;
};

export type GetManyMusicQueryVariables = Types.Exact<{
  take: Types.Scalars['Int'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  genre?: Types.InputMaybe<Types.Genre>;
  type?: Types.InputMaybe<Array<Types.MusicType> | Types.MusicType>;
}>;

export type GetManyMusicQuery = {
  musicCount: number;
  musicList: Array<{
    id: string;
    name: string;
    hasCover: boolean;
    instrumental: boolean;
    nonCanadians: Array<string>;
    release: string;
    musicType: Types.MusicType;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  }>;
};

export type GetManyMusiciansQueryVariables = Types.Exact<{
  take: Types.Scalars['Int'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  province?: Types.InputMaybe<Types.Province>;
  orderBy?: Types.InputMaybe<Types.OrderByArgument>;
}>;

export type GetManyMusiciansQuery = {
  musicianCount: number;
  musicianList: Array<{
    id: string;
    name: string;
    city: { name: string; province: Types.Province };
    latestInfo: { latestRelease: string; latestGenre: Types.Genre } | null;
  }>;
};

export const MusicianRelease = gql`
  fragment musicianRelease on Music {
    id
    name
    hasCover
    release
    instrumental
    subgenre {
      name
    }
    musicType
  }
`;
export const MusicCard = gql`
  fragment musicCard on Music {
    id
    name
    hasCover
    instrumental
    musicians {
      id
      name
    }
    nonCanadians
    release
    subgenre {
      name
    }
    musicType
  }
`;
export const MusicianCard = gql`
  fragment musicianCard on Musician {
    id
    name
    city {
      name
      province
    }
    latestInfo {
      latestRelease
      latestGenre
    }
  }
`;
export const GetMusicDocument = gql`
  query GetMusic($id: String!) {
    music(id: $id) {
      name
      musicians {
        id
        name
      }
      nonCanadians
      release
      hasCover
      instrumental
      musicType
      copyright
      subgenre {
        name
      }
      appleLink
      bandcampLink
      spotifyLink
      youtubeLink
    }
  }
`;
export const GetMusicianDocument = gql`
  query GetMusician($id: String!) {
    musician(id: $id) {
      name
      city {
        name
        province
      }
      latestInfo {
        latestRelease
      }
      appleLink
      bandcampLink
      spotifyLink
      youtubeLink
      isGroup
      disbanded
      music {
        ...musicianRelease
      }
    }
  }
  ${MusicianRelease}
`;
export const GetNewReleasesDocument = gql`
  query GetNewReleases($takeMusic: Int!, $takeMusicians: Int!) {
    albumList: musicList(take: $takeMusic, type: [ALBUM]) {
      ...musicCard
    }
    epList: musicList(take: $takeMusic, type: [EP]) {
      ...musicCard
    }
    singleList: musicList(take: $takeMusic, type: [SINGLE]) {
      ...musicCard
    }
    musicianList(take: $takeMusicians, orderBy: DATE_ADDED) {
      ...musicianCard
    }
  }
  ${MusicCard}
  ${MusicianCard}
`;
export const GetManyMusicDocument = gql`
  query GetManyMusic(
    $take: Int!
    $skip: Int
    $genre: Genre
    $type: [MusicType!]
  ) {
    musicList(take: $take, skip: $skip, genre: $genre, type: $type) {
      ...musicCard
    }
    musicCount(genre: $genre, type: $type)
  }
  ${MusicCard}
`;
export const GetManyMusiciansDocument = gql`
  query GetManyMusicians(
    $take: Int!
    $skip: Int
    $province: Province
    $orderBy: OrderByArgument
  ) {
    musicianList(
      take: $take
      skip: $skip
      province: $province
      orderBy: $orderBy
    ) {
      ...musicianCard
    }
    musicianCount(province: $province)
  }
  ${MusicianCard}
`;
