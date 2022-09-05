import { useMemo } from 'react';
import Link from 'next/link';

import { MusicianCardFragment } from '@mapledb/schema/types/web';

import useParseDate from '@utils/hooks/useParseDate';
import { capitalCaseEnums } from '@utils/functions/stringFormatters';

import styles from './styles.module.scss';

const MusicianCard = (props: MusicianCardFragment) => {
  const { id, city, name, latestInfo } = props;
  const release = useParseDate(latestInfo?.latestRelease);
  const capitalCaseGenre = useMemo(
    () => capitalCaseEnums(latestInfo?.latestGenre || ''),
    [latestInfo?.latestGenre]
  );

  return (
    <Link href={`/musicians/m/${id}`}>
      <a className={styles.musicianCard} title={name}>
        <h2 className={styles.name}>{name}</h2>
        <ul className={styles.info}>
          <li>{capitalCaseGenre}</li>
          <li>
            <address>{`${city?.name}, ${city?.province}`}</address>
          </li>
          <li>
            <time>Latest Release: {release}</time>
          </li>
        </ul>
      </a>
    </Link>
  );
};

export default MusicianCard;
