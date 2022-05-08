import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { MusicType } from '@mapledb/schema/types';

import useParseDate from '@utils/hooks/useParseDate';
import useCreateImageUrl from '@utils/hooks/useCreateImageUrl';
import useCreateMusicianDesc from '@utils/hooks/useCreateMusicianDesc';
import useParseMusicType from '@utils/hooks/useParseMusicType';
import useParseSubgenre from '@utils/hooks/useParseSubgenre';
import MusicianLinkList from '@components/MusicianLinkList';

import styles from './styles.module.scss';

interface Props {
  id: string;
  name: string;
  hasCover: boolean;
  release: string;
  subgenre: { name: string };
  musicians?: { id: string; name: string }[];
  nonCanadians?: string[];
  musicType: MusicType;
  instrumental: boolean;
  showMusicType?: boolean;
  imagePriority?: boolean;
}

const MusicCard = ({
  id,
  name,
  hasCover,
  release,
  subgenre,
  musicians,
  nonCanadians,
  musicType,
  instrumental,
  showMusicType = false,
  imagePriority = false,
}: Props) => {
  const { imageUrl, blurryImageUrl, loader, placeholder } = useCreateImageUrl({
    musicId: id,
    hasCover,
    maxWidth: 285,
  });
  const date = useParseDate(release);
  const imgDesc = useCreateMusicianDesc(musicians, nonCanadians);
  const subgenreParsed = useParseSubgenre(subgenre.name);
  const { capitalCase: capitalCaseType } = useParseMusicType(musicType);
  const desc = useMemo(
    () => `${capitalCaseType}: ${name}${musicians ? ` by ${imgDesc}` : ''}`,
    [capitalCaseType, imgDesc, musicians, name]
  );

  return (
    <div>
      <Link href={`/music/m/${id}`}>
        <a title={desc}>
          <Image
            src={imageUrl ?? '/images/missing.png'}
            alt={desc}
            layout="intrinsic"
            width={285}
            height={285}
            placeholder={placeholder}
            blurDataURL={blurryImageUrl}
            loader={loader}
            priority={imagePriority}
          />
          <h2 className={styles.musicName}>{name}</h2>
        </a>
      </Link>
      <MusicianLinkList
        musicians={musicians}
        nonCanadians={nonCanadians}
        shouldConcat
      />
      <ul className={styles.desc}>
        <li>
          {instrumental && 'Instrumental '}
          {subgenreParsed} {showMusicType && <>{capitalCaseType}</>}
        </li>
        <li>
          <time>{date}</time>
        </li>
      </ul>
    </div>
  );
};

export default MusicCard;
