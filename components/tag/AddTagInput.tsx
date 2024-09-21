interface ITextInputProps {
  cssStyle?: string;
  placeholder: string;
  maxLength?: number;
}

const AddTagInput = ({ value, onChange, onKeyup, onKeyDown }) => {
  return (
    <input
      className='h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[2rem] focus:outline-none sm:h-[4.4rem] sm:text-[1.6rem] sm:leading-[2.6rem]'
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
