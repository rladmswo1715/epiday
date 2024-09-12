import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';

export default function BeforeLoginLayOut({ children }) {
  return (
    <div>
      <header className='z-fixed fixed flex h-[8rem] w-[100vw] justify-center border-b-[0.1rem] border-[#D7D7D7] bg-[#FFF]'>
        <Image src={Logo} alt='로고' width={114} height={36} />
      </header>
      <div className='flex justify-center pt-[8rem]'>{children}</div>
    </div>
  );
}
