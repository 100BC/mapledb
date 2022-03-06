import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MusicType } from '@mooseical/schema/types';
import { conditional } from '@mooseical/style-helpers';
import styles from './styles.module.scss';

interface Props {
  musicTypes: (MusicType.Album | MusicType.Ep | MusicType.Single)[] | null;
}

const MusicTypeFilter = ({ musicTypes }: Props) => {
  const router = useRouter();
  const hasAlbum = !!musicTypes?.includes(MusicType.Album);
  const hasEp = !!musicTypes?.includes(MusicType.Ep);
  const hasSingle = !!musicTypes?.includes(MusicType.Single);

  const handleUrl = useCallback(
    (toggle: MusicType.Album | MusicType.Ep | MusicType.Single) => {
      if (!musicTypes) {
        return `?type=${toggle}`;
      }
      const queryExists = musicTypes.includes(toggle);

      if (queryExists) {
        if (musicTypes.length === 1) return '';

        return `?type=${musicTypes.filter((val) => val !== toggle).join(',')}`;
      }

      return `?type=${[...musicTypes, toggle].join(',')}`;
    },
    [musicTypes]
  );

  return (
    <div className={styles.buttonRow}>
      <Link href={`/music/${router.query.genre}${handleUrl(MusicType.Album)}`}>
        <a className={conditional(hasAlbum, styles.active, styles.inactive)}>
          Albums
        </a>
      </Link>
      <Link href={`/music/${router.query.genre}${handleUrl(MusicType.Ep)}`}>
        <a className={conditional(hasEp, styles.active, styles.inactive)}>
          EPs
        </a>
      </Link>
      <Link href={`/music/${router.query.genre}${handleUrl(MusicType.Single)}`}>
        <a className={conditional(hasSingle, styles.active, styles.inactive)}>
          Singles
        </a>
      </Link>
    </div>
  );
};

export default MusicTypeFilter;
