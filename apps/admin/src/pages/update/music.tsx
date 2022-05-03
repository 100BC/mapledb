import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchBar } from '@mapledb/shared/components/FormComponents';
import Spinner from '@mapledb/shared/components/Spinner';

import MainLayout from '@layouts/main';
import { useGetMusicQuery, useEditMusicMutation } from '@graphql/hooks';
import Environment from '@components/Environment';
import MusicFormGeneric, {
  MusicFormProps,
} from '@components/FormGenerics/Music';
import styles from '@styles/forms.module.scss';
import setValues from '@utils/setValues';
import { parseNullableStringField } from '@utils/parseNullableFields';

const UpdateMusic = () => {
  const [editMusicResults, updateMusic] = useEditMusicMutation();
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [musicId, setMusicId] = useState('');
  const [searchResults] = useGetMusicQuery({
    variables: { id: musicId },
    pause: !musicId,
  });
  const methods = useForm<MusicFormProps>();
  const {
    setValue,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    if (editMusicResults.fetching || searchResults.fetching) setLoading(true);
    else setLoading(false);
  }, [editMusicResults.fetching, searchResults.fetching]);

  useEffect(() => {
    if (editMusicResults.data) setUploaded(true);
  }, [editMusicResults.data]);

  useEffect(() => {
    if (searchResults.data?.music) {
      const data = searchResults.data.music;
      setValues(setValue, {
        name: data.name,
        instrumental: data.instrumental,
        musicianId: [...data.musicians],
        musicType: data.musicType,
        release: data.release,
        copyright: data.copyright,
        subgenre: data.subgenre.name,
        nonCanadians: data.nonCanadians,
        genre: data.subgenre.genre,
        'links.apple': data.appleLink,
        'links.bandcamp': data.bandcampLink,
        'links.spotify': data.spotifyLink,
        'links.youtube': data.youtubeLink,
      });

      data.musicians.forEach((musician, i) =>
        setValue(`musicianId.${i}`, musician.id, { shouldDirty: false })
      );

      data.nonCanadians.forEach((nonCanadian, i) =>
        setValue(`nonCanadians.${i}`, nonCanadian, { shouldDirty: false })
      );
    }
  }, [searchResults.data?.music, setValue]);

  const onSubmit = async (data: MusicFormProps) => {
    const payload = {
      id: musicId,
      release: dirtyFields.release ? data.release : undefined,
      subgenre: dirtyFields.subgenre
        ? data.subgenre.trim().toLowerCase()
        : undefined,
      genre: dirtyFields.genre ? data.genre : undefined,
      instrumental: dirtyFields.instrumental ? data.instrumental : undefined,
      musicType: dirtyFields.musicType ? data.musicType : undefined,
      cover: data.deleteCover ? null : data.cover[0],
      nonCanadians: dirtyFields.nonCanadians
        ? data.nonCanadians.filter((i) => i) // remove empty strings
        : undefined,
      copyright: parseNullableStringField(
        !!dirtyFields.copyright,
        data.copyright
      ),
      appleLink: parseNullableStringField(
        !!dirtyFields.links?.apple,
        data.links.apple
      ),
      bandcampLink: parseNullableStringField(
        !!dirtyFields.links?.bandcamp,
        data.links.bandcamp
      ),
      spotifyLink: parseNullableStringField(
        !!dirtyFields.links?.spotify,
        data.links.spotify
      ),
      youtubeLink: parseNullableStringField(
        !!dirtyFields.links?.youtube,
        data.links.youtube
      ),
    };

    await updateMusic(payload);
  };

  const searchMusic = (searchQuery: string) => {
    setUploaded(false);
    setMusicId(searchQuery);
  };

  return (
    <MainLayout noIndex>
      <h1>Update Music</h1>
      <hr />
      <Environment />
      <div className={styles.marginTop}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <SearchBar
              placeholder="Find Music by id"
              id="music-search"
              searchFunction={(s) => searchMusic(s)}
            />
            {searchResults.error && <div>{searchResults.error.message}</div>}
          </>
        )}
      </div>
      {editMusicResults.error && (
        <div className={styles.marginTop}>{editMusicResults.error.message}</div>
      )}
      {uploaded && (
        <h2 className={styles.extraMarginTop}>
          Updated Music: <b>{editMusicResults.data?.musicEdit.name}</b>
        </h2>
      )}
      {!uploaded && !loading && searchResults.data && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <MusicFormGeneric
              isEditing
              musiciansLen={searchResults.data.music.musicians.length}
              nonCadLen={searchResults.data.music.nonCanadians.length}
              hasCover={searchResults.data.music.hasCover}
              musicId={musicId}
            />
          </form>
        </FormProvider>
      )}
    </MainLayout>
  );
};

export default UpdateMusic;
