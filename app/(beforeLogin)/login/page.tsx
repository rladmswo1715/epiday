'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';
import Link from 'next/link';
import SnsLogin from '@/components/SignSns';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/input/AuthInput';
import Spinner from '@/components/Spinner';
import { loginSchema, LoginSchema } from '@/schema/loginSchema';

export default function Login() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setMessage('');
    setFormErrors({});
    setLoading(true);

    // 유효성 검사 트리거
    const isValid = await trigger();
    if (!isValid) {
      setFormErrors({
        email: errors.email?.message,
        password: errors.password?.message,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.error) {
        setMessage('아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.');
      } else {
        router.replace('/epidays');
      }
    } catch (error) {
      setMessage('로그인 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const combinedMessage = message || formErrors.email || formErrors.password;

  return (
    <section className='relative mx-auto flex w-[64rem] flex-col items-center gap-[6rem] pb-[21.9rem] pt-[21.3rem]'>
      {loading && <Spinner />}
      <Image src={Logo} alt='로고' width={152} height={48} />

      <div className='w-[100%]'>
        <form className='flex flex-col gap-[1.6rem]' onSubmit={handleSubmit(onSubmit)}>
          <AuthInput {...register('email')} placeholderText='이메일' />
          <AuthInput isValueOpen {...register('password')} placeholderText='비밀번호' errorMessage={combinedMessage} />
          <button
            className={`h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-200 ${isValid ? 'bg-var-black-500' : 'bg-var-blue-300'} text-[2rem] font-[600] text-[#FFF]`}
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
        <div className='mt-[1rem] flex items-center justify-end gap-[0.8rem] pr-[0.8rem] text-[2rem] font-[500]'>
          <span className='text-var-blue-400'>회원이 아니신가요?</span>
          <Link href={'/signup'} className='leading-[2.6rem] text-var-black-500 underline'>
            가입하기
          </Link>
        </div>
      </div>

      <SnsLogin pageType='login' />
    </section>
  );
}
