import { TransactionMean, TransactionType } from '@prisma/client';
import { z } from 'zod';

// Validation schema for creating a transaction
export const createTransaction = z.object({
  amount: z.number().int().positive(), // Validates the amount field as a positive integer
  otherCompany: z.string().min(1), // Validates the otherCompany field as a string with minimum length 1
  type: z.nativeEnum(TransactionType), // Validates the type field as a value from the TransactionType enum
  mean: z.nativeEnum(TransactionMean), // Validates the mean field as a value from the TransactionMean enum
}).strict();

// Validation schema for finding a transaction
export const findOneTransaction = z.object({
  id: z.coerce.number().int().nonnegative(), // Validates the id field as a positive integer
}).strict();

// Validation schema for updating a transaction (partial schema)
export const updateTransaction = createTransaction.partial().strict();
