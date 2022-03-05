const parseNullableField = <T>(field: T | null | undefined) => {
  return field || field === null ? field : undefined;
};

export default parseNullableField;
