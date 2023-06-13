import { z } from 'zod';

export const createPost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
}).strict();

export const findOnePost = z.object({
  id: z.coerce.number().int().positive(),
}).strict();

export const updatePost = createPost.partial().strict();
