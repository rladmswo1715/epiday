import { HashLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <HashLoader />
    </div>
  );
};

export default Spinner;
