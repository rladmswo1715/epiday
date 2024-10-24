'use client';

import EpidayCard from './EpidayCard';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import SideNav from '../SideNav';
import { Element } from 'react-scroll';
import useEpidaysInfiniteQuery from '@/hooks/useEpidaysInfiniteQuery';

const FeedContainer = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { epidayFlatMapList, isPending, isFetching, fetchNextPage, hasNextPage } = useEpidaysInfiniteQuery({
    pageType: 'feedEpidays',
  });

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  useEffect(() => {
    // list 더 불러올 떄 스피너 너무 잠깐 노출돼서 딜레이 걸었음
    if (isFetching) {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(false);
    }
  }, [isFetching]);

  if (isPending && isFetching) return <Spinner />;

  return (
    <section className='mx-auto max-w-[124.8rem] px-[2.4rem] pb-[11.4rem]'>
      <Element name='top'>
        <h1 className='pt-[12rem] text-[2.4rem] font-[600] text-var-black-600'>피드</h1>
      </Element>
      <div className='mt-[4rem] grid grid-cols-2 gap-x-[3rem] gap-y-[4rem]'>
        {epidayFlatMapList.length > 0 &&
          epidayFlatMapList.map((item) => {
            return <EpidayCard key={item.id} epidayData={item} />;
          })}
      </div>
      {showSpinner ? (
        <Spinner isPageLoading={false} />
      ) : (
        epidayFlatMapList.length > 0 &&
        hasNextPage && (
          <button type='button' className='mx-auto mt-[8rem] flex items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem]' onClick={handleFetchNextPage}>
            <Image src={plus} alt='더보기' width={24} height={24} />
            <span className='text-[2rem] font-[500] text-var-blue-500'>에피그램 더보기</span>
          </button>
        )
      )}
      <SideNav />
    </section>
  );
};

export default FeedContainer;
