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
        <ul className={styles.info}>
          <li>
            <address>{`${city?.name}, ${city?.province}`}</address>
          </li>
          <li>{capitalCaseType}</li>
          <li>
            <time>Latest Release: {release}</time>
          </li>
        </ul>
      </a>
    </Link>
  );
};

export default MusicianCard;
