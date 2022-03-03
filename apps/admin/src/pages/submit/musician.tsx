import React, { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import Layout from '@components/Layout';
import { Province } from '@mooseical/schema';
import { useAddMusicianMutation } from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import MusicianSubmitted from '@components/MusicianSubmitted';
import Environment from '@components/Environment';
import validateLinks from '@utils/validateLinks';
import {
  FormError,
  TextInput,
  Checkbox,
  Select,
} from '@mooseical/shared/components/FormComponents';
import Button from '@mooseical/shared/components/Button';

interface Form {
  musician: string;
  city: string;
  province: Province;
  isGroup: boolean;
  disbanded?: string;
  links: {
    apple?: string;
    bandcamp?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
}

const MusicianSubmit = () => {
  const [results, addMusician] = useAddMusicianMutation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<Form>();

  const onSubmit = async (data: Form) => {
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
    if (shouldReset) reset();
    setErrorMessage(null);
    setSubmitting(false);
  };

  return (
    <Layout noIndex>
      <h1>Submit Musician</h1>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id="musician"
            {...register('musician', { required: true })}
            label="Musician *"
          />
          <FormError error={errors.musician} />

          <Checkbox
            id="isGroup"
            {...register('isGroup')}
            label="Musical Group?"
          />

          <TextInput
            id="city"
            {...register('city', { required: true })}
            label="City *"
          />
          <FormError error={errors.city} />

          <Select
            id="province"
            label="Province or Territory *"
            {...register('province', { required: true })}
          >
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NT">Northwest Territories</option>
            <option value="NS">Nova Scotia</option>
            <option value="NU">Nunavut</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="YT">Yukon</option>
          </Select>
          <FormError error={errors.province} />

          <TextInput
            id="links.apple"
            {...register('links.apple', {
              validate: { required: () => validateLinks(getValues('links')) },
              pattern:
                /((http:\/\/(music\.apple\.com\/.*))|(https:\/\/(music\.apple\.com\/.*)))/i,
            })}
            label="Apple Music"
          />
          <FormError
            error={errors.links?.apple?.type === 'pattern'}
            message="Malformed Apple Music URL"
          />

          <TextInput
            id="links.bandcamp"
            {...register('links.bandcamp', {
              validate: { required: () => validateLinks(getValues('links')) },
              pattern:
                /((http:\/\/(.*\.bandcamp\.com\/{0,1}|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*))|(https:\/\/(.*\.bandcamp\.com\/{0,1}|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*)))/i,
            })}
            label="Bandcamp"
          />
          <FormError
            error={errors.links?.bandcamp?.type === 'pattern'}
            message="Malformed Bandcamp URL"
          />

          <TextInput
            id="links.soundcloud"
            {...register('links.soundcloud', {
              validate: { required: () => validateLinks(getValues('links')) },
              pattern:
                /((http:\/\/(soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*))|(https:\/\/(soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*)))/i,
            })}
            label="SoundCloud"
          />
          <FormError
            error={errors.links?.soundcloud?.type === 'pattern'}
            message="Malformed Soundcloud URL"
          />

          <TextInput
            id="links.spotify"
            {...register('links.spotify', {
              validate: { required: () => validateLinks(getValues('links')) },
              pattern:
                /((http:\/\/(open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*))|(https:\/\/(open\.spotify\.com\/.*|play\.spotify\.com\/.*)))/i,
            })}
            label="Spotify"
          />
          <FormError
            error={errors.links?.spotify?.type === 'pattern'}
            message="Malformed Spotify Url"
          />

          <TextInput
            id="links.youtube"
            {...register('links.youtube', {
              validate: { required: () => validateLinks(getValues('links')) },
              pattern:
                /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/i,
            })}
            label="YouTube"
          />
          <FormError
            error={errors.links?.youtube?.type === 'pattern'}
            message="Malformed Youtube URL"
          />

          <FormError
            error={
              errors?.links &&
              Object.values(errors.links).some(
                (x) => (x as FieldError).type === 'required'
              )
            }
            message="At least one link is needed"
          />

          <TextInput
            id="disbanded"
            {...register('disbanded')}
            type="date"
            label="Disbanded?"
          />
          <FormError error={errors.disbanded} />

          <Button type="submit" style={{ marginTop: '4rem' }}>
            Submit
          </Button>
        </form>
      )}
    </Layout>
  );
};

export default MusicianSubmit;
