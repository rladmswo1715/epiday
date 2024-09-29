import Image from 'next/image';
import defaultProfile from '@/public/images/icon/default-user.svg';

interface IProfileImageProps {
  size: string;
  userSetting: string;
  onClick?: () => void;
}

const ProfileImage = ({ size, userSetting, onClick }: IProfileImageProps) => {
  const isClickable = Boolean(onClick);

  return (
    <button
      className={`relative flex-shrink-0 overflow-hidden rounded-full ${isClickable ?? 'pointer-events-none cursor-default'}`}
      style={{ height: size, width: size }}
      onClick={isClickable ? onClick : undefined}
      disabled={isClickable ? false : true}
    >
      <Image src={userSetting ? userSetting : defaultProfile} alt='프로필 이미지' fill />
    </button>
  );
};

export default ProfileImage;
