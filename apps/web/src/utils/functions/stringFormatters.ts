export const capitalCaseEnums = (string: string | null | undefined) => {
  if (!string) return '';
  return string[0] + string.toLowerCase().slice(1);
};

export const capitalCaseWord = (string: string | null | undefined) => {
  if (!string) return '';
  return string[0]!.toUpperCase() + string.slice(1);
};
