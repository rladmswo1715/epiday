import { getTodayEpiday } from '@/apis/getEpiday';
import EpidayCard from '@/components/feed/EpidayCard';
import { IEpidayData } from '@/types/epiday';
import { useQuery } from '@tanstack/react-query';

const TodayEpidayContainer = () => {
  const { data, isError } = useQuery<IEpidayData | false, Error, IEpidayData, [_1: string, _2: string]>({
    queryKey: ['epiday', 'today'],
    queryFn: async () => {
      try {
        const response = await getTodayEpiday();
        if (response.status === 204) {
          return false;
        }
        return await response.json();
      } catch (error) {
        console.error('TodayEpidayResponse Error :: ', error);
      }
    },
  });

  if (isError) {
    return <div>오늘의 에피데이를 불러오는데 실패했어요.</div>;
  }

  return (
    <div>
      <h3 className='mb-[2rem] text-[2.4rem] font-[600] text-var-black-600 sm:mb-[4rem]'>오늘의 에피데이</h3>
      {data ? (
        <EpidayCard epidayData={data} />
      ) : (
        <div>
          <span className='flex items-center justify-center text-[2rem] text-var-black-300'>오늘 작성된 에피데이가 없어요!</span>
        </div>
      )}
    </div>
  );
};

export default TodayEpidayContainer;
