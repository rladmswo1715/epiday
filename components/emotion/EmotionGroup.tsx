import { useEmotionStore } from '@/store/emotionStore';
import EmotionItem from './EmotionItem';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { EMOTION_OPTIONS } from '@/constant/emotion';
import Spinner from '../Spinner';

const EmotionGroup = () => {
  const { getEmotion, selectedEmotion, setSelectedEmotion } = useEmotionStore();
  const { data: session } = useSession();
  const [todayEmotion, setTodayEmotion] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    handleGetTodayEmotion();
  }, [session]);

  useEffect(() => {
    if (selectedEmotion) {
      setTodayEmotion(selectedEmotion);
    }
  }, [selectedEmotion]);

  const handleGetTodayEmotion = async () => {
    const result = await getEmotion(session?.id);

    if (result) {
      const data = await result.json();
      setTodayEmotion(data?.emotion);
      setSelectedEmotion(data?.emotion);
    }
  };

  return (
    <div className='mx-auto flex gap-[1.6rem]'>
      {EMOTION_OPTIONS.map((item) => {
        return <EmotionItem key={item.id} src={item.src} emotionText={item.emotionText} value={item.value} isSelected={todayEmotion === item.value} handleGetTodayEmotion={handleGetTodayEmotion} />;
      })}
    </div>
  );
};

export default EmotionGroup;
