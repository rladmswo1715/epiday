import { IComment, ICommentsList } from '@/types/comments';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import CommentGroup from '../comment/CommentGroup';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';
import Spinner from '../Spinner';

interface IMyCommentsProps {
  data: InfiniteData<ICommentsList, unknown>;
  commentFlatMapList: IComment[];
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<ICommentsList, unknown>, Object>>;
  hasNextPage: boolean;
  moreShowSpinner: boolean;
}

const MyComments = ({ data, commentFlatMapList, fetchNextPage, hasNextPage, moreShowSpinner }: IMyCommentsProps) => {
  const handleFetchNextComment = () => {
    fetchNextPage();
  };

  return (
    <div>
      <CommentGroup commentsData={commentFlatMapList} />

      {moreShowSpinner ? (
        <Spinner isPageLoading={false} />
      ) : (
        data &&
        hasNextPage &&
        data.pages[0].totalCount > 4 &&
        hasNextPage && (
          <button
            type='button'
            className='mx-auto mt-[7.2rem] flex items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem]'
            onClick={handleFetchNextComment}
          >
            <Image src={plus} alt='더보기' width={24} height={24} />
            <span className='text-[2rem] font-[500] text-var-blue-500'>댓글 더보기</span>
          </button>
        )
      )}
    </div>
  );
};

export default MyComments;
