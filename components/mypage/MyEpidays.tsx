import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import EpidayCard from '../feed/EpidayCard';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import { IEpidayData, IEpidayList } from '@/types/epiday';
import Spinner from '../Spinner';

interface IMyEpidaysProps {
  data: InfiniteData<IEpidayList, unknown>;
  epidayFlatMapList: IEpidayData[];
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<IEpidayList, unknown>, Object>>;
  hasNextPage: boolean;
  moreShowSpinner: boolean;
}

const MyEpidays = ({ data, epidayFlatMapList, fetchNextPage, hasNextPage, moreShowSpinner }: IMyEpidaysProps) => {
  const handleFetchNextPage = () => {
    fetchNextPage();
  };

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
      {moreShowSpinner ? (
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
