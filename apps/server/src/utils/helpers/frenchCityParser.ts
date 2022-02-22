const frenchCityParser = (city: string | null | undefined) => {
  switch (city) {
    case 'Montreal':
      return 'Montréal';
    case 'Quebec City':
      return 'Québec City';
    default:
      return city;
  }
};

export default frenchCityParser;
