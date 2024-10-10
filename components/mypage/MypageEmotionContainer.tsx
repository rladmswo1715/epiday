import EmotionContainer from '../main/afterLogin/EmotionContainer';
import EmotionCalendar from './EmotionCalendar';
import EmotionChart from './EmotionChart';

const MypageEmotionContainer = () => {
  return (
    <div className='mt-[9.6rem] flex flex-col gap-[16.4rem]'>
      <EmotionContainer pageType='mypage' />
      <EmotionCalendar />
      <EmotionChart />
    </div>
  );
};

export default MypageEmotionContainer;
