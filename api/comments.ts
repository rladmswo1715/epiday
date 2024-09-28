import BASE_URL from '@/constant/url';

export const getEpidayCommentsById = async (id: number, accessToken: string, limit = 5) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${id}/comments?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 댓글 불러오기 실패', details: errorData.details };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type CommentData = {
  epigramId: number;
  isPrivate: boolean;
  content: string;
};

export const postAddComment = async (commentData: CommentData, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 댓글 등록 실패', details: errorData.details };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (id: number, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 댓글 삭제 실패', details: errorData.details };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
