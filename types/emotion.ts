export type TEmotions = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface TEmotionData {
  createdAt: string;
  emotion: TEmotions;
  userId: number;
  id: number;
}
