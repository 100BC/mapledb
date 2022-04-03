export const capitalCaseEnums = (string: string) => {
  return string[0] + string.toLowerCase().slice(1);
};

export const capitalCaseWord = (string: string) => {
  return (string[0] || '').toUpperCase() + string.slice(1);
};
