import React, { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import {
  Genre,
  GetMusicQuery,
  MusicType,
  EditMusicMutationVariables,
} from '@graphql/schema';
import validateLinks from '@utils/validateLinks';
import {
  Checkbox,
  FormError,
  ImageInput,
  Select,
  TextInput,
} from '@components/FormComponents';
import useCreateImageUrl from '@utils/hooks/useCreateImageUrl';
import Button from '@components/Button';

interface Props {
  musicData: GetMusicQuery['music'];
  onUpdateMusic: (arg0: EditMusicMutationVariables) => Promise<void>;
}

export interface Form {
  release: string;
  subgenre: string;
  genre: Genre;
  instrumental: boolean;
  musicType: MusicType;
  cover: FileList;
  deleteCover: boolean;
  nonCanadians: string[];
  copyright: string;
  links: {
    apple?: string;
    bandcamp?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
}

const UpdateMusicForm = ({ musicData, onUpdateMusic }: Props) => {
  const imageUrl = useCreateImageUrl({
    musicId: musicData.id,
    hasCover: musicData.hasCover,
  });

  const [nonCanadians, setNonCanadians] = useState(
    musicData.nonCanadians.length > 1 ? musicData.nonCanadians.length : 1
  );
  const [image, setImage] = useState<string | null>(imageUrl || null);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, dirtyFields },
    getValues,
  } = useForm<Form>({
    defaultValues: {
      links: {
        apple: musicData.appleLink || undefined,
        bandcamp: musicData.bandcampLink || undefined,
        soundcloud: musicData.soundcloudLink || undefined,
        spotify: musicData.spotifyLink || undefined,
        youtube: musicData.youtubeLink || undefined,
      },
      copyright: musicData.copyright || undefined,
      musicType: musicData.musicType,
      genre: musicData.subgenre?.genre,
      instrumental: musicData.instrumental,
      nonCanadians: musicData.nonCanadians as string[],
      release: musicData.release
        ? new Date(musicData.release).toLocaleDateString('en-ca', {
            timeZone: 'UTC',
          })
        : '',
      subgenre: musicData.subgenre.name,
      cover: undefined,
    },
  });

  const onSubmit = (data: Form) => {
    const dirty = dirtyFields;
    const appleLink = data.links.apple ? data.links.apple.trim() : null;
    const bandcampLink = data.links.bandcamp
      ? data.links.bandcamp.trim()
      : null;
    const soundcloudLink = data.links.soundcloud
      ? data.links.soundcloud.trim()
      : null;
    const spotifyLink = data.links.spotify ? data.links.spotify.trim() : null;
    const youtubeLink = data.links.youtube ? data.links.youtube.trim() : null;

    const payload = {
      id: musicData!.id,
      release: dirty.release ? data.release : undefined,
      subgenre: dirty.subgenre ? data.subgenre.trim().toLowerCase() : undefined,
      genre: dirty.genre ? data.genre : undefined,
      instrumental: dirty.instrumental ? data.instrumental : undefined,
      musicType: dirty.musicType ? data.musicType : undefined,
      cover: data.deleteCover ? null : data.cover[0],
      appleLink: dirty.links?.apple ? appleLink : undefined,
      bandcampLink: dirty.links?.bandcamp ? bandcampLink : undefined,
      soundcloudLink: dirty.links?.soundcloud ? soundcloudLink : undefined,
      spotifyLink: dirty.links?.spotify ? spotifyLink : undefined,
      youtubeLink: dirty.links?.youtube ? youtubeLink : undefined,
      nonCanadians: dirty.nonCanadians
        ? data.nonCanadians.filter((i) => i)
        : undefined, // remove empty strings
      copyright: dirty.copyright ? data.copyright : undefined,
    };

    onUpdateMusic(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <button
          type="button"
          onClick={() => {
            unregister(`nonCanadians.${nonCanadians - 1}`);
            setNonCanadians((n) => n - 1);
          }}
        >
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
        image={image}
        imageAlt="Album Cover"
        label="Album Cover"
      />
      <Checkbox
        id="deleteCover"
        {...register('deleteCover')}
        label="Delete Cover"
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
        Update
      </Button>
    </form>
  );
};

export default UpdateMusicForm;
