import { Province } from '@mooseical/schema/types';

const getProvinceName = (province: Province | null) => {
  switch (province) {
    case null:
      return 'Canada';
    case 'AB':
      return 'Alberta';
    case 'BC':
      return 'British Columbia';
    case 'MB':
      return 'Manitoba';
    case 'NB':
      return 'New Brunswick';
    case 'NL':
      return 'Newfoundland and Labrador';
    case 'NS':
      return 'Nova Scotia';
    case 'NT':
      return 'Northwest Territories';
    case 'NU':
      return 'Nunavut';
    case 'ON':
      return 'Ontario';
    case 'PE':
      return 'Prince Edward Island';
    case 'QC':
      return 'Québec';
    case 'SK':
      return 'Saskatchewan';
    case 'YT':
      return 'Yukon';
    default:
      return 'Canada';
  }
};

export default getProvinceName;
