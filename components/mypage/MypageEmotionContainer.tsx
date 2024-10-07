import InnerLayout from '../InnerLayout';
import EmotionContainer from '../main/afterLogin/EmotionContainer';
import EmotionCalendar from './EmotionCalendar';

const MypageEmotionContainer = () => {
  return (
    <InnerLayout cssStyle='flex flex-col gap-[16.4rem]'>
      <EmotionContainer pageType='mypage' />
      <EmotionCalendar />
    </InnerLayout>
  );
};

export default MypageEmotionContainer;
