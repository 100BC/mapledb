import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { MusicType } from '@mooseical/schema';
import useCreateImageUrl from '@mooseical/shared/hooks/useCreateImageUrl';
import useDateParser from '@utils/hooks/useDateParser';
import useMusicianDescParser from '@utils/hooks/useMusicianDescParser';
import MusicianLinkList from '@components/MusicianLinkList';
import useMusicTypeParser from '@utils/hooks/useMusicTypeParser';
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
  const date = useDateParser(release);
  const imgDesc = useMusicianDescParser(musicians, nonCanadians);

  const { capitalCase: capitalCaseType, lowerCase: lowerCaseType } =
    useMusicTypeParser(musicType);

  return (
    <div className={styles.musicCard}>
      <Link href={`/music/m/${id}`}>
        <a title={`${capitalCaseType}: ${name}`}>
          <Image
            src={imageUrl ?? '/images/missing.png'}
            alt={`${capitalCaseType}: ${name}${
              musicians ? ` by ${imgDesc}` : ''
            }`}
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
      {musicians && (
        <MusicianLinkList
          musicians={musicians}
          nonCanadians={nonCanadians}
          className={styles.musicianName}
          shouldConcat
        />
      )}
      <ul className={styles.desc}>
        <li className={styles.genre}>
          {instrumental && 'instrumental '}
          {subgenre?.name} {showMusicType && <>{lowerCaseType}</>}
        </li>
        <li className={styles.time}>
          <time>{date}</time>
        </li>
      </ul>
    </div>
  );
};

export default MusicCard;
