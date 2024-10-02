'use client';

import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import RecentSearches from './RecentSearches';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { IEpidayList } from '@/types/epiday';
import { getEpidayList } from '@/api/getEpiday';

const SearchContainer = ({ keyword }) => {
  const [searchText, setSearchText] = useState(keyword);

  const { data, isPending, isFetching, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<IEpidayList, Object, InfiniteData<IEpidayList>, [_1: string, _2: string], number>({
    queryKey: ['epiday', 'search'],
    queryFn: async ({ pageParam }) => await getEpidayList(pageParam, searchText),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: false,
  });

  useEffect(() => {
    if (searchText) refetch();
  }, []);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };
  console.log(data);

  if (!data && isFetching) return <Spinner />;

  return (
    <section className='mt-[2.4rem] pb-[15rem]'>
      <SearchForm value={searchText} onChange={handleChangeText} onSubmit={handleSearch} />
      <RecentSearches />
      <SearchResults searchResult={data?.pages} />
    </section>
  );
};

export default SearchContainer;
