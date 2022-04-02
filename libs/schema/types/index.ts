export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

/** Base level genres */
export enum Genre {
  Country = 'COUNTRY',
  Electronic = 'ELECTRONIC',
  Experimental = 'EXPERIMENTAL',
  Folk = 'FOLK',
  Jazz = 'JAZZ',
  Metal = 'METAL',
  Pop = 'POP',
  Rap = 'RAP',
  Rock = 'ROCK',
}

/** Type of Music Release */
export enum MusicType {
  Album = 'ALBUM',
  Deluxe = 'DELUXE',
  Ep = 'EP',
  Live = 'LIVE',
  Other = 'OTHER',
  Remix = 'REMIX',
  Single = 'SINGLE',
}

/** Argument values for ordering */
export enum OrderByArgument {
  DateAdded = 'DATE_ADDED',
  Release = 'RELEASE',
}

/** Provinces and Territories of Canada */
export enum Province {
  Ab = 'AB',
  Bc = 'BC',
  Mb = 'MB',
  Nb = 'NB',
  Nl = 'NL',
  Ns = 'NS',
  Nt = 'NT',
  Nu = 'NU',
  On = 'ON',
  Pe = 'PE',
  Qc = 'QC',
  Sk = 'SK',
  Yt = 'YT',
}
