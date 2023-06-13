import { TransactionMean, TransactionType } from '@prisma/client';
import { z } from 'zod';

export const createTransaction = z.object({
  amount: z.number().int().positive(),
  otherCompany: z.string().min(1),
  type: z.nativeEnum(TransactionType),
  mean: z.nativeEnum(TransactionMean),
}).strict();

export const findOneTransaction = z.object({
  id: z.coerce.number().int().positive(),
}).strict();

export const updateTransaction = createTransaction.partial().strict();
