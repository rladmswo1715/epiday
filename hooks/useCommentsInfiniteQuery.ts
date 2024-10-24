import { getCommentList, getEpidayCommentsById, getUserComments } from '@/api/comments';
import { ICommentsList } from '@/types/comments';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface IHooksProps {
  pageType: 'postComments' | 'recentComments' | 'myComments';
  userToken?: string;
  epidayId?: number;
  userId?: string;
}

const useCommentsInfiniteQuery = ({ pageType, userToken, epidayId, userId }: IHooksProps) => {
  let queryKey: string[];
  let queryFn: ({ pageParam }: { pageParam?: number }) => Promise<ICommentsList>;
  let enabled: boolean;

  switch (pageType) {
    case 'postComments':
      queryKey = ['epiday', 'comments', String(epidayId)];
      queryFn = ({ pageParam = 0 }) => getEpidayCommentsById(epidayId, userToken, pageParam);
      enabled = !!userToken;
      break;
    case 'recentComments':
      queryKey = ['epiday', 'comments', 'recent'];
      queryFn = ({ pageParam = 0 }) => getCommentList(pageParam);
      enabled = true;
      break;
    case 'myComments':
      queryKey = ['epiday', 'mypage', 'comments', userId];
      queryFn = ({ pageParam = 0 }) => getUserComments(userId, userToken, pageParam);
      enabled = !!userId;
      break;
  }

  // useInfiniteQuery 타입 : <response 데이터 타입, Object, InfiniteData타입, 쿼리 키 타입, pageParam 타입> 순서
  const { data, ...rest } = useInfiniteQuery<ICommentsList, Object, InfiniteData<ICommentsList>, string[], number>({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });

  const commentFlatMapList = useMemo(() => {
    return data?.pages.flatMap((page) => page.list) || [];
  }, [data]);

  return {
    data,
    commentFlatMapList,
    ...rest,
  };
};

export default useCommentsInfiniteQuery;
