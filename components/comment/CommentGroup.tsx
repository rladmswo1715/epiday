import Image from 'next/image';
import CommentCard from './CommentCard';
import noData from '@/public/images/icon/no-data.svg';

const CommentGroup = ({ commentsData }) => {
  if (commentsData?.totalCount === 0) {
    return (
      <div className='mt-[4rem] flex flex-col items-center gap-[2.4rem] px-[16rem] py-[12.8rem]'>
        <Image src={noData} alt='댓글 없음' width={144} height={144} />
        <div>
          <p className='text-center text-[2rem] text-var-black-600'>
            아직 댓글이 없어요!
            <br />
            댓글을 달고 다른 사람들과 교류해보세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-[4rem]'>
      {commentsData?.list.map((comment) => {
        return <CommentCard cardData={comment} />;
      })}
    </div>
  );
};

export default CommentGroup;
