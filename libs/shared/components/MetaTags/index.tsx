import Head from 'next/head';

import { AllOrNone } from '@mapledb/generics';

export type MetaTagProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  siteName?: string;
  ogpTitle?: string;
  ogpType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  noIndex?: boolean;
} & AllOrNone<{
  ogpImg: string | null | undefined;
  ogpImgAlt: string;
  ogpImgWidth: number;
  ogpImgHeight: number;
}>;

const MetaTags = ({
  title,
  description,
  siteName,
  canonicalUrl,
  ogpTitle, // if undefined, the og:title defaults to {title}
  ogpType = 'website', // see https://ogp.me/#types
  ogpImg, // if ogpImage is defined, alt, width and height must be defined
  ogpImgAlt,
  ogpImgWidth,
  ogpImgHeight,
  twitterCard = 'summary',
  twitterSite,
  twitterCreator,
  noIndex = false, // prevents the page from being scraped by robots
}: MetaTagProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    {noIndex && <meta name="robots" content="noindex" />}
    {/* Open Graph */}
    <meta property="og:type" content={ogpType} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:title" content={ogpTitle || title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    {/* Twitter */}
    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:title" content={ogpTitle || title} />
    <meta name="twitter:description" content={description} />
    {twitterSite && <meta name="twitter:site" content={twitterSite} />}
    {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
    {/* Image */}
    {ogpImg && (
      <>
        <meta property="og:image" content={ogpImg} />
        <meta property="og:image:alt" content={ogpImgAlt} />
        <meta property="og:image:width" content={ogpImgWidth!.toString()} />
        <meta property="og:image:height" content={ogpImgHeight!.toString()} />
        <meta name="twitter:image" content={ogpImg} />
        <meta name="twitter:image:alt" content={ogpImgAlt} />
      </>
    )}
  </Head>
);

export default MetaTags;
