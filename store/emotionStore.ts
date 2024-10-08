import { getTodayEmotion, postTodayEmotion } from '@/api/emotion';
import { useSession } from 'next-auth/react';
import { create } from 'zustand';

type TEmotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY' | null;

type TResponseEmotion = {
  id: number;
  userId: number;
  emotion: string;
  createdAt: string;
};

interface IEmotionStore {
  selectedEmotion: TEmotion;
  setSelectedEmotion: (emotion: TEmotion) => void;
  postEmotion: (accessToken: string) => Promise<void>;
  getEmotion: (userId: string) => Promise<Response>;
}

export const useEmotionStore = create<IEmotionStore>((set) => ({
  selectedEmotion: null,
  setSelectedEmotion: (emotion) => set({ selectedEmotion: emotion }),
  postEmotion: async (accessToken) => {
    const { selectedEmotion } = useEmotionStore.getState();

    if (selectedEmotion) {
      const postData = {
        emotion: selectedEmotion,
      };
      try {
        await postTodayEmotion(postData, accessToken);
      } catch (error) {}
    }
  },
  getEmotion: async (userId) => {
    try {
      if (!userId) return;

      const result = await getTodayEmotion(userId);
      if (result.status === 204) return undefined;

      return result;
    } catch (error) {
      alert(error.message);
    }
  },
}));
