import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '@components/Layout';
import { useDeleteMusicMutation } from '@graphql/schema';
import Spinner from '@components/Spinner';
import Environment from '@components/Environment';
import { FormError, TextInput, SubmitButton } from '@components/FormComponents';
import MusicDeleted from '@components/MusicDeleted';

interface Form {
  id: string;
}

const DeleteMusic = () => {
  const [results, deleteMusic] = useDeleteMusicMutation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    const payload = {
      id: data.id,
    };

    setSubmitting(true);
    await deleteMusic(payload).then((result) => {
      if (result.error) {
        setErrorMessage(result.error.message);
      }
    });
  };

  const resetFields = (shouldReset: boolean) => {
    if (shouldReset) {
      reset();
    }
    setSubmitting(false);
    setErrorMessage(null);
  };

  return (
    <Layout noIndex>
      <h1>Delete a Musical Work</h1>
      <hr />
      <Environment />
      {submitting && (
        <>
          {errorMessage || results.data?.musicDelete.name ? (
            <MusicDeleted
              error={errorMessage}
              music={results.data?.musicDelete.name}
              resetForm={(shouldReset) => resetFields(shouldReset)}
            />
          ) : (
            <Spinner />
          )}
        </>
      )}
      {!submitting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id="id"
            {...register('id', { required: true })}
            label="Music Id"
          />
          <FormError error={errors.id} />

          <SubmitButton text="Delete" />
        </form>
      )}
    </Layout>
  );
};

export default DeleteMusic;
