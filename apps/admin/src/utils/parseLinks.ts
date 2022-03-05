export const parseNullableStringField = (
  isDirty: boolean,
  field: string | undefined
) => {
  if (isDirty) return field ? field.trim() : null;

  return undefined;
};

export const parseNullableDateField = (
  isDirty: boolean,
  field: string | undefined
) => {
  if (isDirty)
    return field
      ? new Date(field).toLocaleDateString('en-ca', {
          timeZone: 'UTC',
        })
      : null;

  return undefined;
};
