import faker from 'faker';

const createNonCanadians = () => {
  const nonCads: string[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
    nonCads.push(faker.name.findName());
  }

  return nonCads;
};

export default createNonCanadians;
