import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '@components/Layout';
import { EditMusicMutationVariables } from '@mooseical/schema/admin';
import { useGetMusicQuery, useEditMusicMutation } from '@graphql/hooks';
import Environment from '@components/Environment';
import {
  FormError,
  TextInput,
} from '@mooseical/shared/components/FormComponents';
import Spinner from '@mooseical/shared/components/Spinner';
import UpdateMusicForm from '@components/UpdateMusicForm';
import MusicUpdated from '@components/MusicUpdated';
import Button from '@mooseical/shared/components/Button';

interface Form {
  id: string;
}

const UpdateMusic = () => {
  const [results, updateMusic] = useEditMusicMutation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [musicId, setMusicId] = useState('');
  const [{ data: musicData, fetching, error }] = useGetMusicQuery({
    variables: { id: musicId },
    pause: !musicId,
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  useEffect(() => {
    if (fetching) {
      setErrorMessage(null);
      setSubmitting(true);
    } else if (!fetching && !error) {
      setSubmitting(false);
    }

    if (error) {
      setSubmitting(true);
      setErrorMessage(error.message);
    }
  }, [error, fetching]);

  const onSubmit = async (data: Form) => {
    setMusicId(data.id);
  };

  const onUpdateMusic = async (payload: EditMusicMutationVariables) => {
    setSubmitting(true);
    await updateMusic(payload).then((result) => {
      if (result.error) {
        setErrorMessage(result.error.message);
      }
    });
  };

  const resetFields = (shouldReset: boolean) => {
    if (shouldReset) {
      reset();
      setMusicId('');
    }
    setSubmitting(false);
    setErrorMessage(null);
  };

  return (
    <Layout noIndex>
      <h1>Update Music</h1>
      <hr />
      <Environment />
      {submitting && (
        <>
          {errorMessage || (results.data && !fetching) ? (
            <MusicUpdated
              error={errorMessage}
              music={results.data?.musicEdit.name}
              resetForm={(shouldReset) => resetFields(shouldReset)}
            />
          ) : (
            <Spinner />
          )}
        </>
      )}
      {!submitting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <h2>Which musical work do you want to update?</h2>

          <TextInput
            id="id"
            {...register('id', { required: true })}
            label="Music Id"
          />
          <FormError error={errors.id} />

          <Button type="submit">Look up music</Button>
        </form>
      )}
      {!submitting && musicId && musicData?.music && (
        <UpdateMusicForm
          musicData={musicData.music}
          key={musicId}
          onUpdateMusic={(payload) => onUpdateMusic(payload)}
        />
      )}
    </Layout>
  );
};

export default UpdateMusic;
