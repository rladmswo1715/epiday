'use client';

import InnerLayout from '../InnerLayout';
import MypageEmotionContainer from './MypageEmotionContainer';
import MypageMyActivity from './MypageMyActivity';
import MypageUserInfoContainer from './MypageUserInfoContainer';

const MypageContent = () => {
  return (
    <div className='pt-[12.8rem]'>
      <div className='rounded-[2.4rem] bg-var-blue-100'>
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
