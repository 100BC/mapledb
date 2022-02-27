import gql from 'graphql-tag';
import * as Urql from 'urql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

/** Base level genres */
export enum Genre {
  Country = 'COUNTRY',
  Electronic = 'ELECTRONIC',
  Experimental = 'EXPERIMENTAL',
  Folk = 'FOLK',
  Jazz = 'JAZZ',
  Metal = 'METAL',
  Pop = 'POP',
  Rap = 'RAP',
  Rock = 'ROCK',
}

/** Type of Music Release */
export enum MusicType {
  Album = 'ALBUM',
  Ep = 'EP',
  Live = 'LIVE',
  Other = 'OTHER',
  Single = 'SINGLE',
}

/** Argument values for ordering */
export enum OrderByArgument {
  DateAdded = 'DATE_ADDED',
  Release = 'RELEASE',
}

/** Provinces and Territories of Canada */
export enum Province {
  Ab = 'AB',
  Bc = 'BC',
  Mb = 'MB',
  Nb = 'NB',
  Nl = 'NL',
  Ns = 'NS',
  Nt = 'NT',
  Nu = 'NU',
  On = 'ON',
  Pe = 'PE',
  Qc = 'QC',
  Sk = 'SK',
  Yt = 'YT',
}

export type MusicianReleaseFragment = {
  id: string;
  name: string;
  hasCover: boolean;
  release: string;
  instrumental: boolean;
  subgenre: { name: string };
};

export type GetMusicQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetMusicQuery = {
  music: {
    name: string;
    nonCanadians: Array<string>;
    release: string;
    hasCover: boolean;
    instrumental: boolean;
    musicType: MusicType;
    copyright: string | null;
    appleLink: string | null;
    bandcampLink: string | null;
    soundcloudLink: string | null;
    spotifyLink: string | null;
    youtubeLink: string | null;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  };
};

export type GetMusicianQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetMusicianQuery = {
  musician: {
    name: string;
    appleLink: string | null;
    bandcampLink: string | null;
    soundcloudLink: string | null;
    spotifyLink: string | null;
    youtubeLink: string | null;
    isGroup: boolean;
    disbanded: string | null;
    city: { name: string; province: Province };
    latestInfo: { latestRelease: string } | null;
    albums: Array<{
      id: string;
      name: string;
      hasCover: boolean;
      release: string;
      instrumental: boolean;
      subgenre: { name: string };
    }>;
    eps: Array<{
      id: string;
      name: string;
      hasCover: boolean;
      release: string;
      instrumental: boolean;
      subgenre: { name: string };
    }>;
    singles: Array<{
      id: string;
      name: string;
      hasCover: boolean;
      release: string;
      instrumental: boolean;
      subgenre: { name: string };
    }>;
    live: Array<{
      id: string;
      name: string;
      hasCover: boolean;
      release: string;
      instrumental: boolean;
      subgenre: { name: string };
    }>;
    other: Array<{
      id: string;
      name: string;
      hasCover: boolean;
      release: string;
      instrumental: boolean;
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
  musicType: MusicType;
  musicians: Array<{ id: string; name: string }>;
  subgenre: { name: string };
};

export type MusicianCardFragment = {
  id: string;
  name: string;
  city: { name: string; province: Province };
  latestInfo: { latestRelease: string; latestGenre: Genre } | null;
};

export type GetNewReleasesQueryVariables = Exact<{
  takeMusic: Scalars['Int'];
  takeMusicians: Scalars['Int'];
}>;

export type GetNewReleasesQuery = {
  albumList: Array<{
    id: string;
    name: string;
    hasCover: boolean;
    instrumental: boolean;
    nonCanadians: Array<string>;
    release: string;
    musicType: MusicType;
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
    musicType: MusicType;
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
    musicType: MusicType;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  }>;
  musicianList: Array<{
    id: string;
    name: string;
    city: { name: string; province: Province };
    latestInfo: { latestRelease: string; latestGenre: Genre } | null;
  }>;
};

export type GetManyMusicQueryVariables = Exact<{
  take: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Genre>;
  type?: InputMaybe<Array<MusicType> | MusicType>;
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
    musicType: MusicType;
    musicians: Array<{ id: string; name: string }>;
    subgenre: { name: string };
  }>;
};

export type GetManyMusiciansQueryVariables = Exact<{
  take: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  province?: InputMaybe<Province>;
  orderBy?: InputMaybe<OrderByArgument>;
}>;

export type GetManyMusiciansQuery = {
  musicianCount: number;
  musicianList: Array<{
    id: string;
    name: string;
    city: { name: string; province: Province };
    latestInfo: { latestRelease: string; latestGenre: Genre } | null;
  }>;
};

export const MusicianReleaseFragmentDoc = gql`
  fragment musicianRelease on Music {
    id
    name
    hasCover
    release
    instrumental
    subgenre {
      name
    }
  }
`;
export const MusicCardFragmentDoc = gql`
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
export const MusicianCardFragmentDoc = gql`
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
      soundcloudLink
      spotifyLink
      youtubeLink
    }
  }
`;

export function useGetMusicQuery(
  options: Omit<Urql.UseQueryArgs<GetMusicQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetMusicQuery>({ query: GetMusicDocument, ...options });
}
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
      soundcloudLink
      spotifyLink
      youtubeLink
      isGroup
      disbanded
      albums: music(type: ALBUM) {
        ...musicianRelease
      }
      eps: music(type: EP) {
        ...musicianRelease
      }
      singles: music(type: SINGLE) {
        ...musicianRelease
      }
      live: music(type: LIVE) {
        ...musicianRelease
      }
      other: music(type: OTHER) {
        ...musicianRelease
      }
    }
  }
  ${MusicianReleaseFragmentDoc}
`;

export function useGetMusicianQuery(
  options: Omit<Urql.UseQueryArgs<GetMusicianQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetMusicianQuery>({
    query: GetMusicianDocument,
    ...options,
  });
}
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
  ${MusicCardFragmentDoc}
  ${MusicianCardFragmentDoc}
`;

export function useGetNewReleasesQuery(
  options: Omit<Urql.UseQueryArgs<GetNewReleasesQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetNewReleasesQuery>({
    query: GetNewReleasesDocument,
    ...options,
  });
}
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
  ${MusicCardFragmentDoc}
`;

export function useGetManyMusicQuery(
  options: Omit<Urql.UseQueryArgs<GetManyMusicQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetManyMusicQuery>({
    query: GetManyMusicDocument,
    ...options,
  });
}
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
  ${MusicianCardFragmentDoc}
`;

export function useGetManyMusiciansQuery(
  options: Omit<Urql.UseQueryArgs<GetManyMusiciansQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetManyMusiciansQuery>({
    query: GetManyMusiciansDocument,
    ...options,
  });
}
