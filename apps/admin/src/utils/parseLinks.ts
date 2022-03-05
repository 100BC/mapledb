export const parseNullableStringField = (field: string | undefined) => {
  return field ? field.trim() : null;
};

export const parseNullableDateField = (field: string | undefined) => {
  return field
    ? new Date(field).toLocaleDateString('en-ca', {
        timeZone: 'UTC',
      })
    : null;
};
