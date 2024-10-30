import useModalScrollBlock from '@/hooks/useModalScrollBlock';
import Image from 'next/image';
import close from '@/public/images/icon/close.svg';
import { useModalStore } from '@/store/modalStore';
import ProfileImage from '@/components/ProfileImage';
import { useRef, useState } from 'react';
import { patchEditProfile, postProfileImageUrl } from '@/api/user';
import { editProfileSchema } from '@/schema/editProfileSchema';
import { useMutation } from '@tanstack/react-query';
import { TPatchUser } from '@/types/user';
import { useSession } from 'next-auth/react';

const DEFAULT_IMAGE_URL = process.env.NEXT_PUBLIC_DEFAULT_IMG_PATH;

const Profile = () => {
  const { update } = useSession();
  const { closeModal, modalProps } = useModalStore();
  useModalScrollBlock();
  const [currentImg, setCurrentImage] = useState<string>(modalProps.userImage);
  const [currentNickname, setCurrentNickname] = useState<string>(modalProps.userNickname);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editProfileMutation = useMutation({
    mutationFn: (patchProfileData: TPatchUser) => patchEditProfile(patchProfileData, modalProps.userToken),
    onSuccess: () => {
      closeModal();
      update();
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleChangeImage = async () => {
    const formData = new FormData();
    const imgFile = fileInputRef.current?.files;
    if (imgFile) {
      formData.append('image', imgFile[0]);
    }

    const { url } = await postProfileImageUrl(formData, modalProps.userToken);
    if (url) setCurrentImage(url);
  };

  const handleEditProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      editProfileSchema.parse(currentNickname);
      const patchProfileData = { image: currentImg, nickname: currentNickname };
      editProfileMutation.mutate(patchProfileData);
    } catch (error) {
      setErrorMsg(error.errors[0].message);
    }
  };

  const handleImageReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentImage(DEFAULT_IMAGE_URL);
  };

  return (
    <form className='w-[36rem] rounded-[2.4rem] bg-var-background px-[4rem] pb-[3.2rem] pt-[2.4rem] sm:w-[40rem]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[1.8rem] font-[600] text-var-black-500'>프로필 편집</h3>
        <button
          type='button'
          className='flex'
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          <Image src={close} alt='닫기' width={20} height={20} className='ml-auto' />
        </button>
      </div>
      <div className='mt-[4rem] flex flex-col items-center gap-[0.6rem]'>
        <ProfileImage size='80px' userSetting={currentImg} onClick={handleImageClick} />
        <input type='file' ref={fileInputRef} className='hidden' onChange={handleChangeImage} />
        <button className='rounded-[0.8rem] bg-var-blue-400 px-[2rem] text-[1rem] font-[500] text-var-blue-100' onClick={handleImageReset}>
          초기화
        </button>
      </div>
      <div className='relative border-b-[0.2rem] border-var-blue-200 after:absolute after:bottom-[-0.2rem] after:left-0 after:h-[0.2rem] after:w-full after:origin-left after:scale-x-0 after:bg-var-blue-400 after:transition-transform after:duration-300 focus-within:after:scale-x-100'>
        <input value={currentNickname} className='mt-[2rem] w-full bg-var-background text-[1.5rem] font-[600] outline-none' onChange={(e) => setCurrentNickname(e.target.value)} maxLength={10} />
      </div>
      {errorMsg && <span className='text-[1rem] font-[500] text-var-error'>{errorMsg}</span>}
      <div className='mt-[2rem] flex justify-end gap-[0.4rem]'>
        <button className='rounded-[0.8rem] bg-var-black-400 px-[2rem] text-[1rem] font-[500] text-var-blue-100' onClick={handleEditProfile}>
          저장
        </button>
        <button
          className='rounded-[0.8rem] border-[0.1rem] border-var-black-400 bg-var-blue-100 px-[1.9rem] text-[1rem] font-[500] text-var-black-400'
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default Profile;
