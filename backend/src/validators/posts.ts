import { PostKind } from '@prisma/client';
import { z } from 'zod';

export const createPost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  kind: z.nativeEnum(PostKind),
}).strict();

export const findOnePost = z.object({
  id: z.coerce.number().int().positive(),
}).strict();

export const findManyPosts = z.object({
  kind: z.nativeEnum(PostKind),
}).strict();

export const updatePost = createPost
  .partial()
  .omit({ kind: true })
  .strict();
