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
      className='relative flex h-[8rem] items-center border-b-[0.4rem] border-var-blue-200 after:absolute after:bottom-[-0.4rem] after:left-0 after:h-[0.4rem] after:w-full after:origin-left after:scale-x-0 after:bg-var-blue-800 after:transition-transform after:duration-300 focus-within:after:scale-x-100'
      onSubmit={onSubmit}
    >
      <input className='h-full grow py-[2.6rem] text-[2.4rem] text-var-black-700 outline-none' value={value} onChange={onChange} />
      <button type='submit'>
        <Image src={Search} alt='검색버튼' width={36} height={36} />
      </button>
    </form>
  );
};

export default SearchForm;
