import { forwardRef } from 'react';

interface ITextInputProps {
  cssStyle?: string;
  placeholder: string;
  maxLength?: number;
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(({ cssStyle, placeholder, maxLength, ...rest }, ref) => {
  const baseStyle = 'sm:h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] sm:text-[2rem] h-[4.4rem] text-[1.6rem]  sm:leading-[3.2rem] leading-[2.6rem] focus:outline-none';

  return <input className={`${baseStyle} ${cssStyle && cssStyle}`} placeholder={placeholder} maxLength={maxLength} ref={ref} {...rest} />;
});

export default TextInput;
