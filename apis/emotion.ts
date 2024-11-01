import BASE_URL from '@/constant/url';
import { TEmotions } from '@/types/emotion';

interface IPostTodayEmotionParam {
  emotion: TEmotions;
}

export const postTodayEmotion = async (emotion: IPostTodayEmotionParam, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/emotionLogs/today`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(emotion),
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '감정 저장 실패', details: errorData.details };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTodayEmotion = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/emotionLogs/today?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw { message: errorData.message || '감정 불러오기 실패', details: errorData.details };
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMonthlyEmotion = async (userId: string, year: string, month: string) => {
  try {
    const response = await fetch(`${BASE_URL}/emotionLogs/monthly?userId=${userId}&year=${year}&month=${month}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw { message: errorData.message || '감정리스트 불러오기 실패', details: errorData.details };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
