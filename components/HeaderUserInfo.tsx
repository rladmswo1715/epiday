'use client';

import { signOut, useSession } from 'next-auth/react';
import ProfileImage from './ProfileImage';
import DropBoxGroup from './DropBox/DropBoxGroup';

const HeaderUserInfo = () => {
  const { data } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='flex items-center gap-[0.6rem]'>
      <ProfileImage size='24px' userSetting={data?.image} />
      <DropBoxGroup
        items={['마이페이지', '로그아웃']}
        hideTrigger={true}
        triggerElement={<button className='relative text-[1.4rem] font-[500] leading-[2.4rem] text-var-gray-300'>{data?.nickname}</button>}
        itemClickEvent={[handleLogout]}
      />
    </div>
  );
};

export default HeaderUserInfo;
