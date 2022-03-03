import gql from 'graphql-tag';
import * as Types from '.';

export type AddMusicMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  musicianIds: Array<Types.Scalars['String']> | Types.Scalars['String'];
  release: Types.Scalars['Date'];
  subgenre: Types.Scalars['String'];
  genre: Types.Genre;
  instrumental: Types.Scalars['Boolean'];
  musicType: Types.MusicType;
  cover?: Types.InputMaybe<Types.Scalars['Upload']>;
  appleLink?: Types.InputMaybe<Types.Scalars['String']>;
  bandcampLink?: Types.InputMaybe<Types.Scalars['String']>;
  soundcloudLink?: Types.InputMaybe<Types.Scalars['String']>;
  spotifyLink?: Types.InputMaybe<Types.Scalars['String']>;
  youtubeLink?: Types.InputMaybe<Types.Scalars['String']>;
  nonCanadians: Array<Types.Scalars['String']> | Types.Scalars['String'];
  copyright?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type AddMusicMutation = { musicAdd: { id: string; name: string } };

export type AddMusicianMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  city: Types.Scalars['String'];
  province: Types.Province;
  appleLink?: Types.InputMaybe<Types.Scalars['String']>;
  bandcampLink?: Types.InputMaybe<Types.Scalars['String']>;
  soundcloudLink?: Types.InputMaybe<Types.Scalars['String']>;
  spotifyLink?: Types.InputMaybe<Types.Scalars['String']>;
  youtubeLink?: Types.InputMaybe<Types.Scalars['String']>;
  isGroup: Types.Scalars['Boolean'];
  disbanded?: Types.InputMaybe<Types.Scalars['Date']>;
}>;

export type AddMusicianMutation = { musicianAdd: { id: string; name: string } };

export type DeleteMusicMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type DeleteMusicMutation = { musicDelete: { id: string; name: string } };

export type EditMusicMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  release?: Types.InputMaybe<Types.Scalars['Date']>;
  subgenre?: Types.InputMaybe<Types.Scalars['String']>;
  genre?: Types.InputMaybe<Types.Genre>;
  instrumental?: Types.InputMaybe<Types.Scalars['Boolean']>;
  cover?: Types.InputMaybe<Types.Scalars['Upload']>;
  appleLink?: Types.InputMaybe<Types.Scalars['String']>;
  bandcampLink?: Types.InputMaybe<Types.Scalars['String']>;
  soundcloudLink?: Types.InputMaybe<Types.Scalars['String']>;
  spotifyLink?: Types.InputMaybe<Types.Scalars['String']>;
  youtubeLink?: Types.InputMaybe<Types.Scalars['String']>;
  musicType?: Types.InputMaybe<Types.MusicType>;
  nonCanadians?: Types.InputMaybe<
    Array<Types.Scalars['String']> | Types.Scalars['String']
  >;
  copyright?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type EditMusicMutation = { musicEdit: { id: string; name: string } };

export type GetMusicQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GetMusicQuery = {
  music: {
    id: string;
    nonCanadians: Array<string>;
    release: string;
    hasCover: boolean;
    copyright: string | null;
    instrumental: boolean;
    appleLink: string | null;
    bandcampLink: string | null;
    soundcloudLink: string | null;
    spotifyLink: string | null;
    youtubeLink: string | null;
    musicType: Types.MusicType;
    subgenre: { name: string; genre: Types.Genre };
  };
};

export const AddMusicDocument = gql`
  mutation AddMusic(
    $name: String!
    $musicianIds: [String!]!
    $release: Date!
    $subgenre: String!
    $genre: Genre!
    $instrumental: Boolean!
    $musicType: MusicType!
    $cover: Upload
    $appleLink: String
    $bandcampLink: String
    $soundcloudLink: String
    $spotifyLink: String
    $youtubeLink: String
    $nonCanadians: [String!]!
    $copyright: String
  ) {
    musicAdd(
      name: $name
      musicianIds: $musicianIds
      release: $release
      subgenre: $subgenre
      genre: $genre
      instrumental: $instrumental
      musicType: $musicType
      cover: $cover
      appleLink: $appleLink
      bandcampLink: $bandcampLink
      soundcloudLink: $soundcloudLink
      spotifyLink: $spotifyLink
      youtubeLink: $youtubeLink
      nonCanadians: $nonCanadians
      copyright: $copyright
    ) {
      id
      name
    }
  }
`;
export const AddMusicianDocument = gql`
  mutation AddMusician(
    $name: String!
    $city: String!
    $province: Province!
    $appleLink: String
    $bandcampLink: String
    $soundcloudLink: String
    $spotifyLink: String
    $youtubeLink: String
    $isGroup: Boolean!
    $disbanded: Date
  ) {
    musicianAdd(
      name: $name
      city: $city
      province: $province
      appleLink: $appleLink
      bandcampLink: $bandcampLink
      soundcloudLink: $soundcloudLink
      spotifyLink: $spotifyLink
      youtubeLink: $youtubeLink
      isGroup: $isGroup
      disbanded: $disbanded
    ) {
      id
      name
    }
  }
`;
export const DeleteMusicDocument = gql`
  mutation DeleteMusic($id: String!) {
    musicDelete(id: $id) {
      id
      name
    }
  }
`;
export const EditMusicDocument = gql`
  mutation EditMusic(
    $id: String!
    $release: Date
    $subgenre: String
    $genre: Genre
    $instrumental: Boolean
    $cover: Upload
    $appleLink: String
    $bandcampLink: String
    $soundcloudLink: String
    $spotifyLink: String
    $youtubeLink: String
    $musicType: MusicType
    $nonCanadians: [String!]
    $copyright: String
  ) {
    musicEdit(
      id: $id
      release: $release
      subgenre: $subgenre
      genre: $genre
      instrumental: $instrumental
      cover: $cover
      appleLink: $appleLink
      bandcampLink: $bandcampLink
      soundcloudLink: $soundcloudLink
      spotifyLink: $spotifyLink
      youtubeLink: $youtubeLink
      musicType: $musicType
      nonCanadians: $nonCanadians
      copyright: $copyright
    ) {
      id
      name
    }
  }
`;
export const GetMusicDocument = gql`
  query GetMusic($id: String!) {
    music(id: $id) {
      id
      nonCanadians
      release
      hasCover
      subgenre {
        name
        genre
      }
      copyright
      instrumental
      appleLink
      bandcampLink
      soundcloudLink
      spotifyLink
      youtubeLink
      musicType
    }
  }
`;