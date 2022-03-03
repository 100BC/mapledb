import React, { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
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
  const router = useRouter();
  const [results, addMusic] = useAddMusicMutation();
  const [submitting, setSubmitting] = useState(false);
  const [numMusicians, setNumMusicians] = useState(1);
  const [nonCanadians, setNonCanadians] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Form>();

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
      reset();
      setImage(null);
    }
    setNonCanadians(1);
    setNumMusicians(1);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {Array.from({ length: numMusicians }, (_, i) => (
            <TextInput
              id={`musicianId.${i}`}
              {...register(`musicianId.${i}`, { required: true })}
              defaultValue={i === 0 ? router.query.id : undefined}
              label={`MusicianId ${i + 1} *`}
              key={i}
            />
          ))}

          <button type="button" onClick={() => setNumMusicians((n) => n + 1)}>
            Add More MusicianId&apos;s
          </button>
          {numMusicians > 1 && (
            <button
              type="button"
              onClick={() => {
                unregister(`musicianId.${numMusicians - 1}`);
                setNumMusicians((n) => n - 1);
              }}
            >
              Remove a MusicianId
            </button>
          )}

          {Array.from({ length: nonCanadians }, (_, i) => (
            <TextInput
              id={`nonCanadians.${i}`}
              {...register(`nonCanadians.${i}`)}
              label="nonCanadian"
              key={i}
            />
          ))}

          <button type="button" onClick={() => setNonCanadians((n) => n + 1)}>
            Add More nonCanadians
          </button>
          {nonCanadians > 1 && (
            <button type="button" onClick={() => setNonCanadians((n) => n - 1)}>
              Remove a nonCanadian
            </button>
          )}

          <Select
            id="musicType"
            {...register('musicType', { required: true })}
            label="Music Type *"
          >
            <option value="ALBUM">Album</option>
            <option value="EP">EP</option>
            <option value="SINGLE">Single</option>
            <option value="LIVE">Live</option>
            <option value="OTHER">Other</option>
          </Select>
          <FormError error={errors.musicType} />

          <TextInput
            id="name"
            {...register('name', { required: true })}
            label="Music Name *"
          />
          <FormError error={errors.name} />

          <TextInput id="label" {...register('copyright')} label="Copyright" />

          <TextInput
            id="release"
            {...register('release', { required: true })}
            type="date"
            label="Release *"
          />
          <FormError error={errors.release} />

          <TextInput
            id="subgenre"
            {...register('subgenre', { required: true })}
            label="Subgenre *"
          />
          <FormError error={errors.subgenre} />

          <Checkbox
            id="instrumental"
            {...register('instrumental')}
            label="Instrumental?"
          />

          <Select
            id="genre"
            {...register('genre', { required: true })}
            label="Genre *"
          >
            <option value="COUNTRY">Country</option>
            <option value="ELECTRONIC">Electronic</option>
            <option value="EXPERIMENTAL">Experimental</option>
            <option value="FOLK">Folk</option>
            <option value="JAZZ">Jazz</option>
            <option value="POP">Pop</option>
            <option value="RAP">Rap</option>
            <option value="ROCK">Rock</option>
            <option value="METAL">Metal</option>
          </Select>
          <FormError error={errors.genre} />

          <ImageInput
            id="cover"
            {...register('cover')}
            onChange={(e) =>
              setImage(
                e.target.files ? URL.createObjectURL(e.target.files[0]!) : null
              )
            }
            label="Music Cover"
            image={image}
            imageAlt="Music Cover"
          />

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
            error={errors.links?.apple}
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
            error={errors.links?.bandcamp}
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
            error={errors.links?.soundcloud}
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
            error={errors.links?.spotify}
            message="Malformed Spotify URL"
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

          <Button type="submit" style={{ marginTop: '4rem' }}>
            Submit
          </Button>
        </form>
      )}
    </Layout>
  );
};

export default SubmitMusic;
