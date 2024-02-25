export const isEmpty = (value: any): boolean => {
  if (value == null) {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function') {
    return !value.length;
  }

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
};
