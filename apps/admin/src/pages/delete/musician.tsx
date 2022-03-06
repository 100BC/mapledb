import React, { useEffect, useState } from 'react';

import Layout from '@components/Layout';
import {
  useDeleteMusicianMutation,
  useGetMusicianNameQuery,
} from '@graphql/hooks';
import Spinner from '@mooseical/shared/components/Spinner';
import Environment from '@components/Environment';
import { SearchBar } from '@mooseical/shared/components/FormComponents';
import Button from '@mooseical/shared/components/Button';
import styles from '@styles/forms.module.scss';

const DeleteMusician = () => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [musicianId, setMusicianId] = useState<string | null>(null);
  const [deleteMusicianResults, deleteMusician] = useDeleteMusicianMutation();
  const [searchResults] = useGetMusicianNameQuery({
    variables: { id: musicianId! },
    pause: !musicianId,
  });

  useEffect(() => {
    if (deleteMusicianResults.fetching || searchResults.fetching)
      setLoading(true);
    else setLoading(false);
  }, [deleteMusicianResults.fetching, searchResults.fetching]);

  useEffect(() => {
    if (deleteMusicianResults.data) setDeleted(true);
  }, [deleteMusicianResults.data]);

  const searchMusician = (searchQuery: string) => {
    setDeleted(false);
    setMusicianId(searchQuery);
  };

  const handleDeleteMusician = async () => {
    await deleteMusician({ id: musicianId! });
    setMusicianId(null);
  };

  return (
    <Layout>
      <h1>Delete Musician</h1>
      <hr />
      <Environment />
      <div className={styles.marginTop}>
        {loading ? (
          <Spinner />
        ) : (
          <SearchBar
            placeholder="Find Musician by id"
            id="music-search"
            searchFunction={(s) => searchMusician(s)}
          />
        )}
      </div>
      {searchResults.error && <div>{searchResults.error.message}</div>}
      {deleteMusicianResults.error && (
        <div className={styles.marginTop}>
          {deleteMusicianResults.error.message}
        </div>
      )}

      {searchResults.data?.musician && (
        <div className={styles.extraMarginTop}>
          {deleted ? (
            <h2>Deleted {deleteMusicianResults.data?.musicianDelete.name}</h2>
          ) : (
            <>
              <h2>
                Delete <b>{searchResults.data.musician.name}</b> and their
                music?
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

export default DeleteMusician;
