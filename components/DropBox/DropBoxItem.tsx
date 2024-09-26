const DropBoxItem = ({ itemText, onClick }) => {
  return (
    <li className='min-w-[13.4rem] px-[3.2rem] py-[1.2rem] text-[2rem] text-var-black-600 transition-all duration-200 hover:cursor-pointer hover:text-var-blue-400' onClick={onClick}>
      {itemText}
    </li>
  );
};

export default DropBoxItem;
