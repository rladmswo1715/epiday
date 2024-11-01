import { signOut, useSession } from 'next-auth/react';

import ProfileImage from '../ProfileImage';
import { useModalStore } from '@/store/modalStore';

const MypageUserInfoContainer = () => {
  const { data: session } = useSession();
  const { openModal } = useModalStore();

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

  const handleOpenProfileEdit = () => {
    openModal('profileEdit', { userNickname: session.nickname, userImage: session.image, userToken: session.accessToken });
  };

  return (
    <section className='flex translate-y-[-6rem] transform flex-col items-center'>
      <ProfileImage size='120px' userSetting={session?.image} onClick={handleOpenProfileEdit} />
      <span className='mt-[1.6rem] text-[2.4rem] font-[500] text-var-black-950'>{session?.nickname}</span>
      <button type='button' className='mt-[2.4rem] rounded-[10rem] bg-var-line-100 px-[1.4rem] py-[0.6rem] text-[2rem] font-[500] text-var-gray-300' onClick={handleLogout}>
        로그아웃
      </button>
    </section>
  );
};

export default MypageUserInfoContainer;
