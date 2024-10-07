'use client';

import EmotionContainer from './EmotionContainer';
import RecentCommentsContainer from './RecentCommentsContainer';
import RecentEpidaysContainer from './RecentEpidaysContainer';
import TodayEpidayContainer from './TodayEpidayContainer';

const MainAfterLogin = () => {
  return (
    <section className='flex flex-col gap-[14rem] py-[12rem]'>
      <TodayEpidayContainer />
      <EmotionContainer />
      <RecentEpidaysContainer />
      <RecentCommentsContainer />
    </section>
  );
};

export default MainAfterLogin;
