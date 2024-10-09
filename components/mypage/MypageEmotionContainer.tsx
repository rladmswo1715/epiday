import EmotionContainer from '../main/afterLogin/EmotionContainer';
import EmotionCalendar from './EmotionCalendar';

const MypageEmotionContainer = () => {
  return (
    <div className='mt-[9.6rem] flex flex-col gap-[16.4rem]'>
      <EmotionContainer pageType='mypage' />
      <EmotionCalendar />
    </div>
  );
};

export default MypageEmotionContainer;
