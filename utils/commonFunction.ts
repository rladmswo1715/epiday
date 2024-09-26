export const removeSpaces = (value: string) => value.trim().replace(/,/g, '');

export const isEmptyValue = (value: string | []) => {
  if (!value.length) {
    return true;
  }
  return false;
};

export const authorFilter = (value: string | null) => {
  if (value) {
    if (value.startsWith('본인:')) return '- ' + value.replace('본인:', '').trim() + ' -';
    return '- ' + value + ' -';
  }
  return value;
};
