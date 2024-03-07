// This function checks if a given value is empty.
// eslint-disable-next-line import/prefer-default-export
export const isEmpty = (value: any): boolean => {
  // If the value is null or undefined, return true.
  if (value == null) {
    return true;
  }

  // If the value is an array, a string, or has a splice method (like an array-like object),
  // check if its length is zero. If it is, return true.
  if (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function') {
    return !value.length;
  }

  // If the value is an object, check if it has any keys. If it doesn't, return true.
  return Object.keys(value).length === 0;
};
