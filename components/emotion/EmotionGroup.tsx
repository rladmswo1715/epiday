import EmotionItem from './EmotionItem';

const EmotionGroup = () => {
  return (
    <div className='mx-auto flex gap-[1.6rem]'>
      <EmotionItem src='/images/icon/emotion-moved.svg' alt='감동' emotionText='감동' />
      <EmotionItem src='/images/icon/emotion-happy.svg' alt='기쁨' emotionText='기쁨' />
      <EmotionItem src='/images/icon/emotion-worried.svg' alt='고민' emotionText='고민' />
      <EmotionItem src='/images/icon/emotion-sad.svg' alt='슬픔' emotionText='슬픔' />
      <EmotionItem src='/images/icon/emotion-angry.svg' alt='분노' emotionText='분노' />
    </div>
  );
};

export default EmotionGroup;
