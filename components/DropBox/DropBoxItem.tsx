interface IDropBoxItemProps {
  itemText: string;
  onClick: () => void;
}

const DropBoxItem = ({ itemText, onClick }: IDropBoxItemProps) => {
  return (
    <li className='min-w-[13.6rem] px-[2.8rem] py-[1.2rem] text-center text-[1.8rem] text-var-black-600 transition-all duration-200 hover:cursor-pointer hover:text-var-blue-400' onClick={onClick}>
      {itemText}
    </li>
  );
};

export default DropBoxItem;
