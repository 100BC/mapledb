import { logger } from '@server';

import { PrismaClient } from '@prisma/client';

// Creates a collision resistant id
const idCreator = async (
  entry: string,
  db: PrismaClient['music' | 'musician']
) => {
  logger.info('Creating Id');
  let id = entry
    .trim() // removes trailing spaces
    .toLowerCase()
    .normalize('NFD') // normalizes text to standard alphabet (no accents)
    .replace(/[\u0300-\u036f]/g, '') // removes accents from the normalize
    .replace(/[ |/]/g, '-') // replaces spaces, / and | with a -
    .replace(/[^a-zA-Z0-9_-]/g, '') // removes anything that isn't alphanumeric - _
    .replace(/-{2,}/g, '-') // replaces 2 or more of - with a single one
    .replace(/-$|^-/g, ''); // removes trailing -

  // if not any, causes type error
  let collision = await (db as any).findUnique({ where: { id } });

  let i = 0;
  while (collision) {
    const newId = `${id}-${i}`;
    // eslint-disable-next-line no-await-in-loop
    collision = await (db as any).findUnique({ where: { id: newId } });
    if (!collision) {
      id = newId;
    }
    i += 1;
  }

  logger.info('Created Id');
  return id;
};

export default idCreator;
