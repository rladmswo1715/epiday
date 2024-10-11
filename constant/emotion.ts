import { TEmotions } from '@/types/emotion';

export const EMOTIONS: TEmotions[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];

export const EMOTION_IMAGE_SRC: Record<TEmotions, string> = {
  MOVED: '/images/icon/emotion-moved.svg',
  HAPPY: '/images/icon/emotion-happy.svg',
  WORRIED: '/images/icon/emotion-worried.svg',
  SAD: '/images/icon/emotion-sad.svg',
  ANGRY: '/images/icon/emotion-angry.svg',
};

const createEmotionOption = (id: number, emotion: TEmotions, emotionText: string, backgroundColor: string) => ({
  id,
  src: EMOTION_IMAGE_SRC[emotion],
  emotionText,
  value: emotion,
  backgroundColor,
});

export const EMOTION_OPTIONS = EMOTIONS.map((emotion, index) =>
  createEmotionOption(
    index + 1,
    emotion,
    {
      MOVED: '감동',
      HAPPY: '기쁨',
      WORRIED: '고민',
      SAD: '슬픔',
      ANGRY: '분노',
    }[emotion],
    {
      MOVED: '#FBC85B',
      HAPPY: '#48BB98',
      WORRIED: '#6A82A9',
      SAD: '#9A695E',
      ANGRY: '#E46E80',
    }[emotion],
  ),
);
