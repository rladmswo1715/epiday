import EmotionContainer from '../main/afterLogin/EmotionContainer';
import EmotionCalendar from './EmotionCalendar';

const MypageEmotionContainer = () => {
  return (
    <div className='mt-[5.6rem] flex flex-col gap-[10rem] sm:mt-[9.6rem] sm:gap-[16.4rem]'>
      <EmotionContainer pageType='mypage' />
      <EmotionCalendar />
    </div>
  );
};

export default MypageEmotionContainer;
