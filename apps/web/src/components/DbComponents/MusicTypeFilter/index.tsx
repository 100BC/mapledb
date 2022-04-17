import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MusicType } from '@mapledb/schema/types';
import { conditional } from '@mapledb/style-helpers';

import { capitalCaseEnums } from '@utils/functions/stringFormatters';

import styles from './styles.module.scss';

interface Props {
  musicTypes: MusicType[] | null;
}

const MusicTypeFilter = ({ musicTypes }: Props) => {
  const router = useRouter();
  const orderedMusicTypes = [
    MusicType.Album,
    MusicType.Ep,
    MusicType.Single,
    MusicType.Deluxe,
    MusicType.Compilation,
    MusicType.Remix,
    MusicType.Live,
    MusicType.Other,
  ];

  const handleUrl = useCallback(
    (toggle: MusicType) => {
      if (!musicTypes) return toggle;

      if (musicTypes.includes(toggle)) {
        return musicTypes.filter((type) => type !== toggle);
      }

      return [...musicTypes, toggle];
    },
    [musicTypes]
  );

  return (
    <div className={styles.buttonRow}>
      {Object.values(orderedMusicTypes).map((val) => (
        <Link
          href={{
            pathname: '/music/[genre]',
            query: {
              genre: router.query.genre,
              type: handleUrl(val),
            },
          }}
          key={val}
        >
          <a
            className={conditional(
              !!musicTypes?.includes(val),
              styles.active,
              styles.inactive
            )}
          >
            {val === MusicType.Ep ? 'EP' : capitalCaseEnums(val)}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MusicTypeFilter;
