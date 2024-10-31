import BASE_URL from '@/constant/url';

interface IEpidayData {
  tags: string[];
  author: string;
  referenceUrl: string;
  content?: string;
  referenceTitle?: string;
}

export const patchEpiday = async (epidayId: number, epidayData: IEpidayData, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${epidayId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(epidayData),
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 수정 실패', details: errorData.details };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
