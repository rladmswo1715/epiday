function RadioButton({ children, name, value, defaultChecked = false }) {
  return (
    <label className='flex items-center gap-[0.8rem]'>
      <input type='radio' name={name} value={value} defaultChecked={defaultChecked} />
      <span className='text-[2rem] font-[500] text-var-black-600 sm:text-[1.6rem] sm:leading-[2.6rem]'>{children}</span>
    </label>
  );
}

export default RadioButton;
