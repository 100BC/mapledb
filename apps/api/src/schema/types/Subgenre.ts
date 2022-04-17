import { Subgenre } from '@prisma/client';
import builder from '@schema/builder';

import { GenreEnum } from './Enums';

export const SubgenreObject = builder.objectRef<Subgenre>('Subgenre');

SubgenreObject.implement({
  description: 'Subgenres of musical works on the site',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    genre: t.expose('genre', { type: GenreEnum }),
  }),
});
