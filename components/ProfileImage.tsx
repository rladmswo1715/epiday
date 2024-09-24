import Image from 'next/image';
import defaultProfile from '@/public/images/icon/default-user.svg';

interface IProfileImageProps {
  size: string;
}

const ProfileImage = ({ size }: IProfileImageProps) => {
  return (
    <div className='relative overflow-hidden rounded-full' style={{ height: size, width: size }}>
      <Image src={defaultProfile} alt='프로필 이미지' fill />
    </div>
  );
};

export default ProfileImage;
