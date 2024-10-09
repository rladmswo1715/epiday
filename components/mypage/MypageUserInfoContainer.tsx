import { useSession } from 'next-auth/react';

import ProfileImage from '../ProfileImage';

const MypageUserInfoContainer = () => {
  const { data: session } = useSession();

  return (
    <section className='flex translate-y-[-6rem] transform flex-col items-center'>
      <ProfileImage size='120px' userSetting={session?.image} />
      <span className='mt-[1.6rem] text-[2.4rem] font-[500] text-var-black-950'>{session?.nickname}</span>
      <button type='button' className='mt-[2.4rem] rounded-[10rem] bg-var-line-100 px-[1.4rem] py-[0.6rem] text-[2rem] font-[500] text-var-gray-300'>
        로그아웃
      </button>
    </section>
  );
};

export default MypageUserInfoContainer;
