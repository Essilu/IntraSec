import { z } from 'zod';

// Validation schema for creating a role
export const createRole = z.object({
  name: z.string().min(1), // Validates the name field as a string with minimum length 1
  permissionTransactions: z.number().int().nonnegative(), // Validates the permissions field as a positive bigint
  permissionPosts: z.number().int().nonnegative(), // Validates the permissions field as a positive bigint
  permissionComments: z.number().int().nonnegative(), // Validates the permissions field as a positive bigint
  permissionUsers: z.number().int().nonnegative(), // Validates the permissions field as a positive bigint
  permissionRoles: z.number().int().nonnegative(), // Validates the permissions field as a positive bigint
}).strict();

// Validation schema for finding a role
export const findOneRole = z.object({
  id: z.coerce.number().int().nonnegative(), // Validates the id field as a positive integer
}).strict();

// Validation schema for updating a role (partial schema)
export const updateRole = createRole.partial().strict();
