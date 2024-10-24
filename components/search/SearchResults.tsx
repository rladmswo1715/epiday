import { IEpidayData, ITag } from '@/types/epiday';
import { authorFilter } from '@/utils/commonFunction';
import Link from 'next/link';

interface ISearchResults {
  searchFlatMapList: IEpidayData[];
  searchText: string;
}

const highlightText = (text: string, searchText: string) => {
  if (!searchText) return text;

  // 대소문자 구분 없이
  const regex = new RegExp(`(${searchText})`, 'gi');

  return text.split(regex).map((item, index) =>
    item.toLowerCase() === searchText.toLowerCase() ? (
      <mark key={index} className='bg-var-blue-100 text-var-illust-blue'>
        {item}
      </mark>
    ) : (
      item
    ),
  );
};

const SearchResults = ({ searchFlatMapList, searchText }: ISearchResults) => {
  return (
    <div className='mt-[4rem] min-h-[30vw]'>
      {searchFlatMapList.map((item: IEpidayData) => {
        return (
          <Link href={`/epidays/${item.id}`} key={item.id} className='w-full'>
            <div className='flex flex-col border-b-[0.1rem] border-var-gray-100 p-[2.4rem] hover:shadow-lg'>
              <q className='line-clamp-4 break-words text-left font-iropke text-[2rem] leading-[2.8rem] text-var-black-600 quotes-none'>{highlightText(item.content, searchText)}</q>
              <cite className='mt-[2.4rem] text-left font-iropke text-[2rem] leading-[2.8rem] text-var-blue-400'>{authorFilter(item.author)}</cite>
              <div className='flex items-center justify-end'>
                {item.tags.map((tag: ITag) => {
                  return (
                    <span key={tag.id} className='mt-[1.6rem] text-[2rem] text-var-blue-400'>
                      #{highlightText(tag.name, searchText)}
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
