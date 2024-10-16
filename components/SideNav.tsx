'use client';

import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import up from '@/public/images/icon/arrow-up.svg';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

const SideNav = () => {
  return (
    <div className='fixed bottom-[8rem] right-[4rem] flex w-fit flex-col items-end gap-[0.8rem]'>
      <Link href='/addepiday'>
        <div className='shadow-sideNav flex items-center gap-[0.4rem] rounded-[10rem] bg-var-blue-900 px-[1.8rem] py-[1.4rem]'>
          <Image src={plus} alt='더하기 아이콘' width={22} height={22} />
          <span className='text-[1.5rem] font-[600] text-var-blue-100'>에피데이 만들기</span>
        </div>
      </Link>
      <ScrollLink to='top' smooth={true} duration={500} offset={-200} className='shadow-sideNav flex h-[6rem] w-[6rem] cursor-pointer items-center justify-center rounded-full bg-var-blue-900'>
        <Image src={up} alt='위로 올라가기' width={20} height={10} />
      </ScrollLink>
    </div>
  );
};

export default SideNav;
