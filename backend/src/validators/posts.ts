import { PostKind } from '@prisma/client';
import { z } from 'zod';

// Validation schema for creating a post
export const createPost = z
  .object({
    title: z.string().min(1), // Validates the title field as a string with minimum length 1
    content: z.string().min(1), // Validates the content field as a string with minimum length 1
    // Validates the category field as an optional string with minimum length 1
    category: z.string().min(1).optional(),
    // Validates the imageUrl field as an optional string with minimum length 1
    imageUrl: z.string().url().min(1).optional(),
    kind: z.nativeEnum(PostKind), // Validates the kind field as a value from the PostKind enum
  })
  .strict();

// Validation schema for finding a post
export const findOnePost = z
  .object({
    id: z.coerce.number().int().nonnegative(), // Validates the id field as a positive integer
  })
  .strict();

// Validation schema for finding multiple posts
export const findManyPosts = z
  .object({
    kind: z.nativeEnum(PostKind), // Validates the kind field as a value from the PostKind enum
  })
  .strict();

// Validation schema for updating a post (partial schema)
export const updatePost = createPost.partial().omit({ kind: true }).strict();
