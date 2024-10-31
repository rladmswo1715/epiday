import BASE_URL from '@/constant/url';

export const postLike = async (id: number, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '좋아요 실패', details: errorData.details };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLike = async (id: number, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${id}/like`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '좋아요 해제 실패', details: errorData.details };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
