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
  const [editMusicianResults, editMusician] = useEditMusicianMutation();
  const [musicianId, setMusicianId] = useState<string | null>(null);
  const [{ data: searchData, fetching: searching, error: searchError }] =
    useGetMusicianQuery({
      variables: { id: musicianId! },
      pause: !musicianId,
    });
  const methods = useForm<MusicianFormProps>();
  const {
    setValue,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    if (searchData) {
      setValue('musician', searchData.musician.name, { shouldDirty: false });
      setValue('city', searchData.musician.city.name, { shouldDirty: false });
      setValue('province', searchData.musician.city.province, {
        shouldDirty: false,
      });
      setValue('isGroup', searchData.musician.isGroup, {
        shouldDirty: false,
      });
      setValue('disbanded', searchData.musician.disbanded || undefined, {
        shouldDirty: false,
      });
      setValue('links.apple', searchData.musician.appleLink || undefined, {
        shouldDirty: false,
      });
      setValue(
        'links.bandcamp',
        searchData.musician.bandcampLink || undefined,
        {
          shouldDirty: false,
        }
      );
      setValue(
        'links.soundcloud',
        searchData.musician.soundcloudLink || undefined,
        {
          shouldDirty: false,
        }
      );
      setValue('links.spotify', searchData.musician.spotifyLink || undefined, {
        shouldDirty: false,
      });
      setValue('links.youtube', searchData.musician.youtubeLink || undefined, {
        shouldDirty: false,
      });
    }
  }, [searchData, setValue]);

  const searchMusician = (searchQuery: string) => {
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

    // setSubmitting(true);
    // await editMusician(payload).then((result) => {
    //   if (result.error) {
    //     setErrorMessage(result.error.message);
    //   }
    // });
  };

  // const resetFields = (shouldReset: boolean) => {
  //   if (shouldReset) methods.reset();
  //   setErrorMessage(null);
  //   setSubmitting(false);
  // };

  return (
    <Layout>
      <h1>Edit Musician</h1>
      <hr />
      <Environment />
      {searching || editMusicianResults.fetching ? (
        <Spinner />
      ) : (
        <SearchBar
          placeholder="Find Musician"
          id="music-search"
          searchFunction={(s) => searchMusician(s)}
        />
      )}
      {searchError && <div>{searchError.message}</div>}
      {editMusicianResults.error && (
        <div>{editMusicianResults.error.message}</div>
      )}
      {editMusicianResults.data && (
        <div>
          <h2>Updated Musician: {searchData?.musician.name}</h2>
        </div>
      )}
      {searchData &&
        !editMusicianResults.data &&
        !editMusicianResults.fetching &&
        !editMusicianResults.error && (
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
