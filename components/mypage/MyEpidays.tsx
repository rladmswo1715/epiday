import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import EpidayCard from '../feed/EpidayCard';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import noData from '@/public/images/icon/no-data.svg';
import { IEpidayData, IEpidayList } from '@/types/epiday';
import Spinner from '../Spinner';
import Link from 'next/link';

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

  if (epidayFlatMapList.length < 1) {
    return (
      <div className='mt-[4rem] flex flex-col items-center gap-[2.4rem] px-[14rem] py-[12.8rem]'>
        <Image src={noData} alt='댓글 없음' width={144} height={144} />
        <div className='flex flex-col items-center'>
          <p className='text-center text-[2rem] text-var-black-600'>
            아직 작성한 에피그램이 없어요!
            <br />
            에피그램을 작성하고 감정을 공유해보세요.
          </p>
          <button type='button' className='mt-[4.8rem] rounded-[10rem] border-[0.1rem] border-var-gray-100 px-[2rem] py-[1.2rem] text-[2rem] font-[400] text-var-black-400'>
            <Link href='/addepiday'>에피그램 만들기</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className='mt-[4rem] flex flex-col gap-[4.8rem]'>
        {epidayFlatMapList.map((item) => {
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
