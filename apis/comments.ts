import BASE_URL from '@/constant/url';
import { TCommentData } from '@/types/comments';

type TPostCommentData = TCommentData & {
  epigramId: number;
};

type TPatchCommentData = TCommentData & {
  commentId: number;
};

export const getEpidayCommentsById = async (id: number, accessToken: string, pageParam: number, limit = 2) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${id}/comments?limit=${limit}&cursor=${pageParam}`, {
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

export const getUserComments = async (userId: string, accessToken: string, pageParam: number, limit = 4) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/comments?limit=${limit}&cursor=${pageParam}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '나의 댓글 불러오기 실패', details: errorData.details };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postAddComment = async (commentData: TPostCommentData, accessToken: string) => {
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

export const patchUpdateComment = async (commentData: TPatchCommentData, accessToken: string) => {
  try {
    const { commentId, ...dataToPatch } = commentData;

    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToPatch),
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

export const getCommentList = async (cursor: number, limit: number = 4) => {
  try {
    const response = await fetch(`${BASE_URL}/comments?limit=${limit}&cursor=${cursor}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw { message: errorData.message || '댓글 리스트 불러오기 실패', details: errorData.details };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
