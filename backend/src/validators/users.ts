import { z } from 'zod';

export const createUser = z.object({
  email: z.string().email().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  password: z.string().min(8).max(50),
}).strict();

export const findOneUser = z.object({
  id: z.number().int().positive(),
}).strict();

export const updateUser = createUser.partial().strict();
