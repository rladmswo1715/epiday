import { ChangeEvent } from 'react';

interface ITextInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyup: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AddTagInput = ({ value, onChange, onKeyup, onKeyDown }: ITextInputProps) => {
  return (
    <input
      className='h-[4.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[1.6rem] leading-[2.6rem] focus:outline-none sm:h-[6.4rem] sm:text-[2rem] sm:leading-[3.2rem]'
      value={value}
      onChange={onChange}
      onKeyUp={onKeyup}
      onKeyDown={onKeyDown}
      placeholder='입력하여 태그 작성 (최대 10자)'
      maxLength={10}
    />
  );
};

export default AddTagInput;
