import { useEmotionStore } from '@/store/emotionStore';
import { TEmotions } from '@/types/emotion';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

interface IEmotionItemProps {
  src: string;
  emotionText: string;
  value: TEmotions;
  isSelected: boolean;
  handleGetTodayEmotion: () => Promise<void>;
}

const EmotionItem = ({ src, emotionText, value, isSelected, handleGetTodayEmotion }: IEmotionItemProps) => {
  const { setSelectedEmotion, postEmotion } = useEmotionStore();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleClickEmotion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (session?.accessToken) {
      setSelectedEmotion(value);
      await postEmotion(session.accessToken);
      await handleGetTodayEmotion();
      queryClient.invalidateQueries({ queryKey: ['mypage', 'emotions'] });
    }
  };

  return (
    <button type='button' className='flex flex-col items-center gap-[0.8rem]' value={value} onClick={handleClickEmotion}>
      <div className={classNames('rounded-[1.6rem] bg-var-background-emotion p-[1.6rem]', { 'border-4 border-var-illust-yellow': isSelected })}>
        <Image src={src} alt={emotionText} width={48} height={48} />
      </div>
      <span className='text-[2rem] font-[600] text-var-blue-400'>{emotionText}</span>
    </button>
  );
};

export default EmotionItem;
