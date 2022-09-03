import * as Operations from '@mapledb/schema/types/web';
import * as Urql from 'urql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function useGetMusicQuery(
  options: Omit<Urql.UseQueryArgs<Operations.GetMusicQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    Operations.GetMusicQuery,
    Operations.GetMusicQueryVariables
  >({ query: Operations.GetMusicDocument, ...options });
}

export function useGetMusicianQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.GetMusicianQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    Operations.GetMusicianQuery,
    Operations.GetMusicianQueryVariables
  >({ query: Operations.GetMusicianDocument, ...options });
}

export function useGetNewReleasesQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.GetNewReleasesQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    Operations.GetNewReleasesQuery,
    Operations.GetNewReleasesQueryVariables
  >({ query: Operations.GetNewReleasesDocument, ...options });
}

export function useGetManyMusicQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.GetManyMusicQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    Operations.GetManyMusicQuery,
    Operations.GetManyMusicQueryVariables
  >({ query: Operations.GetManyMusicDocument, ...options });
}

export function useGetManyMusiciansQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.GetManyMusiciansQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    Operations.GetManyMusiciansQuery,
    Operations.GetManyMusiciansQueryVariables
  >({ query: Operations.GetManyMusiciansDocument, ...options });
}
