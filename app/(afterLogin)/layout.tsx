import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';
import RQProvider from '@/components/provider/RQProvider';
import ModalContainer from '@/components/modal/ModalContainer';
import Link from 'next/link';
import HeaderUserInfo from '@/components/HeaderUserInfo';

const AfterLoginLayOut = ({ children }) => {
  return (
    <>
      <header className='sticky left-0 top-0 z-fixed flex h-[8rem] w-[100%] justify-between border-b-[0.1rem] border-[#D7D7D7] bg-var-blue-100 px-[1rem] py-[2.6rem] sm:px-[4rem] md:px-[12rem]'>
        <div className='flex items-center'>
          <Link href='/epidays'>
            <Image src={Logo} alt='로고' width={131} height={36} className='pr-[2rem] sm:pr-[3.6rem]' />
          </Link>
          <Link href='/feed' className='pr-[1.5rem] text-[1.6rem] font-[600] leading-[2.6rem] sm:pr-[2.4rem]'>
            피드
          </Link>
          <Link href='/search' className='text-[1.6rem] font-[600] leading-[2.6rem]'>
            검색
          </Link>
        </div>
        <HeaderUserInfo />
      </header>
      <RQProvider>
        {children}
        <ModalContainer />
      </RQProvider>
    </>
  );
};

export default AfterLoginLayOut;
