import builder from '@schema/builder';

export const ProvinceEnum = builder.enumType('Province', {
  description: 'Provinces and Territories of Canada',
  values: [
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT',
  ] as const,
});

export const GenreEnum = builder.enumType('Genre', {
  description: 'Base level genres',
  values: [
    'COUNTRY',
    'ELECTRONIC',
    'EXPERIMENTAL',
    'FOLK',
    'JAZZ',
    'METAL',
    'POP',
    'RAP',
    'ROCK',
  ] as const,
});

export const MusicTypeEnum = builder.enumType('MusicType', {
  description: 'Type of Music Release',
  values: [
    'ALBUM',
    'EP',
    'SINGLE',
    'LIVE',
    'OTHER',
    'DELUXE',
    'REMIX',
    'COMPILATION',
  ] as const,
});

export const OrderByArgumentEnum = builder.enumType('OrderByArgument', {
  description: 'Argument values for ordering',
  values: ['DATE_ADDED', 'RELEASE'] as const,
});
