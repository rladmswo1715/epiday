import { getTodayEmotion, postTodayEmotion } from '@/api/emotion';
import { TEmotions } from '@/types/emotion';
import { create } from 'zustand';

interface IEmotionStore {
  selectedEmotion: TEmotions | null;
  setSelectedEmotion: (emotion: TEmotions | null) => void;
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
