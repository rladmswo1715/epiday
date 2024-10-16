'use client';

import { useSession } from 'next-auth/react';
import ProfileImage from './ProfileImage';
import DropBoxGroup from './DropBox/DropBoxGroup';

const HeaderUserInfo = () => {
  const { data } = useSession();

  return (
    <div className='flex items-center gap-[0.6rem]'>
      <ProfileImage size='24px' userSetting={data?.image} />
      <DropBoxGroup
        items={['마이페이지', '로그아웃']}
        hideTrigger={true}
        triggerElement={<button className='relative text-[1.4rem] font-[500] leading-[2.4rem] text-var-gray-300'>{data?.nickname}</button>}
      />
    </div>
  );
};

export default HeaderUserInfo;
