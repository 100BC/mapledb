import { Path, UseFormSetValue } from 'react-hook-form';

const setValues = <T extends object>(
  setValue: UseFormSetValue<T>,
  values: T | { [key: string]: any }
) => {
  Object.entries(values).forEach(([key, value]) => {
    setValue(key as Path<T>, value || undefined, { shouldDirty: false });
  });

  return null;
};

export default setValues;
