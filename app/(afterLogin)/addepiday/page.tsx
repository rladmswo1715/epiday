import ContentTitle from '@/components/ContentTitle';
import RadioButton from '@/components/RadioButton';

const AddEpiday = () => {
  const isValid = true;
  return (
    <section className='w-[64rem] pb-[5.2rem] pt-[5.6rem] sm:px-[2.4rem] sm:pb-[3rem] sm:pt-[2.4rem]'>
      <h2 className='mb-[4rem] text-[2.4rem] font-[600] leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem]'>에피데이 만들기</h2>
      <form>
        <div className='flex flex-col gap-[5.4rem] sm:gap-[4rem]'>
          <ContentTitle contentTitle='내용' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]' isRequired>
            <textarea
              className='scrollbar-hide h-[14.8rem] w-[100%] overflow-scroll rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1rem] py-[1.6rem] text-[2rem] sm:text-[1.6rem] sm:leading-[2.6rem]'
              placeholder='500자 이내로 입력해주세요.'
            />
          </ContentTitle>
          <ContentTitle contentTitle='저자' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]' isRequired>
            <div className='flex gap-[2.4rem]'>
              <RadioButton name='author' value='a' defaultChecked>
                직접 입력
              </RadioButton>
              <RadioButton name='author' value='a'>
                알 수 없음
              </RadioButton>
              <RadioButton name='author' value='a'>
                본인
              </RadioButton>
            </div>
            <input
              className='mt-[1.6rem] h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[2rem] sm:mt-[1.2rem] sm:h-[4.4rem] sm:text-[1.6rem] sm:leading-[2.6rem]'
              placeholder='저자 이름 입력'
            />
          </ContentTitle>
          <ContentTitle contentTitle='출처' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]'>
            <input
              className='h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[2rem] sm:h-[4.4rem] sm:text-[1.6rem] sm:leading-[2.6rem]'
              placeholder='출처 제목 입력'
            />
            <input
              className='mt-[1.6rem] h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[2rem] sm:h-[4.4rem] sm:text-[1.6rem] sm:leading-[2.6rem]'
              placeholder='URL (ex. https://www.website.com)'
            />
          </ContentTitle>
          <ContentTitle contentTitle='태그' fontSizeStyle='text-[2rem] sm:text-[1.4rem]' marginStyle='mb-[2.4rem] sm:mb-[0.8rem]'>
            <input
              className='h-[6.4rem] rounded-[1.2rem] border-[0.1rem] border-var-blue-300 px-[1.6rem] text-[2rem] sm:h-[4.4rem] sm:text-[1.6rem] sm:leading-[2.6rem]'
              placeholder='입력하여 태그 작성 (최대 10자)'
            />
            <div className='mt-[2.2rem] flex flex-wrap gap-[1rem] sm:mt-[1.5rem] sm:gap-[0.8rem]'>
              <span className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] leading-[2.6rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>공유하고싶은명언추가</span>
              <span className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>공유하고싶은명언추가</span>
              <span className='rounded-[2.2rem] bg-var-background px-[1.2rem] py-[1.4rem] text-[2.4rem] text-var-black-300 sm:py-[0.8rem] sm:text-[1.6rem]'>공유하고싶22가</span>
            </div>
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
