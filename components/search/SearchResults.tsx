import { result } from 'lodash';

const SearchResults = () => {
  return (
    <div className='mt-[4rem] min-h-[30vw]'>
      <button className='w-full border-b-[0.1rem] border-var-gray-100'>
        <div className='flex flex-col p-[2.4rem] hover:shadow-lg'>
          <q className='text-left font-iropke text-[2rem] leading-[2.8rem] text-var-black-600 quotes-none'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</q>
          <cite className='mt-[2.4rem] text-left font-iropke text-[2rem] leading-[2.8rem] text-var-blue-400'>- 앙드레 말로 -</cite>
          <div className='flex items-center justify-end'>
            <span className='mt-[1.6rem] text-[2rem] text-var-blue-400'>#동기부여</span>
          </div>
        </div>
      </button>
      <button className='w-full border-b-[0.1rem] border-var-gray-100'>
        <div className='flex flex-col p-[2.4rem] hover:shadow-lg'>
          <q className='text-left font-iropke text-[2rem] leading-[2.8rem] text-var-black-600 quotes-none'>오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.</q>
          <cite className='mt-[2.4rem] text-left font-iropke text-[2rem] leading-[2.8rem] text-var-blue-400'>- 앙드레 말로 -</cite>
          <div className='flex items-center justify-end'>
            <span className='mt-[1.6rem] text-[2rem] text-var-blue-400'>#동기부여</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default SearchResults;
