'use client';

import EmotionContainer from './EmotionContainer';
import RecentCommentsContainer from './RecentCommentsContainer';
import RecentEpidaysContainer from './RecentEpidaysContainer';
import TodayEpidayContainer from './TodayEpidayContainer';
import { Element } from 'react-scroll';

const MainAfterLogin = () => {
  return (
    <section className='flex flex-col gap-[14rem] py-[12rem]'>
      <Element name='top'>
        <TodayEpidayContainer />
      </Element>
      <EmotionContainer pageType='main' />
      <RecentEpidaysContainer />
      <RecentCommentsContainer />
    </section>
  );
};

export default MainAfterLogin;
