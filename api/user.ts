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
