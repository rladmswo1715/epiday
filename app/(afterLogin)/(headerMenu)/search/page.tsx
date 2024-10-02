import SearchContainer from '@/components/search/SearchContainer';
import InnerLayout from '@/components/InnerLayout';

interface ISearchProps {
  searchParams: { keyword: string };
}

const Search = ({ searchParams: { keyword } }: ISearchProps) => {
  return (
    <div className='bg-var-blue-100'>
      <InnerLayout>
        <SearchContainer keyword={keyword} />
      </InnerLayout>
    </div>
  );
};

export default Search;
