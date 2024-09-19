'use client';

import { ChangeEvent, useState } from 'react';
import AddTagInput from './AddTagInput';
import { isEmptyValue, removeSpaces } from '@/utils/commonFunction';

const TagContent = () => {
  const [tagInputValue, setTagInputValue] = useState('');
  const [tagList, setTagList] = useState([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleAddTagList = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  return (
    <>
      <AddTagInput onChange={handleInputChange} onKeyup={handleAddTagList} />
      <div className='mt-[2.2rem] flex flex-wrap gap-[1rem] sm:mt-[1.5rem] sm:gap-[0.8rem]'>
        <span className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] leading-[2.6rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>공유하고싶은명언추가</span>
        <span className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>공유하고싶은명언추가</span>
        <span className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>공유하고싶22가</span>
      </div>
    </>
  );
};

export default TagContent;
