import Image from 'next/image';
import OffEye from '@/public/images/icon/off_eye.svg';
import onEye from '@/public/images/icon/on_eye.svg';
import { forwardRef, useState } from 'react';

interface IAuthInputProps {
  isValueOpen?: boolean;
  placeholderText: string;
  errorMessage?: string;
}

const AuthInput = forwardRef<HTMLInputElement, IAuthInputProps>(({ isValueOpen = false, placeholderText, errorMessage, ...rest }, ref) => {
  const [inputType, setInputType] = useState(isValueOpen);

  const handleShowClick = () => {
    setInputType(!inputType);
  };

  return (
    <div className='relative'>
      <div className='relative'>
        <input
          type={inputType ? 'password' : 'text'}
          className='h-[6.4rem] w-full rounded-[1.2rem] border-[0.1rem] border-var-blue-300 bg-var-blue-200 p-[1.6rem] text-[2rem] outline-none'
          placeholder={placeholderText}
          ref={ref}
          {...rest}
        />
        {isValueOpen && (
          <button type='button' className='absolute right-[1.6rem] top-[50%] translate-y-[-50%]' onClick={handleShowClick}>
            <Image src={inputType ? OffEye : onEye} alt='비밀번호 보이기' width={24} height={24} />
          </button>
        )}
      </div>
      {errorMessage && <span className='text-[1.6rem] leading-[2.6rem] text-var-error'>{errorMessage}</span>}
    </div>
  );
});

export default AuthInput;
