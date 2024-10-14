'use client';
import Link from 'next/link';
import Image from 'next/image';
import detailLine from '@/public/images/detail-line.png';
import moreView from '@/public/images/icon/more-view.svg';
import { useState } from 'react';
import ExplainCard from './ExplainCard';

const LandingPage = () => {
  const [showMore, setShowMore] = useState(false);

  const handleMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className='flex h-[100vh] min-h-[40rem] w-full flex-col'>
        <section
          className='flex h-full w-full flex-col justify-center'
          style={{
            backgroundImage: 'repeating-linear-gradient(white, white 37px, #F2F2F2 40px)',
          }}
        >
          <div className='mx-auto flex w-fit flex-col'>
            <p className='text-center font-iropke text-[4rem] font-[400] leading-[6.4rem] text-var-black-500'>
              나만 갖고 있기엔
              <br />
              아까운 글이 있지 않나요?
            </p>
            <span className='mt-[4rem] text-center font-iropke text-[2rem] font-[400] leading-[2.8rem] text-var-black-300'>다른 사람들과 감정을 공유해 보세요.</span>
            <Link href='/login'>
              <div className='mx-auto mt-[4.8rem] flex w-fit items-center rounded-[1.2rem] bg-var-black-500 px-[10.8rem] py-[1.6rem]'>
                <span className='text-[2rem] font-[600] text-var-black-100'>시작하기</span>
              </div>
            </Link>
            {!showMore && (
              <button className='mt-[20vh] flex flex-col items-center' onClick={handleMoreClick}>
                <span className='text-[1.6rem] font-[600] leading-[2.6rem] text-var-blue-400'>더 알아보기</span>
                <Image src={moreView} alt='더 보기' width={24} height={24}></Image>
              </button>
            )}
          </div>
        </section>
        <div className='mt-[-2.5rem] w-full overflow-hidden scrollbar-hide'>
          <Image src={detailLine} alt='배경' width={2640} height={54} className='w-[264rem] max-w-[264rem]' />
        </div>
      </div>
      {showMore && (
        <>
          <div className={`transform pb-[21rem] transition-transform duration-500 ease-in-out ${showMore ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <div className='mt-[24rem] space-y-[38rem]'>
              <ExplainCard isReversed={false} order='first' />
              <ExplainCard isReversed={true} order='second' />
              <ExplainCard isReversed={false} order='third' />
            </div>
          </div>
          <div></div>
        </>
      )}
    </>
  );
};

export default LandingPage;
