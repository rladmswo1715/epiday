import Link from 'next/link';
import { NextPage } from 'next';
import noData from '@/public/images/icon/no-data.svg';
import Image from 'next/image';

const NotFound: NextPage = () => {
  return (
    <div className='flex h-[100vh] flex-col items-center justify-center'>
      <Image src={noData} alt='페이지 없음' width={280} height={280} />
      <p className='text-[3.6rem]'>페이지가 존재하지 않아요!</p>

      <span className='pt-[4rem] text-[2rem] text-var-black-300 underline'>
        <Link href='/'>메인으로 가기 </Link>
      </span>
    </div>
  );
};

export default NotFound;
