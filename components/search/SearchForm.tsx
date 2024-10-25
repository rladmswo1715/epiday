import Image from 'next/image';
import Search from '@/public/images/icon/search.svg';

interface ISearchFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ value, onChange, onSubmit }: ISearchFormProps) => {
  return (
    <form
      className='relative flex h-[6rem] items-center border-b-[0.4rem] border-var-blue-200 after:absolute after:bottom-[-0.4rem] after:left-0 after:h-[0.4rem] after:w-full after:origin-left after:scale-x-0 after:bg-var-blue-800 after:transition-transform after:duration-300 focus-within:after:scale-x-100 sm:h-[8rem]'
      onSubmit={onSubmit}
    >
      <input className='h-full grow py-[2.6rem] text-[1.8rem] text-var-black-700 outline-none sm:text-[2.4rem]' value={value} onChange={onChange} />
      <button type='submit' className='h-[2.5rem] w-[2.5rem] sm:h-[3.6rem] sm:w-[3.6rem]'>
        <Image src={Search} alt='검색버튼' width={36} height={36} className='h-full w-full object-contain' />
      </button>
    </form>
  );
};

export default SearchForm;
