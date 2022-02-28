const musicianSSRValidator = (
  provinceParam: string | string[] | undefined,
  pageQuery: string | string[] | undefined
) => {
  if (
    typeof provinceParam !== 'string' ||
    ![
      'all',
      'ab',
      'bc',
      'mb',
      'nb',
      'nl',
      'ns',
      'nt',
      'nu',
      'on',
      'pe',
      'qc',
      'sk',
      'yt',
    ].includes(provinceParam)
  ) {
    return false;
  }

  if (Array.isArray(pageQuery) || (pageQuery && Number.isNaN(pageQuery))) {
    return false;
  }

  return true;
};

export default musicianSSRValidator;
