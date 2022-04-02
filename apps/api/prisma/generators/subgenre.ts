import prisma from './prismaClient';

const createSubgenres = async () => {
  await prisma.subgenre.createMany({
    data: subgenres,
  });
};

export default createSubgenres;

export const pickRandomGenre = () => {
  return subgenres[Math.floor(Math.random() * subgenres.length)]!;
};

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

export const subgenres = [
  {
    name: 'americana',
    genre: Genre.Country,
  },
  {
    name: 'gothic country',
    genre: Genre.Country,
  },
  {
    name: 'synth funk',
    genre: Genre.Electronic,
  },
  {
    name: 'nu jazz',
    genre: Genre.Electronic,
  },
  {
    name: 'electro-industrial',
    genre: Genre.Experimental,
  },
  {
    name: 'lo-fi rock',
    genre: Genre.Experimental,
  },
  {
    name: 'contemporary folk',
    genre: Genre.Folk,
  },
  {
    name: 'chamber folk',
    genre: Genre.Folk,
  },
  {
    name: 'jazz fusion',
    genre: Genre.Jazz,
  },
  {
    name: 'art pop',
    genre: Genre.Pop,
  },
  {
    name: 'synthpop',
    genre: Genre.Pop,
  },
  {
    name: 'psychedelic pop',
    genre: Genre.Pop,
  },
  {
    name: 'sophisti-pop',
    genre: Genre.Pop,
  },
  {
    name: 'bedroom pop',
    genre: Genre.Pop,
  },
  {
    name: 'rap rock',
    genre: Genre.Rap,
  },
  {
    name: 'hip hop',
    genre: Genre.Rap,
  },
  {
    name: 'industrial hip hop',
    genre: Genre.Rap,
  },
  {
    name: 'jazz rap',
    genre: Genre.Rap,
  },
  {
    name: 'art rock',
    genre: Genre.Rock,
  },
  {
    name: 'pop punk',
    genre: Genre.Rock,
  },
  {
    name: 'art punk',
    genre: Genre.Rock,
  },
  {
    name: 'indie rock',
    genre: Genre.Rock,
  },
  {
    name: 'dream pop',
    genre: Genre.Rock,
  },
];
