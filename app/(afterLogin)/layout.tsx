import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';

const AfterLoginLayOut = ({ children }) => {
  return (
    <div>
      <header className='fixed z-fixed flex h-[8rem] w-[100vw] justify-between border-b-[0.1rem] border-[#D7D7D7] bg-[#FFF] px-[12rem] py-[2.6rem]'>
        <div className='flex'>
          <Image src={Logo} alt='로고' width={131} height={36} className='pr-[3.6rem]' />
          <button className='pr-[2.4rem] text-[1.6rem] font-[600] leading-[2.6rem]'>피드</button>
          <button className='text-[1.6rem] font-[600] leading-[2.6rem]'>검색</button>
        </div>
        <span className='text-[1.4rem] font-[500] leading-[2.4rem] text-var-gray-300'>김코드</span>
      </header>
      <div className='flex h-[100%] justify-center bg-var-blue-100 pt-[8rem]'>{children}</div>
    </div>
  );
};

export default AfterLoginLayOut;
