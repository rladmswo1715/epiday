export const removeSpaces = (value: string) => value.trim().replace(/,/g, '');

export const isEmptyValue = (value: string | []) => {
  if (!value.length) {
    return true;
  }
  return false;
};
