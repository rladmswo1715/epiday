'use client';

import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';
import SignSns from '@/components/SignSns';
import { useState } from 'react';
import { postSignUp } from '@/api/user';
import AuthInput from '@/components/input/AuthInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

const signUpSchema = z.object({
  email: z.string().email('id는 이메일 형식입니다.'),
  password: z.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, '비밀번호는 숫자, 영어, 특수문자를 포함해야 하며 8자 이상이어야 합니다.'),
  nickname: z.string().min(1),
  passwordConfirmation: z.string().min(1),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Signup() {
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpSchema>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const clearMessageOnChange = () => {
    setMessage('');
    setMessageType('');
  };

  watch((value, { name }) => {
    // 비밀번호 확인 에러 메세지 일 때, 그냥 비밀번호 입력 칸 수정해도 초기화 하려고 두번째 조건 넣음
    if (name === messageType || (messageType === 'passwordConfirmation' && name === 'password')) {
      clearMessageOnChange();
    }
  });

  const onSubmit = async (data: SignUpSchema) => {
    let shouldRedirect = false;
    setMessage('');
    setMessageType('');
    setLoading(true);
    const userInputData = {
      email: data.email,
      nickname: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };

    try {
      const result = await postSignUp(userInputData);

      if (result.user) {
        shouldRedirect = true;

        await signIn('credentials', {
          email: userInputData.email,
          password: userInputData.password,
          redirect: false,
        });
      }
    } catch (error) {
      if (error.details) {
        setMessageType(Object.keys(error.details)[0]);
      }
      setMessage(error.message);
    } finally {
      setLoading(false);
    }

    if (shouldRedirect) {
      router.replace('/');
    }
  };

  return (
    <section className='flex w-[64rem] flex-col items-center pb-[17.5rem] pt-[8rem]'>
      {loading && <Spinner />}
      <Image src={Logo} alt='로고' width={172} height={48} className='mb-[8rem]' />
      <form className='mb-[6rem] flex w-full flex-col gap-[4rem]' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <span className='mb-[2rem] text-[2rem] font-[500] text-var-blue-900'>이메일</span>
          <AuthInput {...register('email')} placeholderText='이메일' errorMessage={(messageType === 'email' && message) || errors.email?.message} />
        </div>
        <div className='flex flex-col'>
          <span className='mb-[2rem] text-[2rem] font-[500] text-var-blue-900'>비밀번호</span>
          <div className='relative mb-[1.6rem]'>
            <AuthInput isValueOpen {...register('password')} placeholderText='비밀번호' />
          </div>
          <div className='relative mb-[0.8rem]'>
            <AuthInput
              isValueOpen
              {...register('passwordConfirmation')}
              placeholderText='비밀번호 확인'
              errorMessage={(messageType === 'passwordConfirmation' && message) || errors.passwordConfirmation?.message || errors.password?.message}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='mb-[2rem] text-[2rem] font-[500] text-var-blue-900'>닉네임</span>
          <AuthInput {...register('nickname')} placeholderText='닉네임' errorMessage={messageType === 'nickname' && message} />
        </div>
        <button
          className={`h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-200 ${isValid ? 'bg-var-black-500' : 'bg-var-blue-300'} text-[2rem] font-[600] text-[#FFF]`}
          disabled={!isValid}
        >
          가입하기
        </button>
      </form>
      <SignSns pageType='signUp' />
    </section>
  );
}
