import React, { useState } from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import { Genre, MusicType } from '@mooseical/schema';
import { useAddMusicMutation } from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import MusicSubmitted from '@components/MusicSubmitted';
import Environment from '@components/Environment';
import validateLinks from '@utils/validateLinks';
import {
  FormError,
  Checkbox,
  TextInput,
  Select,
  ImageInput,
} from '@mooseical/shared/components/FormComponents';
import Button from '@mooseical/shared/components/Button';
import MusicFormGeneric from '@components/FormGenerics/Music';

interface Form {
  musicianId: string[];
  name: string;
  release: string;
  subgenre: string;
  genre: Genre;
  instrumental: boolean;
  musicType: MusicType;
  cover: FileList;
  nonCanadians: string[];
  copyright?: string;
  links: {
    apple?: string;
    bandcamp?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
}

const SubmitMusic = () => {
  const [results, addMusic] = useAddMusicMutation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<Form>();

  const onSubmit = async (data: Form) => {
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
