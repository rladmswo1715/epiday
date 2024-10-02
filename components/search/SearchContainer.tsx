import InnerLayout from '../InnerLayout';
import RecentSearches from './RecentSearches';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const SearchContainer = () => {
  return (
    <section className='mt-[2.4rem]'>
      <SearchForm />
      <RecentSearches />
      <SearchResults />
    </section>
  );
};

export default SearchContainer;
