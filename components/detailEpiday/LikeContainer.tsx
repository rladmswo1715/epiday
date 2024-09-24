import Image from 'next/image';
import menu from '@/public/images/icon/menu.svg';
import like from '@/public/images/icon/like.svg';
import share from '@/public/images/icon/share.svg';

const LikeContainer = ({ epidayId }: { epidayId: number }) => {
  return (
    <section className='pb-[3.6rem] pt-[4rem]'>
      <div className='flex flex-col gap-[3.2rem]'>
        <div className='flex justify-between'>
          <div className='flex gap-[1.6rem]'>
            <span className='text-[2rem] text-var-blue-400'>#꿈을이루고싶을때</span>
            <span className='text-[2rem] text-var-blue-400'>#나아가야할때</span>
          </div>
          <button>
            <Image src={menu} alt='메뉴' width={36} height={36} />
          </button>
        </div>
        <q className='text-[3.2rem] leading-[4.8rem] text-var-black-700'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</q>
        <cite className='text-right text-[2.4rem] leading-[4rem] text-var-blue-400'>- 앙드레 말로 -</cite>
      </div>
      <div className='mt-[3.6rem] flex justify-center gap-[1.6rem]'>
        <button className='flex items-center rounded-[10rem] bg-var-black-600 px-[1.4rem] py-[0.6rem]'>
          <Image src={like} alt='좋아요 버튼' />
          <span className='text-[2rem] font-[600] leading-[3.2rem] text-var-blue-100'>123</span>
        </button>
        <button className='flex items-center rounded-[10rem] bg-var-line-100 px-[1.6rem] py-[0.6rem]'>
          <span className='text-[2rem] font-[500] leading-[3.2rem] text-var-gray-300'>공유하기</span>
          <Image src={share} alt='공유 버튼' />
        </button>
      </div>
    </section>
  );
};

export default LikeContainer;
