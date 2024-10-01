'use client';

import EpidayCard from './EpidayCard';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getEpidayList } from '@/api/getEpiday';
import { IEpidayList } from '@/types/epiday';
import { useEffect, useMemo, useState } from 'react';
import Spinner from '../Spinner';

const FeedContainer = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { data, isPending, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<IEpidayList, Object, InfiniteData<IEpidayList>, [_1: string, _2: string], number>({
    queryKey: ['epiday', 'list'],
    queryFn: ({ pageParam }) => getEpidayList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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

  const epidayFlatMapList = useMemo(() => {
    return data?.pages.flatMap((page) => page.list) || [];
  }, [data]);

  if (isPending && isFetching) return <Spinner />;

  return (
    <section className='mx-auto max-w-[124.8rem] px-[2.4rem] pb-[11.4rem]'>
      <h1 className='pt-[12rem] text-[2.4rem] font-[600] text-var-black-600'>피드</h1>
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
    </section>
  );
};

export default FeedContainer;
