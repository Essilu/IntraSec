import { z } from 'zod';

// Validation schema for creating a comment
export const createComment = z
  .object({
    content: z.string().min(1), // Validates the content field as a string with minimum length 1
  })
  .strict();

// Validation schema for finding a post
export const findOnePost = z
  .object({
    postId: z.coerce.number().int().nonnegative(), // Validates the postId field as a positive integer
  })
  .strict();

// Validation schema for finding a comment with its associated post
export const findOneCommentWithPost = z
  .object({
    postId: z.coerce.number().int().nonnegative(), // Validates the postId field as a positive integer
    id: z.coerce.number().int().nonnegative(), // Validates the id field as a positive integer
  })
  .strict();

// Validation schema for updating a comment (partial schema)
export const updateComment = createComment.partial().strict();
