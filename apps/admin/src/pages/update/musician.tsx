import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Spinner from '@mapledb/shared/components/Spinner';
import { SearchBar } from '@mapledb/shared/components/FormComponents';

import MainLayout from '@layouts/main';
import { useEditMusicianMutation, useGetMusicianQuery } from '@graphql/hooks';
import Environment from '@components/Environment';
import MusicianFormGeneric, {
  MusicianFormProps,
} from '@components/FormGenerics/Musician';
import {
  parseNullableDateField,
  parseNullableStringField,
} from '@utils/parseNullableFields';
import setValues from '@utils/setValues';
import styles from '@styles/forms.module.scss';

const UpdateMusician = () => {
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
    <MainLayout>
      <h1>Update Musician</h1>
      <hr />
      <Environment />
      <div className={styles.marginTop}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <SearchBar
              placeholder="Find Musician by id"
              id="music-search"
              searchFunction={(s) => searchMusician(s)}
            />
            {searchResults.error && <div>{searchResults.error.message}</div>}
          </>
        )}
      </div>
      {editMusicianResults.error && (
        <div className={styles.marginTop}>
          {editMusicianResults.error.message}
        </div>
      )}
      {uploaded && (
        <h2 className={styles.extraMarginTop}>
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
    </MainLayout>
  );
};

export default UpdateMusician;
