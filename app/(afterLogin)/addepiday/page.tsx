'use client';

import ContentTitle from '@/components/ContentTitle';
import TextInput from '@/components/input/TextInput';
import RadioButton from '@/components/RadioButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import TagContent from '@/components/tag/TagContent';
import { useTagStore } from '@/store/tagStore';

import { getSession, useSession } from 'next-auth/react';

const addEpidaySchema = z
  .object({
    content: z.string().min(1, '내용을 입력해주세요.'),
    author: z.enum(['write', 'unknown', 'self']),
    authorName: z.string().optional(),
    referenceTitle: z.string().optional(),
    referenceUrl: z
      .string()
      .optional()
      .refine((value) => !value || /^https?:\/\/.+/.test(value), {
        message: '유효한 URL을 입력해주세요. (ex. https:// ~)',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.author === 'write' && !data.authorName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['authorName'],
        message: '저자 이름을 입력해주세요.',
      });
    }
  });

type AddEpidaySchema = z.infer<typeof addEpidaySchema>;

const AddEpiday = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue, // 저자 본인 선택했을 때 내 이름 가져오기 할 때 필요해서 사용
    formState: { errors, isValid },
    clearErrors,
  } = useForm<AddEpidaySchema>({
    mode: 'onChange',
    resolver: zodResolver(addEpidaySchema),
  });

  const { tagList } = useTagStore();
  const { data: session } = useSession();

  const content = useWatch({
    control,
    defaultValue: '',
    name: 'content',
  });

  const author = useWatch({
    control,
    defaultValue: 'write',
    name: 'author',
  });

  useEffect(() => {
    clearErrors('authorName');
    console.log(session);
    if (author === 'self') {
      setValue('authorName', '홍길동'); // 저자 본인 선택했을 때 내 이름 가져오기
    } else if (author === 'unknown') {
      setValue('authorName', '알 수 없음');
    } else {
      setValue('authorName', '');
    }
  }, [author, setValue]);

  const onSubmit = async (data: AddEpidaySchema) => {};

  return (
    <section className='w-[64rem] pb-[5.2rem] pt-[5.6rem] sm:px-[2.4rem] sm:pb-[3rem] sm:pt-[2.4rem]'>
      <h2 className='mb-[4rem] text-[2.4rem] font-[600] leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem]'>에피데이 만들기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-[5.4rem] sm:gap-[4rem]'>
          <ContentTitle contentTitle='내용' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]' isRequired>
            <textarea
              className={`h-[14.8rem] w-[100%] overflow-scroll rounded-[1.2rem] border-[0.1rem] ${errors.content ? 'border-var-error' : 'border-var-blue-300'} px-[1rem] py-[1.6rem] text-[2rem] scrollbar-hide focus:outline-none sm:text-[1.6rem] sm:leading-[2.6rem]`}
              maxLength={500}
              placeholder='500자 이내로 입력해주세요.'
              {...register('content')}
            />
            <div className='mt-[0.6rem] flex justify-between text-[1.6rem] leading-[2.6rem] sm:text-[1.3rem] sm:leading-[2.2rem]'>
              <span className='text-var-error'>{errors.content?.message}</span>
              <span className='text-var-black-300'>{content.length}/500</span>
            </div>
          </ContentTitle>
          <ContentTitle contentTitle='저자' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]' isRequired>
            <div className='flex gap-[2.4rem]'>
              <RadioButton name='author' value='write' register={register} defaultChecked>
                직접 입력
              </RadioButton>
              <RadioButton name='author' register={register} value='unknown'>
                알 수 없음
              </RadioButton>
              <RadioButton name='author' register={register} value='self'>
                본인
              </RadioButton>
            </div>
            <TextInput cssStyle='mt-[1.6rem] sm:mt-[1.2rem]' placeholder='저자 이름 입력' maxLength={30} disabled={author === 'unknown' || author === 'self'} {...register('authorName')} />
            <span className='mt-[0.6rem] text-[1.6rem] leading-[2.6rem] text-var-error sm:text-[1.3rem] sm:leading-[2.2rem]'>{errors.authorName?.message}</span>
          </ContentTitle>
          <ContentTitle contentTitle='출처' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]'>
            <TextInput placeholder='출처 제목 입력' maxLength={100} {...register('referenceTitle')} />
            <TextInput cssStyle='mt-[1.6rem] sm:mt-[0.8rem]' placeholder='URL (ex. https://www.website.com)' {...register('referenceUrl')} />
            <span className='mt-[0.6rem] text-[1.6rem] leading-[2.6rem] text-var-error sm:text-[1.3rem] sm:leading-[2.2rem]'>{errors.referenceUrl?.message}</span>
          </ContentTitle>
          <ContentTitle contentTitle='태그' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]'>
            <TagContent />
          </ContentTitle>
        </div>
        <button
          className={`mt-[4rem] h-[6.4rem] w-[100%] rounded-[1.2rem] border-[0.1rem] border-var-blue-200 sm:mt-[2.4rem] sm:h-[4.8rem] ${isValid ? 'bg-var-black-500' : 'bg-var-blue-300'} text-[2rem] font-[600] text-[#FFF] sm:text-[1.6rem] sm:leading-[2.6rem]`}
          disabled={!isValid}
        >
          작성 완료
        </button>
      </form>
    </section>
  );
};

export default AddEpiday;
