import BASE_URL from '@/constant/url';

export const getEpidayData = async (id: number, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 불러오기 실패', details: errorData.details };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEpidayList = async (pageParam: number, searchText = '', writerId?: string, limit = 6) => {
  let queryString = `limit=${limit}&cursor=${pageParam}`;
  if (searchText && searchText !== '') queryString += `&keyword=${searchText}`;
  if (writerId) queryString += `&writerId=${writerId}`;

  try {
    const response = await fetch(`${BASE_URL}/epigrams/?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorData = await response.json();

      throw { message: errorData.message || '에피데이 리스트 불러오기 실패', details: errorData.details };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTodayEpiday = async () => {
  try {
    const response = await fetch(`${BASE_URL}/epigrams/today`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('response ::', response);
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '에피데이 불러오기 실패', details: errorData.details };
    }

    return response;
  } catch (error) {
    console.error('오늘의 에피그램 API ERROR: ', error);
    throw error;
  }
};
