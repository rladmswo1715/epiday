import { parseISO, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const timeAgo = (value: string) => {
  const date = parseISO(value);
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
};
