import { forwardRef } from 'react';

interface ITextInputProps {
  cssStyle?: string;
  placeholder: string;
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(({ cssStyle, placeholder, ...rest }, ref) => {
  const baseStyle = 'h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[2rem] sm:h-[4.4rem] sm:text-[1.6rem] sm:leading-[2.6rem]';

  return <input className={`${baseStyle} ${cssStyle && cssStyle}`} placeholder={placeholder} ref={ref} {...rest} />;
});

export default TextInput;
