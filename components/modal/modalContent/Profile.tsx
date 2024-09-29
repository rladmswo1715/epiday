import useModalScrollBlock from '@/hooks/useModalScrollBlock';
import Image from 'next/image';
import close from '@/public/images/icon/close.svg';
import { useModalStore } from '@/store/modalStore';
import ProfileImage from '@/components/ProfileImage';

const Profile = () => {
  const { closeModal, modalProps } = useModalStore();
  useModalScrollBlock();

  return (
    <div className='w-[36rem] rounded-[2.4rem] bg-var-background px-[4rem] pb-[3.2rem] pt-[2.4rem]'>
      <button
        type='button'
        className='flex w-full'
        onClick={(e) => {
          e.preventDefault();
          closeModal();
        }}
      >
        <Image src={close} alt='닫기' width={20} height={20} className='ml-auto' />
      </button>
      <div className='flex flex-col items-center gap-[2.4rem]'>
        <ProfileImage size='48px' userSetting={modalProps.userImage} />
        <span className='text-[2rem] font-[600] text-var-black-400'>{modalProps.userNickname}</span>
      </div>
    </div>
  );
};

export default Profile;
