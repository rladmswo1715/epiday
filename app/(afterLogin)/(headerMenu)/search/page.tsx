import SearchContainer from '@/components/search/SearchContainer';
import InnerLayout from '@/components/InnerLayout';
import { Suspense } from 'react';

const Search = () => {
  return (
    <div className='bg-var-blue-100'>
      <InnerLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchContainer />
        </Suspense>
      </InnerLayout>
    </div>
  );
};

export default Search;
