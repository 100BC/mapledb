import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FieldError, useFormContext } from 'react-hook-form';

import { Genre, MusicType } from '@mooseical/schema';
import {
  Checkbox,
  FormError,
  ImageInput,
  Select,
  TextInput,
} from '@mooseical/shared/components/FormComponents';
import validateLinks from '@utils/validateLinks';
import Button from '@mooseical/shared/components/Button';

interface Props {
  isEditing?: boolean;
}

export interface MusicFormProps {
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
const MusicFormGeneric = ({ isEditing = false }: Props) => {
  const router = useRouter();
  const [numMusicians, setNumMusicians] = useState(1);
  const [nonCanadians, setNonCanadians] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    unregister,
    formState: { errors },
    getValues,
  } = useFormContext<MusicFormProps>();

  return (
    <>
      {Array.from({ length: numMusicians }, (_, i) => (
        <TextInput
          id={`musicianId.${i}`}
          {...register(`musicianId.${i}`, { required: true })}
          defaultValue={i === 0 ? router.query.id : undefined}
          label={`MusicianId ${i + 1} *`}
          key={i}
          disabled={isEditing}
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
    </>
  );
};

export default MusicFormGeneric;
