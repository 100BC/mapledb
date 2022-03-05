import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@components/Layout';
import { useEditMusicianMutation, useGetMusicianQuery } from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import Environment from '@components/Environment';
import MusicianFormGeneric, {
  MusicianFormProps,
} from '@components/FormGenerics/Musician';
import { SearchBar } from '@mooseical/shared/components/FormComponents';
import {
  parseNullableDateField,
  parseNullableStringField,
} from '@utils/parseLinks';

const MusicianEdit = () => {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [editMusicianResults, editMusician] = useEditMusicianMutation();
  const [musicianId, setMusicianId] = useState<string | null>(null);
  const [searchResults] = useGetMusicianQuery({
    variables: { id: musicianId! },
    pause: !musicianId,
  });
  const methods = useForm<MusicianFormProps>();
  const {
    setValue,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    if (editMusicianResults.fetching || searchResults.fetching)
      setLoading(true);
    else setLoading(false);
  }, [editMusicianResults.fetching, searchResults.fetching]);

  useEffect(() => {
    if (editMusicianResults.data) setUploaded(true);
  }, [editMusicianResults.data]);

  useEffect(() => {
    if (searchResults.data?.musician) {
      const data = searchResults.data.musician;
      setValue('musician', data.name, { shouldDirty: false });
      setValue('city', data.city.name, { shouldDirty: false });
      setValue('province', data.city.province, {
        shouldDirty: false,
      });
      setValue('isGroup', data.isGroup, {
        shouldDirty: false,
      });
      setValue('disbanded', data.disbanded || undefined, {
        shouldDirty: false,
      });
      setValue('links.apple', data.appleLink || undefined, {
        shouldDirty: false,
      });
      setValue('links.bandcamp', data.bandcampLink || undefined, {
        shouldDirty: false,
      });
      setValue('links.soundcloud', data.soundcloudLink || undefined, {
        shouldDirty: false,
      });
      setValue('links.spotify', data.spotifyLink || undefined, {
        shouldDirty: false,
      });
      setValue('links.youtube', data.youtubeLink || undefined, {
        shouldDirty: false,
      });
    }
  }, [searchResults.data?.musician, setValue]);

  const searchMusician = (searchQuery: string) => {
    setUploaded(false);
    setMusicianId(searchQuery);
  };

  const onSubmit = async (data: MusicianFormProps) => {
    const appleLink = parseNullableStringField(data.links.apple);
    const bandcampLink = parseNullableStringField(data.links.bandcamp);
    const soundcloudLink = parseNullableStringField(data.links.soundcloud);
    const spotifyLink = parseNullableStringField(data.links.spotify);
    const youtubeLink = parseNullableStringField(data.links.youtube);
    const disbanded = parseNullableDateField(data.disbanded);

    const payload = {
      id: musicianId!,
      city: dirtyFields.city ? data.city.trim() : undefined,
      province: dirtyFields.province ? data.province : undefined,
      appleLink: dirtyFields.links?.apple ? appleLink : undefined,
      bandcampLink: dirtyFields.links?.bandcamp ? bandcampLink : undefined,
      soundcloudLink: dirtyFields.links?.soundcloud
        ? soundcloudLink
        : undefined,
      spotifyLink: dirtyFields.links?.spotify ? spotifyLink : undefined,
      youtubeLink: dirtyFields.links?.youtube ? youtubeLink : undefined,
      isGroup: dirtyFields.isGroup ? data.isGroup : undefined,
      disbanded: dirtyFields.disbanded ? disbanded : undefined,
    };

    await editMusician(payload);
  };

  return (
    <Layout>
      <h1>Edit Musician</h1>
      <hr />
      <Environment />
      {loading ? (
        <Spinner />
      ) : (
        <SearchBar
          placeholder="Find Musician"
          id="music-search"
          searchFunction={(s) => searchMusician(s)}
        />
      )}
      {searchResults.error && <div>{searchResults.error.message}</div>}
      {editMusicianResults.error && (
        <div style={{ marginTop: '4rem' }}>
          {editMusicianResults.error.message}
        </div>
      )}
      {uploaded && (
        <h2 style={{ marginTop: '8rem' }}>
          Updated Musician: <b>{editMusicianResults.data?.musicianEdit.name}</b>
        </h2>
      )}
      {!uploaded && !loading && searchResults.data && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <MusicianFormGeneric isEditing />
          </form>
        </FormProvider>
      )}
    </Layout>
  );
};

export default MusicianEdit;
