import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';
import OffEye from '@/public/images/icon/off_eye.svg';
import Link from 'next/link';
import SnsLogin from '@/components/SignSns';

export default function Login() {
  return (
    <section className='flex w-[64rem] flex-col items-center gap-[6rem] pb-[21.9rem] pt-[21.3rem]'>
      <Image src={Logo} alt='로고' width={152} height={48} />

      <div className='w-[100%]'>
        <div className='flex flex-col gap-[1.6rem]'>
          <input className='h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 bg-var-background p-[1.6rem] text-[2rem] outline-none' placeholder='이메일' />
          <div className='relative'>
            <input className='h-[6.4rem] w-full rounded-[1.2rem] border-[0.1rem] border-var-blue-300 bg-var-background p-[1.6rem] text-[2rem] outline-none' placeholder='비밀번호' />
            <button className='absolute right-[1.6rem] top-[50%] translate-y-[-50%]'>
              <Image src={OffEye} alt='비밀번호' width={24} height={24} />
            </button>
          </div>
          <button className='h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-200 bg-var-blue-300 text-[2rem] font-[600] text-[#FFF]'>로그인</button>
        </div>
        <div className='mt-[1rem] flex items-center justify-end gap-[0.8rem] pr-[0.8rem] text-[2rem] font-[500]'>
          <span className='text-var-blue-400'>회원이 아니신가요?</span>
          <Link href={'/'} className='leading-[2.6rem] text-var-black-500 underline'>
            가입하기
          </Link>
        </div>
      </div>

      <SnsLogin pageType='login' />
    </section>
  );
}
