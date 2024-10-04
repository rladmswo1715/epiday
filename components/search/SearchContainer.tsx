'use client';

import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import RecentSearches from './RecentSearches';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { IEpidayList } from '@/types/epiday';
import { getEpidayList } from '@/api/getEpiday';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { throttle } from 'lodash';

const SearchContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('keyword') || '');
  const [recentSearchList, setRecentSearchList] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    }
    return [];
  });

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<IEpidayList, Object, InfiniteData<IEpidayList>, [_1: string, _2: string], number>({
    queryKey: ['epiday', 'search'],
    queryFn: async ({ pageParam }) => await getEpidayList(pageParam, searchText),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: false,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    setSearchText(keyword);
    refetch();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPageThrottled();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const fetchNextPageThrottled = throttle(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, 1000);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const saveRecentSearch = (keyword: string) => {
    const searchList = [keyword, ...recentSearchList.filter((search) => search !== keyword)];
    const sliceSearchList = searchList.slice(0, 5);
    setRecentSearchList(sliceSearchList);
    localStorage.setItem('recentSearchList', JSON.stringify(sliceSearchList));
  };

  const handleClickRecentText = (e: React.MouseEvent<HTMLButtonElement>, recentText: string) => {
    e.preventDefault();
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('keyword', recentText);

    if (recentText && recentText !== '') {
      localStorage.setItem('recentSearchList', recentText);
      saveRecentSearch(recentText);
    }
    router.push(`?${newParams.toString()}`);

    setSearchText(recentText);
    // refetch가 다음 동작에 작동해서 비동기로
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('keyword', searchText);

    if (searchText && searchText !== '') {
      localStorage.setItem('recentSearchList', searchText);
      saveRecentSearch(searchText);
    }
    router.push(`?${newParams.toString()}`);
    refetch();
  };

  if (!data && isLoading) return <Spinner />;

  return (
    <section className='mt-[2.4rem] pb-[15rem]'>
      <SearchForm value={searchText} onChange={handleChangeText} onSubmit={handleSearch} />
      <RecentSearches searchList={recentSearchList} onTextClick={handleClickRecentText} setRecentSearchList={setRecentSearchList} />
      <SearchResults searchResult={data?.pages} />
      <div ref={ref} className='h-[0.1rem]'></div>
    </section>
  );
};

export default SearchContainer;
