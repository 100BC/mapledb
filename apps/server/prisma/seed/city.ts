import prisma from './prismaClient';

export const createCities = async () => {
  await prisma.city.createMany({
    data: cities,
  });
};

export const pickRandomCity = () => {
  return cities[Math.floor(Math.random() * cities.length)];
};

enum Province {
  AB = 'AB',
  BC = 'BC',
  MB = 'MB',
  NB = 'NB',
  NL = 'NL',
  NS = 'NS',
  NT = 'NT',
  NU = 'NU',
  ON = 'ON',
  PE = 'PE',
  QC = 'QC',
  SK = 'SK',
  YT = 'YT',
}

const cities = [
  {
    name: 'Edmonton',
    province: Province.AB,
  },
  {
    name: 'Calgary',
    province: Province.AB,
  },
  {
    name: 'Vancouver',
    province: Province.BC,
  },
  {
    name: 'Winnipeg',
    province: Province.MB,
  },
  {
    name: 'Fredericton',
    province: Province.NB,
  },
  {
    name: "St. John's",
    province: Province.NL,
  },
  {
    name: 'Yellow Knife',
    province: Province.NT,
  },
  {
    name: 'Halifax',
    province: Province.NS,
  },
  {
    name: 'Iqaluit',
    province: Province.NU,
  },
  {
    name: 'Toronto',
    province: Province.ON,
  },
  {
    name: 'Brampton',
    province: Province.ON,
  },
  {
    name: 'Ottawa',
    province: Province.ON,
  },
  {
    name: 'Charlottetown',
    province: Province.PE,
  },
  {
    name: 'Montreal',
    province: Province.QC,
  },
  {
    name: 'Regina',
    province: Province.SK,
  },
  {
    name: 'Whitehorse',
    province: Province.YT,
  },
];
