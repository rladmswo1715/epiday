import InnerLayout from '@/components/InnerLayout';
import MainAfterLogin from '@/components/main/afterLogin/MainAfterLogin';
import SideNav from '@/components/SideNav';

const Epidays = () => {
  return (
    <div className='relative'>
      <InnerLayout>
        <MainAfterLogin />
      </InnerLayout>
      <SideNav />
    </div>
  );
};

export default Epidays;
