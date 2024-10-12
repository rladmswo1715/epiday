import { getUserComments } from '@/api/comments';
import { ICommentsList } from '@/types/comments';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import CommentGroup from '../comment/CommentGroup';
import Image from 'next/image';
import plus from '@/public/images/icon/plus.svg';

interface IMyCommentsProps {
  userId: string;
  accessToken: string;
}

const MyComments = ({ userId, accessToken }: IMyCommentsProps) => {
  const { data, isPending, isFetching, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    ICommentsList,
    Object,
    InfiniteData<ICommentsList>,
    [_1: string, _2: string, _3: string, _4: string],
    number
  >({
    queryKey: ['epiday', 'mypage', 'comments', userId],
    queryFn: ({ pageParam }) => getUserComments(userId, accessToken, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!accessToken,
  });

  const commentFlatMapList = useMemo(() => {
    return data?.pages.flatMap((page) => page.list) || [];
  }, [data]);

  const handleFetchNextComment = () => {
    fetchNextPage();
  };

  return (
    <div>
      <CommentGroup commentsData={commentFlatMapList} />
      {data && data.pages[0]?.totalCount > 4 && hasNextPage && (
        <button type='button' className='mx-auto mt-[7.2rem] flex items-center gap-[0.8rem] rounded-[10rem] border-[0.1rem] border-var-line-200 px-[4rem] py-[1.2rem]' onClick={handleFetchNextComment}>
          <Image src={plus} alt='더보기' width={24} height={24} />
          <span className='text-[2rem] font-[500] text-var-blue-500'>댓글 더보기</span>
        </button>
      )}
    </div>
  );
};

export default MyComments;
