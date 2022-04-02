const musicSSRValidator = (
  genreParam: string | string[] | undefined,
  pageQuery: string | string[] | undefined
) => {
  if (
    typeof genreParam !== 'string' ||
    ![
      'all',
      'country',
      'electronic',
      'experimental',
      'folk',
      'jazz',
      'metal',
      'pop',
      'rap',
      'rock',
    ].includes(genreParam)
  ) {
    return false;
  }

  if (Array.isArray(pageQuery) || (pageQuery && Number.isNaN(pageQuery))) {
    return false;
  }

  return true;
};

export default musicSSRValidator;
