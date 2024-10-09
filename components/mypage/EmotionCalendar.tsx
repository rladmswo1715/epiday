import Calendar, { CalendarProps } from 'react-calendar';
import '@/styles/calendar.css';
import Image from 'next/image';
import prevArrow from '@/public/images/icon/arrow-left.svg';
import nextArrow from '@/public/images/icon/arrow-right.svg';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyEmotion } from '@/api/emotion';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import emotionMoved from '@/public/images/icon/emotion-moved.svg';
import emotionAngry from '@/public/images/icon/emotion-angry.svg';
import emotionHappy from '@/public/images/icon/emotion-happy.svg';
import emotionSad from '@/public/images/icon/emotion-sad.svg';
import emotionWorried from '@/public/images/icon/emotion-worried.svg';

const emotionsSrc = {
  MOVED: emotionMoved.src,
  HAPPY: emotionHappy.src,
  WORRIED: emotionWorried.src,
  SAD: emotionSad.src,
  ANGRY: emotionAngry.src,
};

const EmotionCalendar = () => {
  const { data: session } = useSession();

  const { data, refetch } = useQuery({
    queryKey: ['mypage', 'emotions'],
    queryFn: () => getMonthlyEmotion(session?.id),
    enabled: !!session,
  });

  useEffect(() => {
    if (!session) return;

    refetch();
  }, [session]);

  const selectedEmotion = {};
  if (data) {
    data.forEach((item) => {
      const dateKey = format(item?.createdAt, 'yyyy-mm-dd');
      selectedEmotion[dateKey] = item.emotion;
    });
  } else return;

  const calendarTileClassName: CalendarProps['tileClassName'] = ({ date, view }) => {
    return view === 'month' && selectedEmotion[format(date, 'yyyy-mm-dd')] ? 'emotion-day' : null;
  };

  const calendarTileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    return view === 'month' && selectedEmotion[format(date, 'yyyy-mm-dd')] ? <Image src={emotionsSrc[selectedEmotion[format(date, 'yyyy-mm-dd')]]} alt='감정' width={36} height={36} /> : null;
  };

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
        calendarType='hebrew'
        tileClassName={calendarTileClassName}
        tileContent={calendarTileContent}
      />
    </div>
  );
};

export default EmotionCalendar;
