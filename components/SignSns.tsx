import Image from 'next/image';
import Stroke from '@/public/images/icon/stroke.svg';
import Google from '@/public/images/icon/logo_google.svg';
import Kakao from '@/public/images/icon/logo_kakao.svg';
import { signIn } from 'next-auth/react';

interface ISignSnsProps {
  pageType: 'login' | 'signUp';
}

export default function SignSns({ pageType }: ISignSnsProps) {
  const infoText = `SNS 계정으로 ${pageType === 'login' ? '로그인하기' : '간편 가입하기'}`;

  const kakaoLogin = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div>
      <div className='flex gap-[2.4rem]'>
        <Image src={Stroke} alt='장식선' width={180} height={1} />
        <span className='text-[2rem] leading-[2.6rem] text-var-blue-400'>{infoText}</span>
        <Image src={Stroke} alt='장식선' width={180} height={1} />
      </div>
      <div className='mt-[4rem] flex justify-center gap-[1.6rem]'>
        <button>
          <Image src={Google} alt='구글 로그인' width={60} height={60} />
        </button>
        <button onClick={kakaoLogin}>
          <Image src={Kakao} alt='카카오 로그인' width={60} height={60} />
        </button>
      </div>
    </div>
  );
}
