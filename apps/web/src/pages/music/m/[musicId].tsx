import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { gqlClient, ssrCache } from '@graphql/gqlClient';
import { GetMusicDocument } from '@mooseical/schema/types/web';
import styles from '@styles/music.module.scss';
import ExternalLinks from '@components/ExternalLinks';
import MusicianLinkList from '@components/MusicianLinkList';
import Layout from '@components/Layout';
import setSSRCache from '@utils/setSSRCache';
import GqlContainer from '@components/GqlContainer';
import useCreateImageUrl from '@utils/hooks/useCreateImageUrl';
import useParseDate from '@utils/hooks/useParseDate';
import useCreateMusicianDesc from '@utils/hooks/useCreateMusicianDesc';
import useParseMusicType from '@utils/hooks/useParseMusicType';
import { useGetMusicQuery } from '@graphql/hooks';

interface Props {
  musicId: string;
}

const MusicDisplay = ({ musicId }: Props) => {
  const [{ data, fetching, error }] = useGetMusicQuery({
    variables: { id: musicId },
  });

  const {
    name,
    musicians,
    nonCanadians,
    appleLink,
    bandcampLink,
    spotifyLink,
    youtubeLink,
    hasCover,
    release,
    subgenre,
    instrumental,
    musicType,
    copyright,
  } = { ...data?.music };

  const { imageUrl, blurryImageUrl, loader, fullImageUrl, placeholder } =
    useCreateImageUrl({
      musicId,
      hasCover: hasCover ?? false,
      maxWidth: 400,
    });

  const musicianDesc = useCreateMusicianDesc(musicians, nonCanadians);
  const date = useParseDate(release);
  const musicTypeParsed = useParseMusicType(musicType);

  return (
    <Layout
      title={`Mooseical | ${name}`}
      ogpTitle={name}
      description={`View information on ${name}, ${musicTypeParsed.sentence} by ${musicianDesc} on Mooseical - Canadian Music Database`}
      canonicalUrlPath={`/music/m/${musicId}`}
      ogpImg={fullImageUrl}
      ogpImgAlt={`Cover art for ${name} by ${musicianDesc}`}
      ogpImgWidth={400}
      ogpImgHeight={400}
    >
      <GqlContainer
        fetching={fetching}
        error={error}
        errorComponent
        errorStatusCode={404}
      >
        {data && (
          <>
            <h1>{name}</h1>
            <hr />
            <ExternalLinks
              apple={appleLink}
              bandcamp={bandcampLink}
              spotify={spotifyLink}
              youtube={youtubeLink}
            />
            <div className={styles.img}>
              <Image
                src={imageUrl ?? '/images/missing.png'}
                alt={`${name}, ${musicTypeParsed.sentence} by ${musicianDesc}`}
                layout="intrinsic"
                width={400}
                height={400}
                placeholder={placeholder}
                blurDataURL={blurryImageUrl}
                loader={loader}
                priority
                quality={100}
              />
            </div>
            <h2 className={styles.musicians}>
              {musicTypeParsed.capitalCase}
              &nbsp;by&nbsp;
              <MusicianLinkList
                musicians={musicians}
                nonCanadians={nonCanadians}
              />
            </h2>
            <ul className={styles.details}>
              <li>
                <span>genre:</span>&nbsp;
                <span>
                  {instrumental && 'instrumental '}
                  {subgenre?.name}
                </span>
              </li>
              <li>
                <span>released: </span>
                <time>{date}</time>
              </li>
            </ul>
            {copyright && (
              <div className={styles.copyright}>&#169; {copyright}</div>
            )}
          </>
        )}
      </GqlContainer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
  setSSRCache(res, 14);

  const music = await gqlClient
    .query(GetMusicDocument, { id: String(params?.musicId) })
    .toPromise();

  return {
    props: {
      musicId: params?.musicId,
      urqlState: music.data ? ssrCache.extractData() : null,
    },
  };
};

export default MusicDisplay;
