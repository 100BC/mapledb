import { useMemo } from 'react';

import { Province } from '@mapledb/schema/types';

const useParseProvince = (province: Province | null) => {
  const provinceParsed = useMemo(() => {
    switch (province) {
      case null:
        return { name: 'Canada', demonym: 'Canadian' };
      case 'AB':
        return { name: 'Alberta', demonym: 'Albertan' };
      case 'BC':
        return { name: 'British Columbia', demonym: 'British Columbian' };
      case 'MB':
        return { name: 'Manitoba', demonym: 'Manitoban' };
      case 'NB':
        return { name: 'New Brunswick', demonym: 'New Brunswicker' };
      case 'NL':
        return {
          name: 'Newfoundland and Labrador',
          demonym: 'Newfoundlander & Labradorian',
        };
      case 'NS':
        return { name: 'Nova Scotia', demonym: 'Nova Scotian' };
      case 'NT':
        return {
          name: 'Northwest Territories',
          demonym: 'Northwest Territorian',
        };
      case 'NU':
        return { name: 'Nunavut', demonym: 'Nunavummiuq' };
      case 'ON':
        return { name: 'Ontario', demonym: 'Ontarian' };
      case 'PE':
        return {
          name: 'Prince Edward Island',
          demonym: 'Prince Edward Islander',
        };
      case 'QC':
        return { name: 'Québec', demonym: 'Québécois' };
      case 'SK':
        return { name: 'Saskatchewan', demonym: 'Saskatchewanian' };
      case 'YT':
        return { name: 'Yukon', demonym: 'Yukoner' };
      default:
        return { name: 'Canada', demonym: 'Canadian' };
    }
  }, [province]);

  return provinceParsed;
};

export default useParseProvince;
