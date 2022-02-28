import React from 'react';
import Link from 'next/link';

import BrandIcon from './BrandIcon';
import styles from './styles.module.scss';

interface Props {
  apple?: string | null;
  bandcamp?: string | null;
  soundcloud?: string | null;
  spotify?: string | null;
  youtube?: string | null;
}

const ExternalLinks = ({
  apple,
  bandcamp,
  soundcloud,
  spotify,
  youtube,
}: Props) => {
  return (
    <div className={styles.links}>
      {apple && (
        <Link href={apple}>
          <a
            title="Apple Music Link"
            rel="external"
            aria-label="External Apple Link"
          >
            <BrandIcon src="apple.svg" brand="Apple" />
            Apple&nbsp;Music
          </a>
        </Link>
      )}
      {bandcamp && (
        <Link href={bandcamp}>
          <a
            title="Bandcamp Link"
            rel="external"
            aria-label="External Bandcamp Link"
          >
            <BrandIcon src="bandcamp.png" brand="Bandcamp" />
            Bandcamp
          </a>
        </Link>
      )}
      {soundcloud && (
        <Link href={soundcloud}>
          <a
            title="SoundCloud Link"
            rel="external"
            aria-label="External SoundCloud Link"
          >
            <BrandIcon src="soundcloud.png" brand="SoundCloud" />
            SoundCloud
          </a>
        </Link>
      )}
      {spotify && (
        <Link href={spotify}>
          <a
            title="Spotify Link"
            rel="external"
            aria-label="External Spotify Link"
          >
            <BrandIcon src="spotify.png" brand="Spotify" />
            Spotify
          </a>
        </Link>
      )}
      {youtube && (
        <Link href={youtube}>
          <a
            title="YouTube Link"
            rel="external"
            aria-label="External YouTube Link"
          >
            <BrandIcon src="youtube.png" height={22.5} brand="YouTube" />
            YouTube
          </a>
        </Link>
      )}
    </div>
  );
};

export default ExternalLinks;
