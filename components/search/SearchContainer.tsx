import InnerLayout from '../InnerLayout';
import RecentSearches from './RecentSearches';
import SearchForm from './SearchForm';

const SearchContainer = () => {
  return (
    <section className='mt-[2.4rem]'>
      <SearchForm />
      <RecentSearches />
    </section>
  );
};

export default SearchContainer;
