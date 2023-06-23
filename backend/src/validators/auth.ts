import { z } from "zod";

// Validation schema for login user data
export const loginUser = z
  .object({
    email: z.string().min(3).max(50), // Validates the email field as a string with minimum length 3 and maximum length 50
    password: z.string().min(1), // Validates the password field as a string with minimum length 1
  })
  .strict();
