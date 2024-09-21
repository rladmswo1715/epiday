'use client';

import { ChangeEvent, useState } from 'react';
import AddTagInput from './AddTagInput';
import { isEmptyValue, removeSpaces } from '@/utils/commonFunction';
import { useTagStore } from '@/store/tagStore';

const TagContent = () => {
  const [tagInputValue, setTagInputValue] = useState('');
  const { tagList, addTag } = useTagStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleAddTagList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'NumpadEnter'].includes(e.code) || tagList.length >= 3) return;

    const newTagValue = removeSpaces(tagInputValue);

    if (!isEmptyValue(newTagValue) && !tagList.includes(newTagValue)) {
      addTag(tagInputValue);
      setTagInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <AddTagInput value={tagInputValue} onChange={handleInputChange} onKeyup={handleAddTagList} onKeyDown={handleKeyDown} />
      <div className='mt-[2.2rem] flex flex-wrap gap-[1rem] sm:mt-[1.5rem] sm:gap-[0.8rem]'>
        {tagList.length > 0 &&
          tagList.map((tag) => {
            return (
              <span key={tag} className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] leading-[2.6rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>
                {tag}
              </span>
            );
          })}
      </div>
    </>
  );
};

export default TagContent;
