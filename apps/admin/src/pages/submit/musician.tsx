import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

import Spinner from '@mapledb/shared/components/Spinner';

import MainLayout from '@layouts/main';
import { useAddMusicianMutation } from '@graphql/hooks';
import Environment from '@components/Environment';
import MusicianFormGeneric, {
  MusicianFormProps,
} from '@components/FormGenerics/Musician';
import styles from '@styles/forms.module.scss';

const SubmitMusician = () => {
  const [uploaded, setUploaded] = useState(false);
  const [addMusicianResults, addMusician] = useAddMusicianMutation();
  const methods = useForm<MusicianFormProps>();

  useEffect(() => {
    if (addMusicianResults.data) setUploaded(true);
  }, [addMusicianResults.data]);

  const onSubmit = async (data: MusicianFormProps) => {
    const payload = {
      name: data.musician.trim(),
      city: data.city.trim(),
      province: data.province,
      appleLink: data.links.apple?.trim() || null,
      bandcampLink: data.links.bandcamp?.trim() || null,
      spotifyLink: data.links.spotify?.trim() || null,
      youtubeLink: data.links.youtube?.trim() || null,
      isGroup: data.isGroup,
      disbanded: data.disbanded
        ? new Date(data.disbanded).toLocaleDateString('en-ca', {
            timeZone: 'UTC',
          })
        : null,
    };
    await addMusician(payload);
  };

  const resetFields = () => {
    setUploaded(false);
    methods.reset();
  };

  return (
    <MainLayout noIndex>
      <h1>Submit Musician</h1>
      <hr />
      <Environment />
      {addMusicianResults.fetching && <Spinner />}
      {addMusicianResults.error && (
        <div className={styles.marginTop}>
          {addMusicianResults.error.message}
        </div>
      )}
      {uploaded && (
        <div className={styles.submittedBlock}>
          <h2>Submitted {addMusicianResults.data?.musicianAdd.name}</h2>
          <div className={styles.submittedButtons}>
            <button type="button" onClick={resetFields} aria-label="reset form">
              Submit another artist?
            </button>
            <Link
              href={`/submit/music?id=${addMusicianResults.data?.musicianAdd.id}`}
            >
              <a>Add music to {addMusicianResults.data?.musicianAdd.name}?</a>
            </Link>
          </div>
        </div>
      )}
      {!uploaded && !addMusicianResults.fetching && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <MusicianFormGeneric />
          </form>
        </FormProvider>
      )}
    </MainLayout>
  );
};

export default SubmitMusician;
