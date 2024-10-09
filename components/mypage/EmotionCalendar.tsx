import Calendar from 'react-calendar';
import '@/styles/calendar.css';
import Image from 'next/image';
import prevArrow from '@/public/images/icon/arrow-left.svg';
import nextArrow from '@/public/images/icon/arrow-right.svg';
import { format } from 'date-fns';

const EmotionCalendar = () => {
  const customWeekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className='pb-[20rem]'>
      <Calendar
        locale='ko'
        className='custom'
        prevLabel={<Image src={prevArrow} alt='이전 달' width={36} height={36} />}
        nextLabel={<Image src={nextArrow} alt='다음 달' width={36} height={36} />}
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => format(date, 'd')}
        formatShortWeekday={(locale, date) => customWeekdays[date.getDay()]}
        calendarType='hebrew'
      />
    </div>
  );
};

export default EmotionCalendar;
