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
import setValues from '@utils/setValues';

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
      setValues(setValue, {
        musician: data.name,
        city: data.city.name,
        province: data.city.province,
        isGroup: data.isGroup,
        disbanded: data.disbanded,
        'links.apple': data.appleLink,
        'links.bandcamp': data.bandcampLink,
        'links.soundcloud': data.soundcloudLink,
        'links.spotify': data.spotifyLink,
        'links.youtube': data.youtubeLink,
      });
    }
  }, [searchResults.data?.musician, setValue]);

  const searchMusician = (searchQuery: string) => {
    setUploaded(false);
    setMusicianId(searchQuery);
  };

  const onSubmit = async (data: MusicianFormProps) => {
    const payload = {
      id: musicianId!,
      city: dirtyFields.city ? data.city.trim() : undefined,
      province: dirtyFields.province ? data.province : undefined,
      isGroup: dirtyFields.isGroup ? data.isGroup : undefined,
      appleLink: parseNullableStringField(
        !!dirtyFields.links?.apple,
        data.links.apple
      ),
      bandcampLink: parseNullableStringField(
        !!dirtyFields.links?.bandcamp,
        data.links.bandcamp
      ),
      soundcloudLink: parseNullableStringField(
        !!dirtyFields.links?.soundcloud,
        data.links.soundcloud
      ),
      spotifyLink: parseNullableStringField(
        !!dirtyFields.links?.spotify,
        data.links.spotify
      ),
      youtubeLink: parseNullableStringField(
        !!dirtyFields.links?.youtube,
        data.links.youtube
      ),
      disbanded: parseNullableDateField(
        !!dirtyFields.disbanded,
        data.disbanded
      ),
    };

    await editMusician(payload);
  };

  return (
    <Layout>
      <h1>Edit Musician</h1>
      <hr />
      <Environment />
      <div style={{ margin: '4rem 0' }}>
        {loading ? (
          <Spinner />
        ) : (
          <SearchBar
            placeholder="Find Musician by id"
            id="music-search"
            searchFunction={(s) => searchMusician(s)}
          />
        )}
      </div>
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
