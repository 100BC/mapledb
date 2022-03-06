import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@components/Layout';
import { useAddMusicMutation } from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import MusicSubmitted from '@components/MusicSubmitted';
import Environment from '@components/Environment';
import MusicFormGeneric, {
  MusicFormProps,
} from '@components/FormGenerics/Music';

const SubmitMusic = () => {
  const [results, addMusic] = useAddMusicMutation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<MusicFormProps>();

  const onSubmit = async (data: MusicFormProps) => {
    const payload = {
      name: data.name.trim(),
      musicianIds: data.musicianId.filter((i) => i), // remove empty strings
      release: new Date(data.release).toLocaleDateString('en-ca', {
        timeZone: 'UTC',
      }),
      subgenre: data.subgenre.trim().toLowerCase(),
      genre: data.genre,
      instrumental: data.instrumental,
      musicType: data.musicType,
      cover: data.cover[0] || null,
      appleLink: data.links.apple?.trim() || null,
      bandcampLink: data.links.bandcamp?.trim() || null,
      soundcloudLink: data.links.soundcloud?.trim() || null,
      spotifyLink: data.links.spotify?.trim() || null,
      youtubeLink: data.links.youtube?.trim() || null,
      nonCanadians: data.nonCanadians.filter((i) => i), // remove empty strings
      copyright: data.copyright || null,
    };

    setSubmitting(true);
    await addMusic(payload).then((result) => {
      if (result.error) {
        setErrorMessage(result.error.message);
      }
    });
  };

  const resetFields = (shouldReset: boolean) => {
    if (shouldReset) {
      // reset();
      // setImage(null);
    }
    // setNonCanadians(1);
    // setNumMusicians(1);
    setSubmitting(false);
    setErrorMessage(null);
  };

  return (
    <Layout noIndex>
      <h1>Submit a Music Work</h1>
      <hr />
      <Environment />
      {submitting && (
        <>
          {errorMessage || results.data?.musicAdd.name ? (
            <MusicSubmitted
              error={errorMessage}
              music={results.data?.musicAdd.name}
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
            <MusicFormGeneric />
          </form>
        </FormProvider>
      )}
    </Layout>
  );
};

export default SubmitMusic;
