import Image from 'next/image';
import ProfileImage from '../ProfileImage';

const CommentCard = () => {
  return (
    <div className='flex gap-[1.6rem] border-t-[0.1rem] border-var-line-200 bg-var-background px-[2.4rem] py-[3.5rem]'>
      <ProfileImage size='48px' />
      <div className='w-[100%]'>
        <div className='flex items-center justify-between'>
          <p className='space-x-[0.8rem] text-[1.6rem] leading-[2.6rem] text-var-black-300'>
            <span>지킬과 하이드</span>
            <span>1시간 전</span>
          </p>
          <div className='flex gap-[1.6rem] text-[1.6rem] leading-[1.8rem] underline-offset-[0.2rem]'>
            <button className='text-var-black-600 underline decoration-var-black-600'>수정</button>
            <button className='text-var-error underline decoration-var-error'>삭제</button>
          </div>
        </div>
        <p className='mt-[1.6rem] text-[2rem] text-var-black-700'>오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!</p>
      </div>
    </div>
  );
};

export default CommentCard;
