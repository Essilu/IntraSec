import { z } from 'zod';

export const loginUser = z.object({
  email: z.string().min(3).max(50),
  password: z.string().min(1),
}).strict();
