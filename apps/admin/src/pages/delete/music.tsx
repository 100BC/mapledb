import { useEffect, useState } from 'react';

import Spinner from '@mapledb/shared/components/Spinner';
import Button from '@mapledb/shared/components/Button';
import { SearchBar } from '@mapledb/shared/components/FormComponents';

import MainLayout from '@layouts/main';
import { useDeleteMusicMutation, useGetMusicNameQuery } from '@graphql/hooks';
import Environment from '@components/Environment';
import styles from '@styles/forms.module.scss';

const DeleteMusic = () => {
  const [deleteMusicResults, deleteMusic] = useDeleteMusicMutation();
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [musicId, setMusicId] = useState<string | null>(null);
  const [searchResults] = useGetMusicNameQuery({
    variables: { id: musicId! },
    pause: !musicId,
  });

  useEffect(() => {
    if (deleteMusicResults.fetching || searchResults.fetching) setLoading(true);
    else setLoading(false);
  }, [deleteMusicResults.fetching, searchResults.fetching]);

  useEffect(() => {
    if (deleteMusicResults.data) setDeleted(true);
  }, [deleteMusicResults.data]);

  const searchMusician = (searchQuery: string) => {
    setDeleted(false);
    setMusicId(searchQuery);
  };

  const handleDeleteMusician = async () => {
    await deleteMusic({ id: musicId! });
    setMusicId(null);
  };

  return (
    <MainLayout noIndex>
      <h1>Delete Music</h1>
      <hr />
      <Environment />
      <div className={styles.marginTop}>
        {loading ? (
          <Spinner />
        ) : (
          <SearchBar
            placeholder="Find Music by id"
            id="music-search"
            searchFunction={(s) => searchMusician(s)}
          />
        )}
      </div>
      {searchResults.error && <div>{searchResults.error.message}</div>}
      {deleteMusicResults.error && (
        <div className={styles.marginTop}>
          {deleteMusicResults.error.message}
        </div>
      )}

      {searchResults.data?.music && (
        <div className={styles.extraMarginTop}>
          {deleted && (
            <h2>Deleted {deleteMusicResults.data?.musicDelete.name}</h2>
          )}
          {!deleted && !loading && (
            <>
              <h2>
                Delete <b>{searchResults.data.music.name}</b> by{' '}
                <b>
                  {searchResults.data.music.musicians.map((musician, i) => {
                    if (i === 0) return ` ${musician.name}`;
                    return `& ${musician.name}`;
                  })}
                </b>
                ?
              </h2>
              <Button
                className={styles.marginTop}
                type="button"
                onClick={handleDeleteMusician}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default DeleteMusic;
