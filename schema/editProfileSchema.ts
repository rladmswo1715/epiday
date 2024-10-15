import { z } from 'zod';

export const editProfileSchema = z.string().min(1, '닉네임을 입력해주세요.');

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
