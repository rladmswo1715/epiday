import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('id는 이메일 형식입니다.'),
  password: z.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/, '비밀번호는 숫자, 영어, 특수문자를 포함해야 하며 8자 이상이어야 합니다.'),
  nickname: z.string().min(1),
  passwordConfirmation: z.string().min(1),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
