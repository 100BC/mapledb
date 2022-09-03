import * as Operations from '@mapledb/schema/types/admin';
import * as Urql from 'urql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function useAddMusicMutation() {
  return Urql.useMutation<
    Operations.AddMusicMutation,
    Operations.AddMusicMutationVariables
  >(Operations.AddMusicDocument);
}

export function useAddMusicianMutation() {
  return Urql.useMutation<
    Operations.AddMusicianMutation,
    Operations.AddMusicianMutationVariables
  >(Operations.AddMusicianDocument);
}

export function useDeleteMusicMutation() {
  return Urql.useMutation<
    Operations.DeleteMusicMutation,
    Operations.DeleteMusicMutationVariables
  >(Operations.DeleteMusicDocument);
}

export function useDeleteMusicianMutation() {
  return Urql.useMutation<
    Operations.DeleteMusicianMutation,
    Operations.DeleteMusicianMutationVariables
  >(Operations.DeleteMusicianDocument);
}

export function useEditMusicMutation() {
  return Urql.useMutation<
    Operations.EditMusicMutation,
    Operations.EditMusicMutationVariables
  >(Operations.EditMusicDocument);
}

export function useEditMusicianMutation() {
  return Urql.useMutation<
    Operations.EditMusicianMutation,
    Operations.EditMusicianMutationVariables
  >(Operations.EditMusicianDocument);
}

export function useGetMusicQuery(
  options: Omit<Urql.UseQueryArgs<Operations.GetMusicQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    Operations.GetMusicQuery,
    Operations.GetMusicQueryVariables
  >({ query: Operations.GetMusicDocument, ...options });
}

export function useGetMusicNameQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.GetMusicNameQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    Operations.GetMusicNameQuery,
    Operations.GetMusicNameQueryVariables
  >({ query: Operations.GetMusicNameDocument, ...options });
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

export function useGetMusicianNameQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.GetMusicianNameQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    Operations.GetMusicianNameQuery,
    Operations.GetMusicianNameQueryVariables
  >({ query: Operations.GetMusicianNameDocument, ...options });
}
