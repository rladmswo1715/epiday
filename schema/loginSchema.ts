import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('id는 이메일 형식입니다.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
