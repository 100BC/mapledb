import { City } from '@prisma/client';
import builder from '@schema/builder';

import { ProvinceEnum } from './Enums';

export const CityObject = builder.objectRef<City>('City');

CityObject.implement({
  description: 'Cities of Canada',
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    province: t.expose('province', { type: ProvinceEnum }),
  }),
});
