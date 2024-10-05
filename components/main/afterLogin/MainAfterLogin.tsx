'use client';

import EmotionContainer from './EmotionContainer';
import RecentCommentsContainer from './RecentCommentsContainer';
import RecentEpidaysContainer from './RecentEpidaysContainer';

const MainAfterLogin = () => {
  return (
    <section className='flex flex-col gap-[14rem] py-[12rem]'>
      <EmotionContainer />
      <RecentEpidaysContainer />
      <RecentCommentsContainer />
    </section>
  );
};

export default MainAfterLogin;
