import BASE_URL from '@/constant/url';

interface IPostSignUpParam {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export const postSignUp = async (userInputData: IPostSignUpParam) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInputData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw { message: errorData.message || '회원가입 실패', details: errorData.details };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMyInfo = async (accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.message === 'jwt expired') throw { message: '토큰 유효기간 만료' };
      throw { message: errorData.message || '내 정보 불러오기 실패', details: errorData.details };
    }

    const data = await response.json();
    console.log('data::', data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
