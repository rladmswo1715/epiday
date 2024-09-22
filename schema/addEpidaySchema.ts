import { z } from 'zod';

export const addEpidaySchema = z
  .object({
    content: z.string().min(1, '내용을 입력해주세요.'),
    author: z.enum(['write', 'unknown', 'self']),
    authorName: z.string().optional(),
    referenceTitle: z.string().optional(),
    referenceUrl: z
      .string()
      .optional()
      .refine((value) => !value || /^https?:\/\/.+/.test(value), {
        message: '유효한 URL을 입력해주세요. (ex. https:// ~)',
      }),
    tags: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.author === 'write' && !data.authorName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['authorName'],
        message: '저자 이름을 입력해주세요.',
      });
    }
  });

export type AddEpidaySchema = z.infer<typeof addEpidaySchema>;
