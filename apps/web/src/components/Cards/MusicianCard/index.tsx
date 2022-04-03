import React, { useMemo } from 'react';
import Link from 'next/link';

import { MusicianCardFragment } from '@mooseical/schema/types/web';
import useDateParser from '@utils/hooks/useDateParser';
import { capitalCaseEnums } from '@utils/functions/stringFormatters';
import styles from './styles.module.scss';

const MusicianCard = (props: MusicianCardFragment) => {
  const { id, city, name, latestInfo } = props;
  const release = useDateParser(latestInfo?.latestRelease);
  const capitalCaseType = useMemo(
    () => capitalCaseEnums(latestInfo?.latestGenre || ''),
    [latestInfo?.latestGenre]
  );

  return (
    <Link href={`/musicians/m/${id}`}>
      <a className={styles.musicianCard} title={name}>
        <h2 className={styles.name}>{name}</h2>
        <address>{`${city?.name}, ${city?.province}`}</address>
        <ul className={styles.genres}>
          <li>{capitalCaseType}</li>
        </ul>
        <time>
          Latest Release: <i>{release}</i>
        </time>
      </a>
    </Link>
  );
};

export default MusicianCard;
