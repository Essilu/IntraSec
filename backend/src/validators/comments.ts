import { z } from 'zod';

export const createComment = z.object({
  content: z.string().min(1),
}).strict();

export const findOnePost = z.object({
  postId: z.coerce.number().int().positive(),
}).strict();

export const findOneCommentWithPost = z.object({
  postId: z.coerce.number().int().positive(),
  id: z.coerce.number().int().positive(),
}).strict();

export const updateComment = createComment.partial().strict();
