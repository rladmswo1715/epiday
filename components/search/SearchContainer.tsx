'use client';

import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import RecentSearches from './RecentSearches';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { useRouter, useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { throttle } from 'lodash';
import useEpidaysInfiniteQuery from '@/hooks/useEpidaysInfiniteQuery';

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

  const { data, epidayFlatMapList, isLoading, isFetching, fetchNextPage, hasNextPage, refetch } = useEpidaysInfiniteQuery({
    pageType: 'searchEpidays',
    searchText,
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
    <section className='pb-[10rem] pt-[1.5rem] sm:pb-[15rem] sm:pt-[2.4rem]'>
      <SearchForm value={searchText} onChange={handleChangeText} onSubmit={handleSearch} />
      <RecentSearches searchList={recentSearchList} onTextClick={handleClickRecentText} setRecentSearchList={setRecentSearchList} />
      <SearchResults searchFlatMapList={epidayFlatMapList} searchText={searchText} />
      <div ref={ref} className='h-[0.1rem]'></div>
    </section>
  );
};

export default SearchContainer;
