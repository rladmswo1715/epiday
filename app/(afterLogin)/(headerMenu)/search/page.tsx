import SearchContainer from '@/components/search/SearchContainer';
import InnerLayout from '@/components/InnerLayout';

const Search = () => {
  return (
    <div className='bg-var-blue-100'>
      <InnerLayout>
        <SearchContainer />
      </InnerLayout>
    </div>
  );
};

export default Search;
