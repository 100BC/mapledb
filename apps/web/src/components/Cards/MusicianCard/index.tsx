import React from 'react';
import Link from 'next/link';

import { MusicianCardFragment } from '@mooseical/schema/web';
import useDateParser from '@utils/hooks/useDateParser';
import styles from './styles.module.scss';

const MusicianCard = (props: MusicianCardFragment) => {
  const { id, city, name, latestInfo } = props;
  const release = useDateParser(latestInfo?.latestRelease);

  return (
    <Link href={`/musicians/m/${id}`}>
      <a className={styles.musicianCard} title={name}>
        <h2 className={styles.name}>{name}</h2>
        <address>{`${city?.name}, ${city?.province}`}</address>
        <ul className={styles.genres}>
          {latestInfo?.latestGenre && (
            <li>{latestInfo.latestGenre.toLowerCase()}</li>
          )}
        </ul>
        <time>
          Latest Release: <i>{release}</i>
        </time>
      </a>
    </Link>
  );
};

export default MusicianCard;
