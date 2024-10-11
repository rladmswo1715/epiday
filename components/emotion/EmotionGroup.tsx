import { useEmotionStore } from '@/store/emotionStore';
import EmotionItem from './EmotionItem';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { EMOTION_OPTIONS } from '@/constant/emotion';

const EmotionGroup = () => {
  const { getEmotion, selectedEmotion } = useEmotionStore();
  const { data: session } = useSession();
  const [todayEmotion, setTodayEmotion] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    handleGetTodayEmotion();
  }, [selectedEmotion, session]);

  const handleGetTodayEmotion = async () => {
    const result = await getEmotion(session?.id);

    if (result) {
      const data = await result.json();
      setTodayEmotion(data?.emotion);
    }
  };

  return (
    <div className='mx-auto flex gap-[1.6rem]'>
      {EMOTION_OPTIONS.map((item) => {
        return <EmotionItem key={item.id} src={item.src} emotionText={item.emotionText} value={item.value} isSelected={todayEmotion === item.value} />;
      })}
    </div>
  );
};

export default EmotionGroup;
