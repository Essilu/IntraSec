import type { z } from 'zod';

export function validate<T extends z.ZodType>(
  validator: T,
  body: unknown,
): { success: boolean; data: z.infer<T>; error: z.ZodError | null } {
  const data = validator.safeParse(body);
  return {
    success: data.success,
    data: data.success ? data.data : null,
    error: data.success ? null : data.error,
  };
}
