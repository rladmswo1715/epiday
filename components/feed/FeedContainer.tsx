import EpidayCard from './EpidayCard';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';

const FeedContainer = () => {
  return (
    <section className='pb-[11.4rem]'>
      <h1 className='pt-[12rem] text-[2.4rem] font-[600] text-var-black-600'>피드</h1>
      <div className='mt-[4rem] grid grid-cols-2 gap-x-[3rem] gap-y-[4rem]'>
        <EpidayCard />
        <EpidayCard />
        <EpidayCard />
      </div>
      <button type='button' className='mx-auto mt-[8rem] flex items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem]'>
        <Image src={plus} alt='더보기' width={24} height={24} />
        <span className='text-[2rem] font-[500] text-var-blue-500'>에피그램 더보기</span>
      </button>
    </section>
  );
};

export default FeedContainer;
