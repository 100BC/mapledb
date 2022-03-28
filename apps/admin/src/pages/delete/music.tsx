import React, { useEffect, useState } from 'react';

import Layout from '@components/Layout';
import { useDeleteMusicMutation, useGetMusicNameQuery } from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import Environment from '@components/Environment';
import Button from '@mooseical/shared/components/Button';
import styles from '@styles/forms.module.scss';
import { SearchBar } from '@mooseical/shared/components/FormComponents';

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
    <Layout noIndex>
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
    </Layout>
  );
};

export default DeleteMusic;
