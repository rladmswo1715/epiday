import { getEpidayList } from '@/api/getEpiday';
import { IEpidayList } from '@/types/epiday';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface IHooksProps {
  pageType: 'feedEpidays' | 'searchEpidays' | 'myEpidays';
  searchText?: string;
  userId?: string;
}

const useEpidaysInfiniteQuery = ({ pageType, searchText, userId }: IHooksProps) => {
  let queryKey: string[];
  let queryFn: ({ pageParam }: { pageParam?: number }) => Promise<IEpidayList>;
  let enabled: boolean;

  switch (pageType) {
    case 'feedEpidays':
      queryKey = ['epiday', 'list'];
      queryFn = ({ pageParam = 0 }) => getEpidayList(pageParam);
      enabled = true;
      break;
    case 'searchEpidays':
      queryKey = ['epiday', 'search'];
      queryFn = ({ pageParam = 0 }) => getEpidayList(pageParam, searchText);
      enabled = false;
      break;
    case 'myEpidays':
      queryKey = ['epidays', 'mypage', userId];
      queryFn = ({ pageParam = 0 }) => getEpidayList(pageParam, undefined, userId, 3);
      enabled = !!userId;
      break;
  }

  // useInfiniteQuery 타입 : <response 데이터 타입, Object, InfiniteData타입, 쿼리 키 타입, pageParam 타입> 순서
  const { data, ...rest } = useInfiniteQuery<IEpidayList, Object, InfiniteData<IEpidayList>, string[], number>({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });

  const epidayFlatMapList = useMemo(() => {
    return data?.pages.flatMap((page) => page.list) || [];
  }, [data]);

  return {
    data,
    epidayFlatMapList,
    ...rest,
  };
};

export default useEpidaysInfiniteQuery;
