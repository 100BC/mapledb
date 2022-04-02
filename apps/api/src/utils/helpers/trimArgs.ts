/* eslint-disable no-param-reassign */
const trimArgs = <T extends object>(obj: T) => {
  Object.keys(obj).forEach((key) => {
    const value: any = obj[key as keyof typeof obj];

    if (typeof value === 'string') {
      (obj[key as keyof typeof obj] as any) = value.trim();
    } else if (Array.isArray(value)) {
      (obj[key as keyof typeof obj] as any) = value.map((v) =>
        typeof v === 'string' ? v.trim() : v
      );
    }
  });

  return obj;
};

export default trimArgs;
