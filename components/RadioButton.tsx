import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IRadioButtonProps {
  children: React.ReactNode;
  name: string;
  value: string;
  defaultChecked?: boolean;
  register?: UseFormRegister<FieldValues>;
}

const RadioButton: React.FC<IRadioButtonProps> = ({ children, name, value, defaultChecked = false, register }) => {
  return (
    <label className='flex items-center gap-[0.8rem]'>
      <input type='radio' name={name} value={value} defaultChecked={defaultChecked} {...register(name)} />
      <span className='text-[1.6rem] font-[500] leading-[2.6rem] text-var-black-600 sm:text-[2rem] sm:leading-[3.2rem]'>{children}</span>
    </label>
  );
};

export default RadioButton;
