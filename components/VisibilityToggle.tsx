import { Dispatch, SetStateAction } from 'react';

interface IVisibilityToggleProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const VisibilityToggle = ({ isVisible, setIsVisible }: IVisibilityToggleProps) => {
  return (
    <div className='flex items-center gap-[0.8rem]'>
      <span className='text-[1.6rem] font-[600] leading-[2.6rem] text-var-gray-400'>비공개</span>
      <label className='relative inline-flex cursor-pointer items-center'>
        <input type='checkbox' className='peer sr-only' checked={isVisible} onChange={() => setIsVisible(!isVisible)} />
        <div className='h-[2.4rem] w-[4.2rem] rounded-full bg-var-gray-200 transition-colors focus:outline-none peer-checked:bg-var-black-600'></div>
        <div className='absolute left-[0.5rem] top-[0.4rem] h-[1.6rem] w-[1.6rem] rounded-full bg-white transition-all peer-checked:translate-x-[1.6rem]'></div>
      </label>
    </div>
  );
};

export default VisibilityToggle;
