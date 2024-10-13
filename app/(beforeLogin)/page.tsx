import Link from 'next/link';
import Image from 'next/image';
import detailLine from '@/public/images/detail-line.png';

export default function Home() {
  return (
    <div className='flex w-full flex-col'>
      <section
        className='flex w-full flex-col py-[40rem]'
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
        </div>
      </section>
      <div className='mt-[-2.5rem] w-full overflow-x-hidden'>
        <Image src={detailLine} alt='배경' width={2640} height={54} className='w-[264rem] max-w-[264rem]' />
      </div>
      <div>12312312321321313</div>
    </div>
  );
}
