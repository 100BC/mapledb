import React, { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import {
  TextInput,
  FormError,
  Select,
  FormWrapper,
  ReCaptcha,
} from '@mapledb/shared/components/FormComponents';
import Button from '@mapledb/shared/components/Button';

import { suggestMusician } from '@gcp/mutations/suggestMusician';
import Layout from '@components/Layout';

interface FormData {
  musician: string;
  city: string;
  province: string;
  links: {
    apple: string;
    bandcamp: string;
    spotify: string;
    youtube: string;
  };
}

const SuggestMusician = () => {
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const validateLinks = (links: FormData['links']) => {
    if (!Object.values(links).some((x) => x !== '')) {
      return false;
    }
    clearErrors('links');
    return true;
  };

  const onSubmit = async (data: FormData) => {
    const payload = {
      musician: data.musician,
      city: data.city,
      province: data.province,
      date: new Date().toString(),
      links: {
        ...(data.links.apple && { apple: data.links.apple.trim() }),
        ...(data.links.bandcamp && { bandcamp: data.links.bandcamp.trim() }),
        ...(data.links.spotify && { spotify: data.links.spotify.trim() }),
        ...(data.links.youtube && { youtube: data.links.youtube.trim() }),
      },
    };

    setSubmitting(true);
    await suggestMusician(payload, token || '')
      .then(() => {
        setSubmitMessage('Submitted!');
      })
      .catch((error: Error) => {
        setSubmitMessage(error.message);
      });

    setTimeout(() => {
      reset();
      setSubmitting(false);
      setToken(null);
      setSubmitMessage(null);
    }, 3000);
  };

  return (
    <Layout
      title="MapleDB | Suggest a Musician"
      description="Suggest a Canadian musician to be added to MapleDB's database."
      canonicalUrlPath="/suggest-musician"
    >
      <h1>Suggest a Musician</h1>
      <hr />
      <h2>The musician and their catalogue could be added to the database</h2>
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        submitMessage={submitMessage}
        submitting={submitting}
      >
        <h3>Required</h3>

        <TextInput
          id="musician"
          {...register('musician', { required: true })}
          label="Musician *"
        />
        <FormError error={errors.musician} />

        <TextInput
          id="city"
          {...register('city', { required: true })}
          label="City *"
        />
        <FormError error={errors.city} />

        <Select
          id="province"
          {...register('province', { required: true })}
          label="Province or Territory *"
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

        <h3>Minimum One</h3>
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
          message="Malformed Spotify URL"
        />

        <TextInput
          id="links.youtube"
          {...register('links.youtube', {
            validate: { required: () => validateLinks(getValues('links')) },
            pattern:
              /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/i,
          })}
          label="Youtube"
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

        <ReCaptcha setToken={(t) => setToken(t)} />
        <Button type="submit" disabled={!token}>
          Submit
        </Button>
      </FormWrapper>
    </Layout>
  );
};

export default SuggestMusician;
