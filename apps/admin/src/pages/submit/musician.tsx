import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@components/Layout';
import { useAddMusicianMutation } from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import MusicianSubmitted from '@components/MusicianSubmitted';
import Environment from '@components/Environment';
import MusicianFormGeneric, {
  MusicianFormProps,
} from '@components/FormGenerics/Musician';

const MusicianSubmit = () => {
  const [results, addMusician] = useAddMusicianMutation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<MusicianFormProps>();

  const onSubmit = async (data: MusicianFormProps) => {
    const payload = {
      name: data.musician.trim(),
      city: data.city.trim(),
      province: data.province,
      appleLink: data.links.apple ? data.links.apple.trim() : null,
      bandcampLink: data.links.bandcamp ? data.links.bandcamp.trim() : null,
      soundcloudLink: data.links.soundcloud
        ? data.links.soundcloud.trim()
        : null,
      spotifyLink: data.links.spotify ? data.links.spotify.trim() : null,
      youtubeLink: data.links.youtube ? data.links.youtube.trim() : null,
      isGroup: data.isGroup,
      disbanded: data.disbanded
        ? new Date(data.disbanded).toLocaleDateString('en-ca', {
            timeZone: 'UTC',
          })
        : null,
    };
    setSubmitting(true);
    await addMusician(payload).then((result) => {
      if (result.error) {
        setErrorMessage(result.error.message);
      }
    });
  };

  const resetFields = (shouldReset: boolean) => {
    if (shouldReset) methods.reset();
    setErrorMessage(null);
    setSubmitting(false);
  };

  return (
    <Layout noIndex>
      <h1>Edit Musician</h1>
      <hr />
      <Environment />
      {submitting && (
        <>
          {errorMessage || results.data?.musicianAdd.name ? (
            <MusicianSubmitted
              error={errorMessage}
              musician={results.data?.musicianAdd.name}
              id={results.data?.musicianAdd.id}
              resetForm={(shouldReset) => resetFields(shouldReset)}
            />
          ) : (
            <Spinner />
          )}
        </>
      )}
      {!submitting && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <MusicianFormGeneric />
          </form>
        </FormProvider>
      )}
    </Layout>
  );
};

export default MusicianSubmit;
