'use client';

import ContentTitle from '@/components/ContentTitle';
import TextInput from '@/components/input/TextInput';
import RadioButton from '@/components/RadioButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import TagContent from '@/components/tag/TagContent';
import { useTagStore } from '@/store/tagStore';
import { postAddEpiday } from '@/api/postEpiday';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { addEpidaySchema, AddEpidaySchema } from '@/schema/addEpidaySchema';
import { patchEpiday } from '@/api/patchEpiday';
import InnerLayout from '../InnerLayout';

type EpidayFormProps = {
  epidayId?: number;
  initialData?: AddEpidaySchema;
  isEdit?: boolean;
};

const EpidayForm = ({ epidayId, initialData, isEdit = false }: EpidayFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<AddEpidaySchema>({
    mode: 'onChange',
    resolver: zodResolver(addEpidaySchema),
    defaultValues: isEdit ? initialData : { author: 'write' },
  });

  const hasTagsBeenAdded = useRef(false); // 에피데이 수정페이지 태그 두번 돌아서 추가
  const { tagList, addTag } = useTagStore();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

    if (author === 'self') {
      setValue('authorName', session.nickname); // 저자 본인 선택했을 때 내 이름 가져오기
    } else if (author === 'unknown') {
      setValue('authorName', '알 수 없음');
    } else {
      setValue('authorName', '');
    }
  }, [author, setValue]);

  useEffect(() => {
    if (isEdit && initialData?.tags && !hasTagsBeenAdded.current) {
      initialData.tags.forEach((tag) => {
        addTag(tag);
      });
      hasTagsBeenAdded.current = true;
    }

    if (isEdit && initialData?.author) {
      if (initialData.author !== 'unknown' && initialData.author !== 'self') {
        setValue('author', 'write');
        setValue('authorName', initialData.author);
      } else {
        setValue('author', initialData.author);
      }
    }
  }, []);

  const onSubmit = async (data: AddEpidaySchema) => {
    // 요청 데이터에 tags 추가 / 출처URL 미입력 시 기본값 설정 / authorName값 author로 옮기기
    const { authorName, referenceUrl, ...rest } = data;

    // 라디오버튼 '본인' 누르면 본인:000 으로 저장 (DB에 라디오버튼 값 저장 안해서 자체 로직 추가)
    const author = data.author === 'self' ? `본인:${authorName}` : authorName || data.author;

    const epidayData = {
      ...rest,
      tags: tagList,
      author: author,
      referenceUrl: referenceUrl || 'http://null', // DB Validation 잘못 설정으로 빈 값일 때 기본값 설정 (input박스엔 빈값으로 표시)
    };

    try {
      setLoading(true);
      let result = '';
      if (isEdit) {
        result = await patchEpiday(epidayId, epidayData, session?.accessToken);
      } else {
        result = await postAddEpiday(epidayData, session?.accessToken);
      }

      if (result && result !== '') {
        // 상세페이지 만들면 해당 에피데이 상세페이지로 이동하기로 바꿔야 됨 (writerId)
        router.replace('/');
      }
    } catch (error) {
      alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-var-blue-100'>
      <InnerLayout>
        <section className='pb-[5.2rem] pt-[5.6rem] sm:pb-[3rem] sm:pt-[2.4rem]'>
          {loading && <Spinner />}
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
              {isEdit ? '수정 완료' : '작성 완료'}
            </button>
          </form>
        </section>
      </InnerLayout>
    </div>
  );
};

export default EpidayForm;
