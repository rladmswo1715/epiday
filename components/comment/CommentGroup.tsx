import Image from 'next/image';
import CommentCard from './CommentCard';
import noData from '@/public/images/icon/no-data.svg';
import { IComment } from '@/types/comments';
import { Fragment } from 'react';

interface ICommentGroupProps {
  commentsData: IComment[];
}

const CommentGroup = ({ commentsData }: ICommentGroupProps) => {
  if (!commentsData || commentsData.length === 0) {
    return (
      <div className='mt-[2.5rem] flex flex-col items-center gap-[2.4rem] px-[16rem] py-[8rem] sm:mt-[4rem] sm:py-[12.8rem]'>
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
    <div className='mt-[2.5rem] border-b-[0.1rem] border-var-line-200 sm:mt-[4rem]'>
      {commentsData.map((comment) => {
        return (
          <Fragment key={comment.id}>
            <CommentCard cardData={comment} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default CommentGroup;
