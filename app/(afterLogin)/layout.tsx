import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';
import RQProvider from '@/components/provider/RQProvider';
import ModalContainer from '@/components/modal/ModalContainer';
import Link from 'next/link';

const AfterLoginLayOut = ({ children }) => {
  return (
    <>
      <header className='fixed z-fixed flex h-[8rem] w-[100vw] justify-between border-b-[0.1rem] border-[#D7D7D7] bg-var-blue-100 px-[12rem] py-[2.6rem]'>
        <div className='flex items-center'>
          <Link href='/epidays'>
            <Image src={Logo} alt='로고' width={131} height={36} className='pr-[3.6rem]' />
          </Link>
          <Link href='/feed' className='pr-[2.4rem] text-[1.6rem] font-[600] leading-[2.6rem]'>
            피드
          </Link>
          <Link href='/search' className='text-[1.6rem] font-[600] leading-[2.6rem]'>
            검색
          </Link>
        </div>
        <span className='text-[1.4rem] font-[500] leading-[2.4rem] text-var-gray-300'>김코드</span>
      </header>
      <RQProvider>
        {children}
        <ModalContainer />
      </RQProvider>
    </>
  );
};

export default AfterLoginLayOut;
