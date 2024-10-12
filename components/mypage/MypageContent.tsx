'use client';

import InnerLayout from '../InnerLayout';
import MypageEmotionContainer from './MypageEmotionContainer';
import MypageMyActivity from './MypageMyActivity';
import MypageUserInfoContainer from './MypageUserInfoContainer';

const MypageContent = () => {
  return (
    <div className='pb-[25rem] pt-[12.8rem]'>
      <div className='rounded-[2.4rem] bg-var-blue-100 pb-[8.8rem]'>
        <InnerLayout>
          <MypageUserInfoContainer />
          <MypageEmotionContainer />
        </InnerLayout>
      </div>
      <InnerLayout>
        <MypageMyActivity />
      </InnerLayout>
    </div>
  );
};

export default MypageContent;
