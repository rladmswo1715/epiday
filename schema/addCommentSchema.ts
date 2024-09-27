import { z } from 'zod';

export const addCommentSchema = z.string().min(1, '내용을 입력해주세요.');

export type AddCommentSchema = z.infer<typeof addCommentSchema>;
