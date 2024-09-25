import ProfileImage from '../ProfileImage';
import VisibilityToggle from '../VisibilityToggle';

const CommentsContainer = () => {
  return (
    <section className='pb-[22.8rem] pt-[4.8rem]'>
      <h3 className='text-[2rem] font-[600] text-var-black-600'>댓글 (3)</h3>
      <div className='mt-[2.4rem] flex gap-[2.4rem]'>
        <ProfileImage size='50px' />
        <textarea
          className='h-[10.4rem] w-[56.8rem] overflow-scroll rounded-[0.8rem] border-[0.1rem] border-var-line-200 px-[1.6rem] py-[1.2rem] text-[2rem] scrollbar-hide'
          placeholder='100자 이내로 입력해주세요.'
        />
      </div>
      <div className='mt-[1.6rem] flex items-center justify-between'>
        <VisibilityToggle />
        <button className='leadeing-[2.6rem] rounded-[0.8rem] border-[0.1rem] bg-var-black-500 px-[1.6rem] py-[0.9rem] text-[1.6rem] font-[600] text-var-blue-100'>저장</button>
      </div>
    </section>
  );
};

export default CommentsContainer;
