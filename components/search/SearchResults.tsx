import { IEpidayData, IEpidayList, ITag } from '@/types/epiday';
import { authorFilter } from '@/utils/commonFunction';
import Link from 'next/link';
import { useMemo } from 'react';

interface ISearchResults {
  searchResult: IEpidayList[];
}

const SearchResults = ({ searchResult }: ISearchResults) => {
  const searchFlatMapList = useMemo(() => {
    return searchResult?.flatMap((page) => page.list) || [];
  }, [searchResult]);

  return (
    <div className='mt-[4rem] min-h-[30vw]'>
      {searchFlatMapList.map((item: IEpidayData) => {
        return (
          <Link href={`/epidays/${item.id}`} key={item.id} className='w-full'>
            <div className='flex flex-col border-b-[0.1rem] border-var-gray-100 p-[2.4rem] hover:shadow-lg'>
              <q className='text-left font-iropke text-[2rem] leading-[2.8rem] text-var-black-600 quotes-none'>{item.content}</q>
              <cite className='mt-[2.4rem] text-left font-iropke text-[2rem] leading-[2.8rem] text-var-blue-400'>{authorFilter(item.author)}</cite>
              <div className='flex items-center justify-end'>
                {item.tags.map((tag: ITag) => {
                  return (
                    <span key={tag.id} className='mt-[1.6rem] text-[2rem] text-var-blue-400'>
                      #{tag.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
