'use client';

import Image from 'next/image';
import Logo from '@/public/images/icon/logo.svg';
import OffEye from '@/public/images/icon/off_eye.svg';
import SignSns from '@/components/SignSns';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { postSignUp } from '@/api/user';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirmation: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    const userInputData = {
      email,
      nickname,
      password,
      passwordConfirmation,
    };

    try {
      const result = await postSignUp(userInputData);
      console.log('result::', result);
      // 성공 후 처리
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className='flex w-[64rem] flex-col items-center pb-[17.5rem] pt-[8rem]'>
      <Image src={Logo} alt='로고' width={172} height={48} className='mb-[8rem]' />
      <form className='mb-[6rem] flex w-full flex-col gap-[4rem]' onSubmit={onSubmit}>
        <div className='flex flex-col'>
          <span className='mb-[2rem] text-[2rem] font-[500] text-var-blue-900'>이메일</span>
          <input type='text' value={email} className='h-[6.4rem] rounded-[1.2rem] border-none bg-var-blue-200 p-[1.6rem] text-[2rem] outline-none' placeholder='이메일' onChange={onChangeEmail} />
        </div>
        <div className='flex flex-col'>
          <span className='mb-[2rem] text-[2rem] font-[500] text-var-blue-900'>비밀번호</span>
          <div className='relative mb-[1.6rem]'>
            <input
              type='password'
              value={password}
              className='h-[6.4rem] w-full rounded-[1.2rem] border-none bg-var-blue-200 p-[1.6rem] text-[2rem] outline-none'
              placeholder='비밀번호'
              onChange={onChangePassword}
            />
            <button className='absolute right-[1.6rem] top-[50%] translate-y-[-50%]'>
              <Image src={OffEye} alt='비밀번호' width={24} height={24} />
            </button>
          </div>
          <div className='relative mb-[0.8rem]'>
            <input
              type='password'
              value={passwordConfirmation}
              className='h-[6.4rem] w-full rounded-[1.2rem] border-none bg-var-blue-200 p-[1.6rem] text-[2rem] outline-none'
              placeholder='비밀번호 확인'
              onChange={onChangePasswordConfirmation}
            />
            <button className='absolute right-[1.6rem] top-[50%] translate-y-[-50%]'>
              <Image src={OffEye} alt='비밀번호 확인' width={24} height={24} />
            </button>
          </div>
          <span className='text-[1.6rem] leading-[2.6rem] text-var-error'>숫자, 영어, 특수문자 포함 12자 이상 입력해주세요.</span>
        </div>
        <div className='flex flex-col'>
          <span className='mb-[2rem] text-[2rem] font-[500] text-var-blue-900'>닉네임</span>
          <input
            type='text'
            value={nickname}
            className='h-[6.4rem] rounded-[1.2rem] border-none bg-var-blue-200 p-[1.6rem] text-[2rem] outline-none'
            placeholder='닉네임'
            onChange={onChangeNickname}
          />
        </div>
        <div>{message}</div>
        <button className='h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-200 bg-var-blue-300 text-[2rem] font-[600] text-[#FFF]'>가입하기</button>
      </form>
      <SignSns pageType='signUp' />
    </section>
  );
}
