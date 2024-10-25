import { getEpidayList } from '@/api/getEpiday';
import EpidayCard from '@/components/feed/EpidayCard';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import Link from 'next/link';
import { IEpidayList } from '@/types/epiday';

const RecentEpidaysContainer = () => {
  const { data } = useQuery<IEpidayList, Error, IEpidayList, [_1: string, _2: string]>({
    queryKey: ['epidays', 'recent'],
    queryFn: () => getEpidayList(0, undefined, undefined, 3),
  });

  return (
    <div>
      <h3 className='text-[2.4rem] font-[600] text-var-black-600'>최신 에피그램</h3>
      <div className='mt-[2rem] flex flex-col gap-[1.6rem] sm:mt-[4rem]'>
        {data?.list.map((item) => {
          return (
            <Fragment key={item.id}>
              <EpidayCard epidayData={item} />
            </Fragment>
          );
        })}
      </div>
      {data && data.totalCount > 3 && (
        <Link href='/feed'>
          <div className='mx-auto mt-[5rem] flex w-fit items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem] sm:mt-[7.2rem]'>
            <Image src={plus} alt='더보기' width={24} height={24} />
            <span className='text-[2rem] font-[500] text-var-blue-500'>에피그램 더보기</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RecentEpidaysContainer;
