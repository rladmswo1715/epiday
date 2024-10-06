const EMOTION_OPTIONS: {
  id: number;
  src: string;
  emotionText: string;
  value: 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';
}[] = [
  {
    id: 1,
    src: '/images/icon/emotion-moved.svg',
    emotionText: '감동',
    value: 'MOVED',
  },
  {
    id: 2,
    src: '/images/icon/emotion-happy.svg',
    emotionText: '기쁨',
    value: 'HAPPY',
  },
  {
    id: 3,
    src: '/images/icon/emotion-worried.svg',
    emotionText: '고민',
    value: 'WORRIED',
  },
  {
    id: 4,
    src: '/images/icon/emotion-sad.svg',
    emotionText: '슬픔',
    value: 'SAD',
  },
  {
    id: 5,
    src: '/images/icon/emotion-angry.svg',
    emotionText: '분노',
    value: 'ANGRY',
  },
];

export default EMOTION_OPTIONS;
