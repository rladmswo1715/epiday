import EmotionGroup from '@/components/emotion/EmotionGroup';
import { format, startOfToday } from 'date-fns';

interface IEmotionContainer {
  pageType: 'main' | 'mypage';
}

const EmotionContainer = ({ pageType }: IEmotionContainer) => {
  const today = startOfToday();
  const formattedDate = format(today, 'yyyy.MM.dd');

  return (
    <div className='flex flex-col'>
      {pageType === 'main' ? (
        <h3 className='mb-[2rem] text-[2.4rem] font-[600] text-var-black-600 sm:mb-[4rem]'>오늘의 감정은 어떠신가요?</h3>
      ) : (
        <div className='mb-[4rem] flex items-center justify-between'>
          <h3 className='text-[2.4rem] font-[600] text-var-black-600'>오늘의 감정</h3>
          <span className='text-[2rem] text-var-blue-400'>{formattedDate}</span>
        </div>
      )}
      <EmotionGroup />
    </div>
  );
};

export default EmotionContainer;
