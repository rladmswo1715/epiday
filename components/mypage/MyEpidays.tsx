import { getEpidayList } from '@/api/getEpiday';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useMemo, useState } from 'react';
import EpidayCard from '../feed/EpidayCard';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import { IEpidayList } from '@/types/epiday';
import Spinner from '../Spinner';

interface IMyEpidaysProps {
  userId: string;
}

const MyEpidays = ({ userId }: IMyEpidaysProps) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<IEpidayList, Object, InfiniteData<IEpidayList>, [_1: string, _2: string, _3: string], number>({
    queryKey: ['epidays', 'mypage', userId],
    queryFn: ({ pageParam }) => getEpidayList(pageParam, undefined, userId, 3),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  useEffect(() => {
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

  return (
    <>
      <div className='mt-[4rem] flex flex-col gap-[4.8rem]'>
        {epidayFlatMapList.length > 0 &&
          epidayFlatMapList.map((item) => {
            return (
              <Fragment key={item.id}>
                <EpidayCard epidayData={item} />
              </Fragment>
            );
          })}
      </div>
      {showSpinner ? (
        <Spinner isPageLoading={false} />
      ) : (
        data &&
        hasNextPage &&
        data.pages[0].totalCount > 3 && (
          <button className='mx-auto mt-[7.2rem] flex w-fit items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem]' onClick={handleFetchNextPage}>
            <Image src={plus} alt='더보기' width={24} height={24} />
            <span className='text-[2rem] font-[500] text-var-blue-500'>에피그램 더보기</span>
          </button>
        )
      )}
    </>
  );
};

export default MyEpidays;
