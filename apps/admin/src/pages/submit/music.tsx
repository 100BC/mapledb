import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import { useAddMusicMutation } from '@graphql/hooks';
import Spinner from '@mapledb/shared/components/Spinner';
import Environment from '@components/Environment';
import MusicFormGeneric, {
  MusicFormProps,
} from '@components/FormGenerics/Music';
import styles from '@styles/forms.module.scss';

const SubmitMusic = () => {
  const router = useRouter();
  const defaultMusicianId = useMemo(() => router.query.id, [router.query]);
  const [addMusicResults, addMusic] = useAddMusicMutation();
  const [uploaded, setUploaded] = useState(false);
  const methods = useForm<MusicFormProps>({
    defaultValues: {
      musicianId: Array.isArray(defaultMusicianId)
        ? undefined
        : [defaultMusicianId],
    },
  });

  useEffect(() => {
    if (addMusicResults.data) setUploaded(true);
  }, [addMusicResults.data]);

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
      spotifyLink: data.links.spotify?.trim() || null,
      youtubeLink: data.links.youtube?.trim() || null,
      nonCanadians: data.nonCanadians.filter((i) => i), // remove empty strings
      copyright: data.copyright || null,
    };

    await addMusic(payload);
  };

  const resetFields = () => {
    setUploaded(false);
    methods.reset();
  };

  return (
    <Layout noIndex>
      <h1>Submit Music</h1>
      <hr />
      <Environment />
      {addMusicResults.fetching && <Spinner />}
      {addMusicResults.error && (
        <div className={styles.marginTop}>{addMusicResults.error.message}</div>
      )}
      {uploaded && (
        <div className={styles.submittedBlock}>
          <h2>Submitted {addMusicResults.data?.musicAdd.name}</h2>

          <button
            type="button"
            onClick={resetFields}
            aria-label="reset form"
            className={styles.marginTop}
          >
            Submit more music{defaultMusicianId && ' to the same musician'}?
          </button>
        </div>
      )}
      {!uploaded && !addMusicResults.fetching && (
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
