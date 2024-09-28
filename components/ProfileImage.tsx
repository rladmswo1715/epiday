import Image from 'next/image';
import defaultProfile from '@/public/images/icon/default-user.svg';

interface IProfileImageProps {
  size: string;
  userSetting: string;
}

const ProfileImage = ({ size, userSetting }: IProfileImageProps) => {
  return (
    <div className='relative flex-shrink-0 overflow-hidden rounded-full' style={{ height: size, width: size }}>
      <Image src={userSetting ? userSetting : defaultProfile} alt='프로필 이미지' fill />
    </div>
  );
};

export default ProfileImage;
