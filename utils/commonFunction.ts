export const removeSpaces = (value: string) => value.trim().replace(/,/g, '');

export const isEmptyValue = (value: string | []) => {
  if (!value.length) {
    return true;
  }
  return false;
};

export const authorFilter = (value: string | null) => {
  let returnValue: string | null = value;

  if (returnValue) {
    if (returnValue.startsWith('본인:')) {
      returnValue = returnValue.replace('본인:', '').trim();
    } else if (returnValue === '알 수 없음') {
      return '';
    }
    return '- ' + returnValue + ' -';
  }
  return returnValue;
};
