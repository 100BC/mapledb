import React, { useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { Genre, MusicType } from '@mooseical/schema/types';
import { AllOrNone } from '@mooseical/generics';
import {
  Checkbox,
  FormError,
  ImageInput,
  Select,
  TextInput,
} from '@mooseical/shared/components/FormComponents';
import validateLinks from '@utils/validateLinks';
import Button from '@mooseical/shared/components/Button';

type Props = AllOrNone<{
  isEditing: true;
  musiciansLen: number;
  nonCadLen: number;
  hasCover: boolean;
  musicId: string;
}>;

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
    spotify?: string;
    youtube?: string;
  };
  deleteCover?: boolean;
}

const baseCloudinaryUrl = 'https://res.cloudinary.com/mooseical/image/upload';
const urlPrepend =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'development' : 'music';

const MusicFormGeneric = ({
  isEditing,
  musiciansLen = 1,
  nonCadLen = 1,
  hasCover,
  musicId,
}: Props) => {
  const imgUrl = hasCover
    ? `${baseCloudinaryUrl}/c_limit,q_auto,w_400,f_auto/${urlPrepend}/${musicId}`
    : null;
  const [numMusicians, setNumMusicians] = useState(musiciansLen);
  const [nonCanadians, setNonCanadians] = useState(Math.max(nonCadLen, 1));
  const [image, setImage] = useState<string | null>(imgUrl);
  const {
    register,
    unregister,
    formState: { errors },
    getValues,
  } = useFormContext<MusicFormProps>();

  return (
    <>
      <TextInput
        id="name"
        {...register('name', { required: true })}
        label="Music Name *"
        disabled={isEditing}
      />
      <FormError error={errors.name} />

      {Array.from({ length: numMusicians }, (_, i) => (
        <TextInput
          id={`musicianId.${i}`}
          {...register(`musicianId.${i}`, { required: true })}
          label="Musician Id *"
          key={i}
          disabled={isEditing}
        />
      ))}
      {!isEditing && (
        <>
          <button type="button" onClick={() => setNumMusicians((n) => n + 1)}>
            Add more Musicians
          </button>
          {numMusicians > 1 && (
            <button
              type="button"
              onClick={() => {
                unregister(`musicianId.${numMusicians - 1}`);
                setNumMusicians((n) => n - 1);
              }}
            >
              Remove Musician
            </button>
          )}
        </>
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
        Add more nonCanadians
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
        <option value="DELUXE">Deluxe</option>
        <option value="REMIX">Remix</option>
        <option value="COMPILATION">COMPILATION</option>
        <option value="OTHER">Other</option>
      </Select>
      <FormError error={errors.musicType} />

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

      <TextInput id="label" {...register('copyright')} label="Copyright" />

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
      {isEditing && (
        <Checkbox
          id="deleteCover"
          {...register('deleteCover')}
          label="Delete Cover"
        />
      )}

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

      {/* <TextInput
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
      /> */}

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

      <Button type="submit" style={{ marginTop: '4rem' }}>
        Submit
      </Button>
    </>
  );
};

export default MusicFormGeneric;
