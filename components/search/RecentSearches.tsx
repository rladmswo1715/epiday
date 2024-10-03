import { useRouter } from 'next/navigation';

interface IRecentSearches {
  searchList: string[];
  onTextClick: (event: React.MouseEvent<HTMLButtonElement>, text: string) => void;
}

const RecentSearches = ({ searchList, onTextClick }: IRecentSearches) => {
  return (
    <>
      {searchList && searchList.length > 0 && (
        <div className='mt-[4rem]'>
          <div className='flex justify-between'>
            <h3 className='text-[2.4rem] font-[500] text-var-black-700'>최근 검색어</h3>
            <button className='items-center text-[1.6rem] font-[600] leading-[2.6rem] text-var-error'>모두 지우기</button>
          </div>
          <div className='mt-[4rem] flex flex-wrap gap-[1.6rem]'>
            {searchList.map((searchItem: string) => {
              return (
                <button
                  type='button'
                  key={searchItem}
                  className='rounded-[2.2rem] bg-var-background px-[1.4rem] py-[1.2rem] text-[2.4rem] text-var-black-300'
                  onClick={(event) => onTextClick(event, searchItem)}
                >
                  {searchItem}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentSearches;
