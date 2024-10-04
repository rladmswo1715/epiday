import EmotionGroup from '@/components/emotion/EmotionGroup';

const EmotionContainer = () => {
  return (
    <div className='flex flex-col'>
      <h3 className='mb-[4rem] text-[2.4rem] font-[600] text-var-black-600'>오늘의 감정은 어떠신가요?</h3>
      <EmotionGroup />
    </div>
  );
};

export default EmotionContainer;
