import { logger } from '@server';

interface Props {
  apple: string | null | undefined;
  bandcamp: string | null | undefined;
  spotify: string | null | undefined;
  youtube: string | null | undefined;
  isUpdate?: boolean;
}

// Validate Links provided if not null
const linksValidator = ({
  apple,
  bandcamp,
  spotify,
  youtube,
  isUpdate = false,
}: Props) => {
  const allNull = [apple, bandcamp, spotify, youtube].every((link) => !link);
  if (allNull && !isUpdate) {
    logger.error('No Urls provided');
    throw new Error('At least one link must be provided');
  }

  const appleValid = apple
    ? /((http:\/\/(music\.apple\.com\/.*))|(https:\/\/(music\.apple\.com\/.*)))/i.test(
        apple
      )
    : true;

  const bandcampValid = bandcamp
    ? /((http:\/\/(.*\.bandcamp\.com\/|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*))|(https:\/\/(.*\.bandcamp\.com\/|.*\.bandcamp\.com\/track\/.*|.*\.bandcamp\.com\/album\/.*)))/i.test(
        bandcamp
      )
    : true;

  // const soundcloudValid = soundcloud
  //   ? /((http:\/\/(soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*))|(https:\/\/(soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*)))/i.test(
  //       soundcloud
  //     )
  //   : true;

  const spotifyValid = spotify
    ? /((http:\/\/(open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*))|(https:\/\/(open\.spotify\.com\/.*|play\.spotify\.com\/.*)))/i.test(
        spotify
      )
    : true;

  const youtubeValid = youtube
    ? /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/i.test(
        youtube
      )
    : true;

  const invalid = [appleValid, bandcampValid, spotifyValid, youtubeValid].some(
    (link) => !link
  );

  // no false elements
  if (invalid) {
    logger.error('Invalid Link Urls');
    throw new Error(
      `The following links are invalid:${appleValid ? '' : ' apple'}${
        bandcampValid ? '' : ' bandcamp'
      }${spotifyValid ? '' : ' spotify'}${youtubeValid ? '' : ' youtube'}`
    );
  }
};

export default linksValidator;
