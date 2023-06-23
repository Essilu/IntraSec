import { z } from 'zod';

// Validation schema for creating a user
export const createUser = z.object({
  email: z.string().email().min(1), // Validates the email field as a valid email address with minimum length 1
  firstname: z.string().min(1), // Validates the firstname field as a string with minimum length 1
  lastname: z.string().min(1), // Validates the lastname field as a string with minimum length 1
  // Validates the password field as a string with minimum length 8 and maximum length 50
  password: z.string().min(8).max(50),
}).strict();

// Validation schema for finding a user
export const findOneUser = z.object({
  id: z.coerce.number().int().positive(), // Validates the id field as a positive integer
}).strict();

// Validation schema for updating a user (partial schema)
export const updateUser = createUser.partial().strict();
